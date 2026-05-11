import { useState, useCallback } from 'react'
import { useT } from '../../i18n'
import { decisionTreeSectionSv, decisionTreeSectionKo } from './tech-translations'

type Step = 'budget' | 'finetune' | 'result'

interface DecisionState {
  budget: 'low' | 'medium' | 'high' | null
  finetune: boolean | null
}

interface Recommendation {
  arch: string
  examples: string
  reasoning: string
}

function getRecommendation(state: DecisionState): Recommendation {
  const { budget, finetune } = state

  if (budget === 'low') {
    return {
      arch: 'Small Dense Model (1-8B)',
      examples: 'Llama 3 8B, Gemma 2 9B, Phi-3 Mini',
      reasoning: 'Low budget means limited VRAM and compute. Small dense models are easy to fine-tune, deploy on consumer hardware, and have mature tooling.',
    }
  }
  if (budget === 'medium' && finetune) {
    return {
      arch: 'Large Dense Model (13-70B)',
      examples: 'Llama 3 70B, Qwen 2.5 72B, Command R+',
      reasoning: 'Fine-tuning MoE models is complex (routing drift, expert collapse). Dense models have straightforward LoRA/QLoRA fine-tuning with predictable behavior.',
    }
  }
  if (budget === 'medium' && !finetune) {
    return {
      arch: 'Small MoE or Large Dense',
      examples: 'Mixtral 8x7B, DBRX, or Llama 3 70B',
      reasoning: 'Without fine-tuning needs, MoE gives you more knowledge per FLOP. Mixtral 8x7B matches 70B dense quality at ~13B active compute cost.',
    }
  }
  if (budget === 'high' && finetune) {
    return {
      arch: 'Large Dense or Carefully Tuned MoE',
      examples: 'Llama 3 70B (dense), or DeepSeek V3 with expert-level tuning',
      reasoning: 'High budget enables large dense fine-tuning easily. MoE fine-tuning is possible but requires expertise in load balancing and routing stability.',
    }
  }
  // high budget, no finetune
  return {
    arch: 'Large MoE Model',
    examples: 'DeepSeek V3 (671B/37B), GPT-4 class',
    reasoning: 'Maximum capability per FLOP. MoE stores vastly more knowledge while keeping inference cost manageable. Best for API serving at scale.',
  }
}

const EN_P9 = `Prompting, RAG, or API use only`
const EN_P8 = `Custom data, domain-specific tasks`
const EN_P7 = `Do you need to fine-tune the model?`
const EN_P6 = `What's your compute budget?`
const EN_INTRO = `Choosing an architecture depends on your budget, use case, and whether you need to serve the model yourself.`

export const DecisionTreeSection: React.FC = () => {
  const c = useT({ title: '5. The Decision Tree', intro: EN_INTRO  , p6: EN_P6 , p7: EN_P7 , p8: EN_P8 , p9: EN_P9 }, { sv: decisionTreeSectionSv, ko: decisionTreeSectionKo })
  const [state, setState] = useState<DecisionState>({ budget: null, finetune: null })

  const currentStep: Step = state.budget === null ? 'budget' : state.finetune === null ? 'finetune' : 'result'

  const setBudget = useCallback((b: DecisionState['budget']) => {
    if (b === 'low') {
      setState({ budget: b, finetune: false })
    } else {
      setState({ budget: b, finetune: null })
    }
  }, [])

  const setFinetune = useCallback((f: boolean) => {
    setState(prev => ({ ...prev, finetune: f }))
  }, [])

  const reset = useCallback(() => setState({ budget: null, finetune: null }), [])

  const rec = currentStep === 'result' ? getRecommendation(state) : null

  return (
    <section aria-labelledby="decision-tree">
      <h2 id="decision-tree" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        {/* Progress */}
        <div className="mb-6 flex items-center gap-2">
          {(['budget', 'finetune', 'result'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <div className={`h-px w-8 ${currentStep === s || currentStep === 'result' ? 'bg-zinc-400' : 'bg-zinc-700'}`} />}
              <div className={`flex size-7 items-center justify-center rounded-full text-xs font-mono ${
                currentStep === s ? 'bg-zinc-100 text-zinc-900' :
                (s === 'budget' && state.budget) || (s === 'finetune' && state.finetune !== null) || s === 'result'
                  ? 'bg-zinc-600 text-zinc-200' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Budget step */}
        {currentStep === 'budget' && (
          <div>
            <p className="mb-4 text-sm font-semibold text-zinc-200">{c.p6}</p>
            <div className="grid grid-cols-3 gap-3">
              {([
                { value: 'low' as const, label: 'Low', desc: '1-2 consumer GPUs, <$1K' },
                { value: 'medium' as const, label: 'Medium', desc: '1-8 A100s, $1K-$100K' },
                { value: 'high' as const, label: 'High', desc: 'GPU cluster, $100K+' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setBudget(opt.value)}
                  className="rounded-lg border border-zinc-700 p-4 text-left transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                >
                  <p className="font-mono text-sm font-semibold text-zinc-200">{opt.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fine-tune step */}
        {currentStep === 'finetune' && (
          <div>
            <p className="mb-1 text-xs text-zinc-500">Budget: <span className="text-zinc-300 capitalize">{state.budget}</span></p>
            <p className="mb-4 text-sm font-semibold text-zinc-200">{c.p7}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFinetune(true)}
                className="rounded-lg border border-zinc-700 p-4 text-left transition-colors hover:border-zinc-500 hover:bg-zinc-800"
              >
                <p className="font-mono text-sm font-semibold text-zinc-200">Yes</p>
                <p className="mt-1 text-xs text-zinc-500">{c.p8}</p>
              </button>
              <button
                onClick={() => setFinetune(false)}
                className="rounded-lg border border-zinc-700 p-4 text-left transition-colors hover:border-zinc-500 hover:bg-zinc-800"
              >
                <p className="font-mono text-sm font-semibold text-zinc-200">No</p>
                <p className="mt-1 text-xs text-zinc-500">{c.p9}</p>
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {currentStep === 'result' && rec && (
          <div>
            <div className="mb-4 flex gap-4 text-xs text-zinc-500">
              <span>Budget: <span className="text-zinc-300 capitalize">{state.budget}</span></span>
              <span>Fine-tune: <span className="text-zinc-300">{state.finetune ? 'Yes' : 'No'}</span></span>
            </div>

            <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-xs text-green-400/70 uppercase">Recommendation</p>
              <p className="mt-1 font-mono text-lg font-bold text-green-400">{rec.arch}</p>
              <p className="mt-2 text-sm text-zinc-300">{rec.reasoning}</p>
              <p className="mt-2 text-xs text-zinc-500">
                Examples: <span className="text-zinc-400">{rec.examples}</span>
              </p>
            </div>

            <button
              onClick={reset}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              ← Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
