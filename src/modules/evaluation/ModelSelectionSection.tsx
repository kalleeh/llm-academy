import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

// Verified facts (May 2026):
// All benchmark numbers below are sourced from vendor announcements and the
// April 2026 third-party comparisons (spectrumailab.com, thenextweb.com,
// verdent.ai, livemint.com, mindstudio.ai). Re-verify with your own evals.

interface ModelSpec {
  name: string
  vendor: string
  released: string
  contextWindow: string
  pricePer1M: string
  benchmarks: { name: string; score: string }[]
  trainingChoice: string
  failureMode: string
  pickWhen: string
  color: string
}

const MODELS: ModelSpec[] = [
  {
    name: 'Claude Opus 4.7',
    vendor: 'Anthropic',
    released: 'April 16, 2026',
    contextWindow: '1M tokens',
    pricePer1M: '$5 in / $25 out',
    benchmarks: [
      { name: 'SWE-bench Verified', score: '87.6%' },
      { name: 'SWE-bench Pro', score: '64.3% (leader)' },
      { name: 'CursorBench', score: '70%' },
      { name: 'XBOW Visual Acuity', score: '98.5% (vs 54.5% in 4.6)' },
      { name: 'Terminal-Bench 2.0', score: '69.4% (behind GPT-5.4 75.1%)' },
    ],
    trainingChoice:
      'Constitutional AI for safety + a self-verification step in post-training (the model checks its own output before reporting). New "xhigh" effort tier (between high and max) added in 4.7. Vision resolution upped to 3.75 MP.',
    failureMode:
      'Long-context retrieval REGRESSED in 4.7 vs 4.6 — Anthropic shipped a known regression on retrieval-from-long-context. For RAG over 100K+ token contexts, prefer Gemini 3.1 Pro until Anthropic patches.',
    pickWhen:
      'Production coding (highest SWE-bench Pro), long agentic loops, brand-voice writing, anything where over-refusal is acceptable but hallucination is not.',
    color: 'border-amber-500/30',
  },
  {
    name: 'GPT-5.5',
    vendor: 'OpenAI',
    released: 'April 23, 2026',
    contextWindow: '200K+ tokens',
    pricePer1M: '~2× GPT-5.3 prices (recent jump)',
    benchmarks: [
      { name: 'SWE-bench', score: '88.7%' },
      { name: 'Terminal-Bench 2.0', score: '75.1-82.7% (leader)' },
      { name: 'AIME 2025', score: '~99%' },
      { name: 'BrowseComp', score: 'Leader' },
      { name: 'GPQA', score: '~80%' },
    ],
    trainingChoice:
      'Heavy reasoning RL — chain-of-thought traces are part of the training signal. Variants: GPT-5.5 (default), GPT-5.5 Pro (heavier reasoning), GPT-5.5 Instant (replaces GPT-5.3 Instant as default ChatGPT model, lower latency, fewer hallucinations in legal/medical/finance).',
    failureMode:
      'Confident hallucinations from the reasoning RL — the model commits to a chain of thought and can dig in. Doubled API pricing makes it harder to justify for cost-sensitive workloads.',
    pickWhen:
      'Hard reasoning, web research / BrowseComp tasks, broad-domain Q&A, terminal-style coding, when you\'re already in the OpenAI ecosystem (Codex, Custom GPTs, Assistants API).',
    color: 'border-emerald-500/30',
  },
  {
    name: 'Gemini 3.1 Pro',
    vendor: 'Google DeepMind',
    released: 'February 2026',
    contextWindow: '1M+ tokens (genuine, not degraded)',
    pricePer1M: '$2 in / $12 out',
    benchmarks: [
      { name: 'AAII (Artificial Analysis Index)', score: '~$900 to run full index — cheapest western frontier' },
      { name: 'Long-context retrieval @ 100K+', score: 'Best in class as of April 2026' },
      { name: 'Multimodal (native)', score: 'Leader for image + audio + video + text in one context' },
      { name: 'GPQA', score: '~71%' },
    ],
    trainingChoice:
      'Trained multimodal from scratch on Google\'s combined text/image/audio/video corpus. TPU-optimised. The 1M+ context window is genuine — quality holds up at 500K+ tokens where competitors degrade.',
    failureMode:
      'Less polished prose than Opus 4.7. Behind on agentic coding. Google Cloud / Vertex AI ecosystem lock-in for some features. Gemini 3 Pro (the previous version) was deprecated March 9, 2026 — only 3.1 Pro is current.',
    pickWhen:
      'Whole-codebase analysis, long PDFs / annual reports / legal contracts, native multimodal pipelines, cost-sensitive frontier workloads, academic reasoning.',
    color: 'border-blue-500/30',
  },
  {
    name: 'DeepSeek V3.2 / R1',
    vendor: 'DeepSeek',
    released: 'Various (2024-2026)',
    contextWindow: '128K tokens',
    pricePer1M: 'Open weights — free if self-hosted',
    benchmarks: [
      { name: 'AIME', score: '~90% (R1)' },
      { name: 'SWE-bench', score: 'Mid-frontier' },
      { name: 'Open-weight benchmarks', score: 'Leader' },
    ],
    trainingChoice:
      'Mixture-of-Experts (671B total / 37B active) + Multi-head Latent Attention + FP8 training. R1-Zero proved pure RL can develop reasoning; R1 adds minimal cold-start SFT. V3 trained for ~$5.5M total — a fraction of frontier closed-model cost.',
    failureMode:
      'Self-hosting requires GPU infra. Quality varies significantly by deployment (quantisation, batch size). Less polished tooling than commercial APIs.',
    pickWhen:
      'Open-weight requirement (compliance, sovereignty, on-premise), cost optimisation when you have GPU capacity, research and fine-tuning baselines.',
    color: 'border-red-500/30',
  },
]

const DECISION_RULES = [
  {
    title: 'Cost-sensitive: Gemini 3.1 Pro',
    detail: 'At $2/$12 vs $5/$25 (Opus 4.7) and recent GPT-5.5 hikes, Gemini is meaningfully cheaper at the frontier — and the only one with verified long-context.',
  },
  {
    title: 'Production coding: Claude Opus 4.7',
    detail: 'SWE-Bench Pro 64.3% leads the field. Self-verification reduces silent failures. xhigh effort for hard tasks.',
  },
  {
    title: 'Reasoning + breadth: GPT-5.5',
    detail: 'Best on math (AIME ~99%), Terminal-Bench, web research. Confident hallucinations are the trade-off.',
  },
  {
    title: 'Long context (100K+): Gemini 3.1 Pro (until further notice)',
    detail: 'Opus 4.7 regressed on long-context retrieval. Until Anthropic patches it, Gemini is the safe choice for RAG over very long contexts.',
  },
  {
    title: 'Open weights / on-prem: DeepSeek V3.2 / Llama 4',
    detail: 'When you need the model to run on your hardware or comply with sovereignty rules.',
  },
]

const EN_INTRO = `Frontier models in 2026 differ less in raw capability than in calibration. Each lab makes specific post-training trade-offs that produce specific behaviors. Knowing those trade-offs is more durable than memorising leaderboards.`

export const ModelSelectionSection: React.FC = () => {
  const c = useT({ title: '3. Choosing Models — Why They Differ and How to Pick', intro: EN_INTRO }, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="model-selection">
      <h2 id="model-selection" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-2">
        {MODELS.map((m, i) => (
          <div key={m.name} className={`rounded-lg border ${m.color} bg-white dark:bg-zinc-900/40`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">{m.name}</span>
                  <span className="text-xs text-zinc-500">— {m.vendor} — {m.released}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">{m.contextWindow} · {m.pricePer1M}</p>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-xs">
                <div>
                  <p className="mb-1 font-medium text-zinc-500">Headline benchmarks</p>
                  <ul className="space-y-1">
                    {m.benchmarks.map((b) => (
                      <li key={b.name} className="font-mono text-zinc-700 dark:text-zinc-300">
                        <span className="text-zinc-500">{b.name}:</span> <span className="text-amber-300">{b.score}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-medium text-zinc-500">Training-time choice that produces the behavior</p>
                  <p className="text-zinc-700 dark:text-zinc-300">{m.trainingChoice}</p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-red-400">Known failure mode</p>
                  <p className="text-zinc-700 dark:text-zinc-300">{m.failureMode}</p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-emerald-400">Pick when</p>
                  <p className="text-zinc-700 dark:text-zinc-300">{m.pickWhen}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Decision rules of thumb</p>
        <div className="space-y-2">
          {DECISION_RULES.map((r) => (
            <div key={r.title} className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3">
              <p className="font-mono text-sm text-amber-300">{r.title}</p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{r.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5 text-xs text-zinc-700 dark:text-zinc-300">
        <p className="mb-1 font-medium text-amber-300">⚠ This page ages fast</p>
        <p>
          Frontier model versions ship every 1-3 months. The behaviors above are tied to specific
          post-training releases (Opus 4.7, GPT-5.5, Gemini 3.1 Pro as of May 2026). Always
          re-verify with your own evals after a major version bump — observed personalities shift
          with each release.
        </p>
      </div>

      <SelfExplain
        prompt="A finance team wants to use an LLM to read 200-page annual reports and answer questions about them. They've been told to use Claude because it's 'best for serious work.' Walk through whether that's the right pick in May 2026 and why."
        modelAnswer={"Probably not the right pick today. The 200-page reports translate to 100K-200K tokens of input. Claude Opus 4.7 has a 1M context window on paper, but as of April 2026 it shipped a known regression on long-context retrieval — quality drops noticeably above ~100K tokens. Gemini 3.1 Pro is the only frontier model where 1M+ context retrieval still holds up reliably, and it's also the cheapest of the three at $2/$12 per MTok. The right pick today is Gemini 3.1 Pro for the long-context retrieval, with Claude Opus 4.7 as a fallback for the analytical writing once relevant chunks are extracted. This is exactly the kind of decision that flips with every release — when Anthropic patches the regression, the calculus changes again. The durable lesson: pick on calibration (this lab is good at X), not on brand reputation."}
      />
    </section>
  )
}
