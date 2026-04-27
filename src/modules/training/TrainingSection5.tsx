import { useT } from '../../useT'
import { trainingSection5Sv, trainingSection5Ko } from './tech-translations'
import { useState, useMemo, useCallback } from 'react'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { SelfExplain } from '../../components/SelfExplain'

function WeightMatrix({ trained, highlight }: { trained: boolean; highlight: boolean }) {
  const values = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed
      return () => { s = (s * 16807 + 0) % 2147483647; return (s / 2147483647) * 2 - 1 }
    }
    const rand = rng(trained ? 42 : 7)
    if (trained) {
      return Array.from({ length: 36 }, (_, i) => {
        const row = Math.floor(i / 6)
        const col = i % 6
        const base = Math.sin(row * 0.5 + col * 0.3) * 0.4
        return +(base + rand() * 0.1).toFixed(3)
      })
    }
    return Array.from({ length: 36 }, () => +(rand() * 2).toFixed(3))
  }, [trained])

  return (
    <div className={`overflow-x-auto rounded border bg-zinc-950 p-3 transition-all ${highlight ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-zinc-700'}`}>
      <div className="mb-2 text-xs font-medium text-zinc-400">
        {trained ? <><Icon name="check" className="text-green-400" /> After training — structured patterns</> : <><Icon name="cross" className="text-red-400" /> Before training — random noise</>}
      </div>
      <div className="grid grid-cols-6 gap-1 font-mono text-xs">
        {values.map((v, i) => {
          const color = v > 0.3 ? 'text-green-400' : v < -0.3 ? 'text-red-400' : 'text-zinc-500'
          const abs = Math.abs(v)
          const bg = `rgba(${v > 0 ? '74,222,128' : '248,113,113'}, ${Math.min(abs * 0.4, 0.3)})`
          return (
            <span key={i} className={`rounded px-1.5 py-0.5 text-center ${color}`} style={{ backgroundColor: bg }}>
              {v >= 0 ? '\u00A0' : ''}{v.toFixed(3)}
            </span>
          )
        })}
      </div>
    </div>
  )
}

const inspectSteps: TerminalStep[] = [
  {
    command: 'python -c "import torch; m = torch.load(\'logs/d26/model.pt\'); print(list(m.keys())[:10])"',
    output:
      'File: logs/d26/model.pt (3.2 GB)\n' +
      'nanochat d26 checkpoint: depth=26, width=1280, heads=10\n' +
      '─────────────────────────────────────────────────────\n' +
      'Tensor Name                              Shape              Dtype\n' +
      '─────────────────────────────────────────────────────\n' +
      'transformer.wte.weight                   [32768, 1280]      bf16\n' +
      'transformer.h.0.attn.c_attn.weight       [1280, 3840]       bf16\n' +
      'transformer.h.0.attn.c_proj.weight       [1280, 1280]       bf16\n' +
      'transformer.h.0.mlp.c_fc.weight          [1280, 5120]       bf16\n' +
      'transformer.h.0.mlp.c_proj.weight        [5120, 1280]       bf16\n' +
      'transformer.h.0.ln_1.weight              [1280]             bf16\n' +
      'transformer.h.0.ln_2.weight              [1280]             bf16\n' +
      '... (26 layers total, 1.6B parameters)',
    delay: 1200,
  },
  {
    command: 'python -c "w = m[\'transformer.h.0.attn.c_attn.weight\']; print(w[:3,:5])"',
    output:
      'tensor([[ 0.0142, -0.0283,  0.0071,  0.0195, -0.0108],\n' +
      '        [-0.0056,  0.0312, -0.0167,  0.0089,  0.0234],\n' +
      '        [ 0.0201, -0.0145,  0.0278, -0.0033,  0.0156]],\n' +
      '       dtype=torch.bfloat16)\n\n' +
      '↑ These are the actual numbers. 1.6 billion of them\n' +
      '  make up the nanochat d26 model.',
    delay: 800,
  },
]

const FORMAT_COMPARISON = [
  { name: 'SafeTensors', ext: '.safetensors', useCase: 'Default for Hugging Face. Safe, fast, memory-mapped.', pros: 'No code execution risk, fast loading', cons: 'HF ecosystem only' },
  { name: 'GGUF', ext: '.gguf', useCase: 'Quantized models for llama.cpp / Ollama / local inference.', pros: 'Single file, quantization built-in', cons: 'Inference only, not for training' },
  { name: 'PyTorch', ext: '.bin / .pt', useCase: 'Legacy format. Uses Python pickle under the hood.', pros: 'Universal PyTorch support', cons: 'Security risk (arbitrary code execution)' },
]

const EN_P2 = `Format comparison — when to use each:`
export const TrainingSection5: React.FC = () => {
  const c = useT({ title: '5. What\'s Inside the Weight Files'  , p2: EN_P2 }, { sv: trainingSection5Sv, ko: trainingSection5Ko })
  const [executedStep, setExecutedStep] = useState(-1)

  const handleStepExecuted = useCallback((stepIndex: number) => {
    setExecutedStep(stepIndex)
  }, [])

  return (
    <section className="space-y-6" aria-labelledby="section-5-heading">
      <h3 id="section-5-heading" className="font-mono text-xl font-bold text-zinc-100">{c.title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        nanochat saves its trained model as a single <code className="text-amber-300">model.pt</code> file —
        a PyTorch checkpoint containing all the named tensors (multi-dimensional arrays of numbers).
        Run the inspect command to see the structure, then look at the actual numbers below.
      </p>

      {/* Connected: terminal + weight matrices */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-400"><Icon name="terminal" /> Weight Inspection</span>
          <span className="h-px flex-1 bg-zinc-800" />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <SimulatedTerminal
            steps={inspectSteps}
            title="terminal — inspecting weights"
            onStepExecuted={handleStepExecuted}
          />
          <div className="flex flex-col gap-3">
            <WeightMatrix trained={false} highlight={executedStep >= 1} />
            <WeightMatrix trained={true} highlight={executedStep >= 1} />
            {executedStep >= 1 && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                <p className="text-xs text-amber-200/90">
                  ↑ The numbers you see in the terminal come from matrices like these.
                  Before training: random noise. After training: structured patterns that encode language knowledge.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <SelfExplain
        prompt="You just inspected the weight matrices before and after training — random noise vs. structured patterns. In your own words, explain what it means for a model's 'knowledge' to be stored as numbers in a matrix. Where is the knowledge about, say, the capital of France?"
        modelAnswer="A model's knowledge isn't stored in any single weight or neat lookup table. It's distributed across millions of weights working together. The 'knowledge' that Paris is the capital of France is encoded as a pattern of activations across many neurons in many layers — specific weights in the attention layers learn to connect 'capital' and 'France' concepts, while FFN layers store the association with 'Paris'. No single number says 'Paris = capital of France'; instead, the collective pattern of 1.6 billion numbers, when multiplied together in the right sequence, produces a high probability for the token 'Paris' after 'The capital of France is'. This is why you can't just edit one weight to change a fact — the knowledge is smeared across the entire network."
      />

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-300">{c.p2}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-zinc-700 text-left text-xs text-zinc-400">
                <th className="px-3 py-2">Format</th>
                <th className="px-3 py-2">Extension</th>
                <th className="px-3 py-2">Use case</th>
                <th className="px-3 py-2">Pros</th>
                <th className="px-3 py-2">Cons</th>
              </tr>
            </thead>
            <tbody>
              {FORMAT_COMPARISON.map(f => (
                <tr key={f.name} className="border-b border-zinc-800 text-zinc-300">
                  <td className="px-3 py-2 font-mono font-medium text-zinc-100">{f.name}</td>
                  <td className="px-3 py-2 font-mono text-amber-300">{f.ext}</td>
                  <td className="px-3 py-2">{f.useCase}</td>
                  <td className="px-3 py-2 text-green-400">{f.pros}</td>
                  <td className="px-3 py-2 text-red-400">{f.cons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CodeBlock
        language="python"
        title="Inspecting nanochat weights"
        code={`import torch

# Load the nanochat checkpoint
checkpoint = torch.load("logs/d26/model.pt", map_location="cpu")

# Explore the structure
for name, param in checkpoint.items():
    if "weight" in name:
        print(f"{name:50s} {str(list(param.shape)):20s} {param.dtype}")

# Peek at actual values in the attention layer
attn = checkpoint["transformer.h.0.attn.c_attn.weight"]
print(f"\\nAttention projection: {attn.shape}")
print(f"Mean: {attn.float().mean():.6f}")
print(f"Std:  {attn.float().std():.6f}")

# nanochat uses a single .pt file (not sharded safetensors)
# because the models are small enough to fit in one file`}
      />
    </section>
  )
}
