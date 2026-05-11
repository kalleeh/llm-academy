import { tLabel, translateQuestions, useLanguage } from '../i18n'
import { useState, useCallback, useMemo } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { FileExplorer } from '../components/FileExplorer'
import type { FileNode } from '../components/FileExplorer'
import { InteractiveDemo } from '../components/InteractiveDemo'
import { SimulatedTerminal } from '../components/SimulatedTerminal'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { ModuleLayout } from '../components/ModuleLayout'

// ── Token colors for visualization ──────────────────────────────────────────
const TOKEN_COLORS = [
  'bg-purple-200 dark:bg-purple-500/30 border-purple-400 dark:border-purple-400/50',
  'bg-blue-200 dark:bg-blue-500/30 border-blue-400 dark:border-blue-400/50',
  'bg-green-200 dark:bg-green-500/30 border-green-400 dark:border-green-400/50',
  'bg-amber-200 dark:bg-amber-500/30 border-amber-400 dark:border-amber-400/50',
  'bg-pink-200 dark:bg-pink-500/30 border-pink-400 dark:border-pink-400/50',
  'bg-cyan-200 dark:bg-cyan-500/30 border-cyan-400 dark:border-cyan-400/50',
  'bg-red-200 dark:bg-red-500/30 border-red-400 dark:border-red-400/50',
  'bg-indigo-200 dark:bg-indigo-500/30 border-indigo-400 dark:border-indigo-400/50',
  'bg-teal-200 dark:bg-teal-500/30 border-teal-400 dark:border-teal-400/50',
  'bg-orange-200 dark:bg-orange-500/30 border-orange-400 dark:border-orange-400/50',
  'bg-lime-200 dark:bg-lime-500/30 border-lime-400 dark:border-lime-400/50',
  'bg-rose-200 dark:bg-rose-500/30 border-rose-400 dark:border-rose-400/50',
]

function colorFor(i: number): string {
  return TOKEN_COLORS[i % TOKEN_COLORS.length]
}

// ── Tokenization helpers ────────────────────────────────────────────────────
function charTokenize(text: string): string[] {
  return [...text]
}

function wordTokenize(text: string): string[] {
  const tokens: string[] = []
  let current = ''
  for (const ch of text) {
    if (/\s/.test(ch)) {
      if (current) tokens.push(current)
      tokens.push(ch)
      current = ''
    } else if (/[^\w]/.test(ch)) {
      if (current) tokens.push(current)
      tokens.push(ch)
      current = ''
    } else {
      current += ch
    }
  }
  if (current) tokens.push(current)
  return tokens
}

// Simple BPE-like tokenizer: greedily matches from a fixed vocabulary
const BPE_VOCAB = [
  'the', 'ing', 'tion', 'er', 'ed', 'es', 'al', 'en', 'an', 'or',
  'on', 'is', 'it', 'at', 'to', 'in', 'he', 'th', 're', 'ou',
  'st', 'ar', 'nd', 'le', 'se', 'of',
]

function bpeTokenize(text: string): string[] {
  const tokens: string[] = []
  let i = 0
  const lower = text.toLowerCase()
  while (i < text.length) {
    if (/\s/.test(text[i])) {
      tokens.push(text[i])
      i++
      continue
    }
    let best = ''
    for (const v of BPE_VOCAB) {
      if (lower.startsWith(v, i) && v.length > best.length) {
        best = v
      }
    }
    if (best) {
      tokens.push(text.slice(i, i + best.length))
      i += best.length
    } else {
      tokens.push(text[i])
      i++
    }
  }
  return tokens
}

// ── Token display component ─────────────────────────────────────────────────
function TokenList({ tokens, label }: { tokens: string[]; label: string }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</div>
      <div className="flex flex-wrap gap-1">
        {tokens.map((t, i) => (
          <span
            key={`${i}-${t}`}
            className={`inline-block rounded border px-1.5 py-0.5 font-mono text-xs text-zinc-900 dark:text-zinc-100 ${
              /^\s+$/.test(t) ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500' : colorFor(i)
            }`}
          >
            {/^\s+$/.test(t) ? '␣' : t}
          </span>
        ))}
      </div>
      <div className="mt-1 text-xs text-zinc-500">{tokens.length} tokens</div>
    </div>
  )
}

// ── Section 1: Why Tokenize? ────────────────────────────────────────────────
function WhyTokenizeSection() {
  const [text, setText] = useState('The tokenizer converts text into numbers.')

  const chars = useMemo(() => charTokenize(text), [text])
  const words = useMemo(() => wordTokenize(text), [text])
  const bpe = useMemo(() => bpeTokenize(text), [text])

  return (
    <section aria-labelledby="why-tokenize">
      <h2 id="why-tokenize" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        1. Why Tokenize?
      </h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        Neural networks do math — they multiply matrices, add vectors, compute gradients.
        They can't read the letter "A" any more than your calculator can. So before any text
        reaches a model, it gets chopped into <strong className="text-zinc-900 dark:text-zinc-100">tokens</strong> — small
        pieces that each map to a number. The question is: <em>how</em> do you chop?
      </p>

      <div className="mb-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
        <label htmlFor="tokenize-input" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Type something and see three tokenization strategies side by side:
        </label>
        <input
          id="tokenize-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-purple-500"
          placeholder="Type text here..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 p-4">
          <TokenList tokens={chars} label="Character-level" />
          <p className="mt-2 text-xs text-zinc-500">
            Tiny vocabulary (~256), but sequences get very long.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 p-4">
          <TokenList tokens={words} label="Word-level" />
          <p className="mt-2 text-xs text-zinc-500">
            Intuitive, but vocabulary explodes and rare words break.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 p-4">
          <TokenList tokens={bpe} label="BPE (subword)" />
          <p className="mt-2 text-xs text-zinc-500">
            The sweet spot — common words stay whole, rare ones split into known pieces.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Section 2: BPE Algorithm Visualization ──────────────────────────────────
interface BPEState {
  tokens: string[]
  pairs: [string, number][]
  bestPair: string
  vocab: string[]
  description: string
}

function computeBPESteps(): BPEState[] {
  const words = ['l o w', 'l o w e r', 'l o w e s t']
  const wordFreqs = [5, 2, 1]
  const steps: BPEState[] = []
  let currentWords = words.map(w => w.split(' '))
  const vocab = new Set<string>()
  currentWords.forEach(w => w.forEach(c => vocab.add(c)))

  function allTokens(): string[] {
    const result: string[] = []
    currentWords.forEach((w, wi) => {
      if (wi > 0) result.push('  |  ')
      const word = w.join(' ')
      for (let k = 0; k < wordFreqs[wi]; k++) {
        if (k > 0) result.push(' , ')
        result.push(word)
      }
    })
    return result
  }

  function countPairs(): Map<string, number> {
    const counts = new Map<string, number>()
    currentWords.forEach((w, wi) => {
      for (let j = 0; j < w.length - 1; j++) {
        const pair = `${w[j]}+${w[j + 1]}`
        counts.set(pair, (counts.get(pair) ?? 0) + wordFreqs[wi])
      }
    })
    return counts
  }

  // Initial state
  steps.push({
    tokens: allTokens(),
    pairs: [],
    bestPair: '',
    vocab: [...vocab],
    description: 'Start with character-level tokens. We have three words: "low" (×5), "lower" (×2), "lowest" (×1).',
  })

  for (let round = 0; round < 5; round++) {
    const pairCounts = countPairs()
    const sorted = [...pairCounts.entries()].sort((a, b) => b[1] - a[1])
    if (sorted.length === 0) break
    const [bestPair, bestCount] = sorted[0]
    const [left, right] = bestPair.split('+')

    steps.push({
      tokens: allTokens(),
      pairs: sorted.slice(0, 6),
      bestPair,
      vocab: [...vocab],
      description: `Count adjacent pairs. Most frequent: "${left}" + "${right}" appears ${bestCount} times.`,
    })

    // Merge
    const merged = left + right
    vocab.add(merged)
    currentWords = currentWords.map(w => {
      const result: string[] = []
      let i = 0
      while (i < w.length) {
        if (i < w.length - 1 && w[i] === left && w[i + 1] === right) {
          result.push(merged)
          i += 2
        } else {
          result.push(w[i])
          i++
        }
      }
      return result
    })

    steps.push({
      tokens: allTokens(),
      pairs: [],
      bestPair: '',
      vocab: [...vocab],
      description: `Merge "${left}" + "${right}" → "${merged}". Vocabulary now has ${vocab.size} tokens.`,
    })
  }

  return steps
}

function BPESection() {
  const bpeSteps = useMemo(() => computeBPESteps(), [])
  const [step, setStep] = useState(0)
  const current = bpeSteps[step]

  const goNext = useCallback(() => setStep(s => Math.min(s + 1, bpeSteps.length - 1)), [bpeSteps.length])
  const goPrev = useCallback(() => setStep(s => Math.max(s - 1, 0)), [])

  return (
    <section aria-labelledby="bpe-algo">
      <h2 id="bpe-algo" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        2. BPE Algorithm Visualization
      </h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        Byte Pair Encoding starts with individual characters and repeatedly merges the most
        frequent adjacent pair. After enough merges, common words become single tokens while
        rare words stay split into recognizable pieces.
      </p>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">BPE Step-by-Step</h3>
            <span className="rounded-full bg-zinc-200 dark:bg-zinc-700 px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
              Step {step + 1} of {bpeSteps.length}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{current.description}</p>
        </div>

        <div className="space-y-4 p-6">
          {/* Current tokens */}
          <div>
            <div className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Current Tokens</div>
            <div className="flex flex-wrap gap-1">
              {current.tokens.map((t, i) => {
                if (t === '  |  ' || t === ' , ') {
                  return <span key={i} className="px-1 text-xs text-zinc-500 dark:text-zinc-600">{t.trim() || '·'}</span>
                }
                const parts = t.split(' ')
                return parts.map((p, j) => (
                  <span
                    key={`${i}-${j}`}
                    className={`inline-block rounded border px-1.5 py-0.5 font-mono text-xs text-zinc-900 dark:text-zinc-100 ${colorFor(
                      current.vocab.indexOf(p) >= 0 ? current.vocab.indexOf(p) : i + j
                    )}`}
                  >
                    {p}
                  </span>
                ))
              })}
            </div>
          </div>

          {/* Pair frequencies */}
          {current.pairs.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Pair Frequencies</div>
              <div className="flex flex-wrap gap-2">
                {current.pairs.map(([pair, count], i) => {
                  const [left, right] = pair.split('+')
                  const isBest = pair === current.bestPair
                  return (
                    <span
                      key={pair}
                      className={`rounded border px-2 py-1 font-mono text-xs ${
                        isBest
                          ? 'border-amber-400 bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200'
                          : i === 0
                            ? 'border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                            : 'border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {left}+{right}: {count}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Vocabulary */}
          <div>
            <div className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Vocabulary ({current.vocab.length})
            </div>
            <div className="flex flex-wrap gap-1">
              {current.vocab.map((v, i) => (
                <span
                  key={v}
                  className={`inline-block rounded border px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200 ${colorFor(i)}`}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-3">
          <button
            onClick={goPrev}
            disabled={step === 0}
            className="rounded bg-zinc-200 dark:bg-zinc-700 px-4 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-600 disabled:opacity-40"
          >
            ← Previous
          </button>
          <div className="flex gap-1">
            {bpeSteps.map((_, i) => (
              <span
                key={i}
                className={`size-1.5 rounded-full ${i === step ? 'bg-zinc-300' : 'bg-zinc-600'}`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            disabled={step === bpeSteps.length - 1}
            className="rounded bg-zinc-200 dark:bg-zinc-700 px-4 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-600 disabled:opacity-40"
          >
            Next Merge →
          </button>
        </div>
      </div>

      <SelfExplain
        prompt='You just stepped through BPE merging "low", "lower", and "lowest" character by character. Why does BPE merge the most frequent pair first, and what would go wrong if it merged rare pairs instead?'
        modelAnswer={"BPE merges the most frequent pair first because that gives the biggest compression win — turning two tokens that appear together constantly into one token shortens the most sequences. If you merged rare pairs first, you'd waste vocabulary slots on tokens that barely appear, leaving common patterns still split into many small pieces. The result would be longer sequences (more tokens per sentence), which means slower training, higher inference costs, and the model seeing less context in its fixed-size window. Frequency-first merging is greedy but effective: it builds up common words and subwords naturally."}
      />
    </section>
  )
}

// ── Section 3: Token Economics ───────────────────────────────────────────────
const ECONOMICS_EXAMPLES: { label: string; text: string; note: string }[] = [
  { label: 'tokEnglishProse', text: 'The quick brown fox jumps over the lazy dog.', note: 'tokNoteCommon' },
  { label: 'tokPythonCode', text: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)', note: 'tokNoteIndent' },
  { label: 'tokJsonData', text: '{"name": "Alice", "age": 30, "scores": [95, 87, 92]}', note: 'tokNotePunct' },
  { label: 'tokChineseText', text: '大型语言模型通过标记化将文本转换为数字', note: 'tokNoteChinese' },
]

function estimateTokens(text: string): number {
  // Rough GPT-style estimate: ~4 chars per token for English
  if (!text) return 0
  return Math.max(1, Math.ceil(text.length / 4))
}

function TokenEconomicsSection() {
  const { lang } = useLanguage()
  const [customText, setCustomText] = useState('')

  return (
    <section aria-labelledby="token-economics">
      <h2 id="token-economics" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        3. Token Economics
      </h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        When you call an LLM API, you pay per token — both for input and output. Different
        kinds of text tokenize very differently, so the same "amount" of content can cost
        wildly different amounts.
      </p>

      <InteractiveDemo
        title="Token Cost Calculator"
        description="Type text to see approximate token count, or explore the examples."
        steps={[
          <div key="calc">
            <textarea
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              className="mb-3 w-full rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-purple-500"
              rows={3}
              placeholder="Type or paste text here..."
              aria-label="Text to estimate tokens"
            />
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
                <span className="text-zinc-500 dark:text-zinc-400">Characters: </span>
                <span className="font-mono text-zinc-900 dark:text-zinc-100">{customText.length}</span>
              </div>
              <div className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
                <span className="text-zinc-500 dark:text-zinc-400">≈ Tokens: </span>
                <span className="font-mono text-amber-700 dark:text-amber-300">{estimateTokens(customText)}</span>
              </div>
              <div className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
                <span className="text-zinc-500 dark:text-zinc-400">≈ Cost (GPT-4o input): </span>
                <span className="font-mono text-green-700 dark:text-green-400">
                  ${(estimateTokens(customText) * 0.0000025).toFixed(6)}
                </span>
              </div>
            </div>
          </div>,
        ]}
      />

      <div className="mt-6">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">Token Efficiency by Content Type</h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400">Type</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400">Example</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400">Chars</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400">≈ Tokens</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400">Chars/Token</th>
              </tr>
            </thead>
            <tbody>
              {ECONOMICS_EXAMPLES.map(ex => {
                const tokens = estimateTokens(ex.text)
                const ratio = (ex.text.length / tokens).toFixed(1)
                return (
                  <tr key={tLabel(lang, ex.label)} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-800/50">
                    <td className="px-4 py-2 font-medium text-zinc-800 dark:text-zinc-200">{tLabel(lang, ex.label)}</td>
                    <td className="max-w-xs truncate px-4 py-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">{ex.text}</td>
                    <td className="px-4 py-2 text-right font-mono text-zinc-700 dark:text-zinc-300">{ex.text.length}</td>
                    <td className="px-4 py-2 text-right font-mono text-amber-700 dark:text-amber-300">{tokens}</td>
                    <td className="px-4 py-2 text-right font-mono text-zinc-700 dark:text-zinc-300">{ratio}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Note: token counts are approximate. Real tokenizers (like tiktoken) give exact counts.
          The ratio varies — English prose averages ~4 chars/token, while CJK text can be 1-2 chars/token.
        </p>
      </div>
    </section>
  )
}

// ── Section 4: Vocabulary & Special Tokens ──────────────────────────────────
const TOKENIZER_TREE: FileNode[] = [
  {
    name: 'tokenizer/',
    type: 'folder',
    children: [
      {
        name: 'tokenizer.json',
        type: 'file',
        size: '14.2 MB',
        annotation: '← Full vocabulary + merge rules',
        content: `{
  "version": "1.0",
  "model": {
    "type": "BPE",
    "vocab": {
      "<|begin_of_text|>": 0,
      "<|end_of_text|>": 1,
      "<|pad|>": 2,
      "<|unk|>": 3,
      "!": 4,
      "\\"": 5,
      "#": 6,
      "...": "...",
      "the": 1820,
      "Ġthe": 279,
      "Ġtoken": 4037,
      "izer": 2133
    },
    "merges": [
      "Ġ t",
      "h e",
      "t h",
      "Ġth e",
      "i n",
      "..."
    ]
  },
  "added_tokens": [
    { "id": 0, "content": "<|begin_of_text|>", "special": true },
    { "id": 1, "content": "<|end_of_text|>", "special": true },
    { "id": 2, "content": "<|pad|>", "special": true }
  ]
}`,
      },
      {
        name: 'tokenizer_config.json',
        type: 'file',
        size: '1.2 KB',
        content: `{
  "bos_token": "<|begin_of_text|>",
  "eos_token": "<|end_of_text|>",
  "pad_token": "<|pad|>",
  "unk_token": "<|unk|>",
  "model_max_length": 131072,
  "clean_up_tokenization_spaces": false
}`,
      },
      {
        name: 'special_tokens_map.json',
        type: 'file',
        size: '460 B',
        content: `{
  "bos_token": "<|begin_of_text|>",
  "eos_token": "<|end_of_text|>",
  "pad_token": "<|pad|>",
  "unk_token": "<|unk|>"
}`,
      },
    ],
  },
]

const SPECIAL_TOKENS: { token: string; name: string; purpose: string }[] = [
  { token: '<|begin_of_text|>', name: 'BOS', purpose: 'Marks the start of a sequence. Tells the model "this is where the input begins."' },
  { token: '<|end_of_text|>', name: 'EOS', purpose: 'Marks the end. The model learns to generate this when it\'s "done talking."' },
  { token: '<|pad|>', name: 'PAD', purpose: 'Fills empty space when batching sequences of different lengths. Ignored during attention.' },
  { token: '<|unk|>', name: 'UNK', purpose: 'Fallback for characters not in the vocabulary. Good tokenizers rarely need this.' },
]

function VocabularySection() {
  return (
    <section aria-labelledby="vocab-special">
      <h2 id="vocab-special" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        4. Vocabulary &amp; Special Tokens
      </h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        A tokenizer's vocabulary is just a big lookup table: token string → integer ID.
        Modern LLMs typically have 32K–128K tokens. The vocabulary lives in a JSON file
        alongside the model weights. Click around to explore:
      </p>

      <div className="mb-6">
        <FileExplorer tree={TOKENIZER_TREE} title="model-weights/" />
      </div>

      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">Special Tokens</h3>
      <p className="mb-3 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        Beyond regular text tokens, every tokenizer defines a handful of special tokens
        that control the model's behavior. These never appear in normal text — they're
        injected by the tokenizer automatically.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {SPECIAL_TOKENS.map(st => (
          <div key={st.name} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 p-4">
            <div className="mb-1 flex items-center gap-2">
              <code className="rounded bg-purple-100 dark:bg-purple-500/20 px-2 py-0.5 text-xs text-purple-700 dark:text-purple-300">{st.token}</code>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{st.name}</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{st.purpose}</p>
          </div>
        ))}
      </div>

      <CodeBlock
        title="tokenizer_config.json"
        language="javascript"
        code={`{
  "bos_token": "<|begin_of_text|>",   // ID 0 — prepended to every input
  "eos_token": "<|end_of_text|>",     // ID 1 — model generates this to stop
  "pad_token": "<|pad|>",             // ID 2 — ignored by attention mask
  "unk_token": "<|unk|>",             // ID 3 — fallback for unknown chars
  "model_max_length": 131072,         // 128K context window
  "vocab_size": 128256                // total tokens in vocabulary
}`}
      />
    </section>
  )
}

// ── Section 5: Training a Tokenizer (nanochat) ─────────────────────────────
function TrainTokenizerSection() {
  return (
    <section aria-labelledby="train-tokenizer">
      <h2 id="train-tokenizer" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        5. Training a Tokenizer in Practice
      </h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        In Karpathy's{' '}
        <a href="https://github.com/karpathy/nanochat" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 underline decoration-amber-400/30 hover:decoration-amber-400">
          nanochat
        </a>{' '}
        — a minimal end-to-end LLM training harness — the tokenizer is the very first thing you build.
        Two scripts handle the entire lifecycle:
      </p>
      <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
        <li><code className="text-amber-700 dark:text-amber-300">tok_train.py</code> — trains a BPE tokenizer on your data</li>
        <li><code className="text-amber-700 dark:text-amber-300">tok_eval.py</code> — measures compression rate (bytes per token)</li>
      </ul>

      <SimulatedTerminal
        title="nanochat — tokenizer"
        steps={[
          {
            command: 'python -m scripts.tok_train',
            output:
              'Training BPE tokenizer on ClimbMix sample...\n' +
              'Vocab size: 65,536 tokens\n' +
              'Special tokens: <|bos|>, <|user_start|>, <|user_end|>, <|assistant_start|>, <|assistant_end|>\n' +
              'Training on 2B characters...\n' +
              '─────────────────────────────────────────\n' +
              'Merge  1000/65536: "▁th" + "e" → "▁the"\n' +
              'Merge  5000/65536: "▁com" + "put" → "▁comput"\n' +
              'Merge 10000/65536: "▁inter" + "face" → "▁interface"\n' +
              '─────────────────────────────────────────\n' +
              '✓ Tokenizer saved to data/tok65536.model\n' +
              '  Vocab: 65,536 tokens | Model file: 2.2 MB',
            delay: 1500,
          },
          {
            command: 'python -m scripts.tok_eval',
            output:
              'Evaluating tokenizer compression rate...\n' +
              'Dataset: ClimbMix validation split\n' +
              '─────────────────────────────────────────\n' +
              'nanochat tok65536:  3.72 bytes/token\n' +
              'GPT-4 (cl100k):    3.69 bytes/token\n' +
              'Llama 3 (128K):    3.52 bytes/token\n' +
              '─────────────────────────────────────────\n' +
              'Note: Larger vocabs compress better but cost\n' +
              'more embedding parameters. 65K balances\n' +
              'compression and model size.',
            delay: 1000,
          },
        ]}
      />

      <div className="mt-4 rounded-lg border border-amber-300 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200/90">
          <strong>Why this matters:</strong> The tokenizer determines how efficiently your model
          "sees" text. A compression rate of 3.72 bytes/token means every token carries ~4 characters
          of information. Better compression = shorter sequences = faster training = lower cost.
          nanochat's 65K vocab is deliberately small to keep the embedding table manageable for
          models you can train on a single GPU node.
        </p>
      </div>
    </section>
  )
}

// ── Main Module ─────────────────────────────────────────────────────────────
const tokensQuestions: Question[] = [
  {
    id: 'tokens-1',
    type: 'mc',
    question: 'Why can\'t we just feed raw text characters directly into a neural network without tokenization?',
    options: [
      'Characters are too small — the model needs bigger units to understand meaning',
      'Neural networks only do math on numbers, so text must be converted to numerical IDs, and tokenization determines what those units are',
      'Raw characters would make the model too slow to train',
      'Tokenization is just a convention — you could skip it and the model would work fine',
    ],
    correctIndex: 1,
    explanation: 'Neural networks are fundamentally math machines — they multiply matrices and compute gradients. They can\'t process the letter "A" directly. Tokenization converts text into numerical IDs that the network can work with. The choice of tokenization strategy (character, word, subword) determines the tradeoff between vocabulary size and sequence length.',
  },
  {
    id: 'tokens-2',
    type: 'mc',
    question: 'BPE starts with individual characters and repeatedly merges the most frequent adjacent pair. What is the main purpose of this approach?',
    options: [
      'To make the vocabulary as small as possible',
      'To ensure every English word gets its own token',
      'To find a balance — common words become single tokens while rare words split into recognizable subword pieces',
      'To compress text for storage efficiency',
    ],
    correctIndex: 2,
    explanation: 'BPE\'s genius is the middle ground. Common words like "the" become single tokens (efficient), while rare words like "defenestration" split into known subwords like "de" + "fen" + "est" + "ration" (no unknown tokens). This avoids both the huge vocabulary of word-level tokenization and the painfully long sequences of character-level tokenization.',
  },
  {
    id: 'tokens-3',
    type: 'mc',
    question: 'nanochat uses a 65K vocabulary while Llama 3 uses 128K. What is the tradeoff of a larger vocabulary?',
    options: [
      'Larger vocab = better compression (fewer tokens per sentence) but more embedding parameters and memory usage',
      'Larger vocab = worse performance because the model gets confused by too many tokens',
      'Larger vocab = faster training because there are fewer tokens to process',
      'There is no tradeoff — larger vocabulary is always better',
    ],
    correctIndex: 0,
    explanation: 'Larger vocabularies compress text better (fewer tokens per sentence = shorter sequences = more context in the window). But each token needs an embedding vector, so a 128K vocab needs 2× more embedding parameters than 65K. For small models like nanochat, that overhead is significant. For massive models like Llama 3, the embedding table is a tiny fraction of total parameters, so the compression benefit wins.',
  },
  {
    id: 'tokens-4',
    type: 'free',
    question: 'You\'re building an LLM application that processes legal contracts. The API charges $2.50 per million input tokens. Explain why token economics matter for your cost estimate, and what factors would make legal text more or less expensive to process than casual English.',
    modelAnswer: 'Legal text tends to be more expensive per page than casual English because it uses longer, less common words ("notwithstanding", "indemnification", "hereinafter") that often split into multiple subword tokens. It also has dense punctuation, numbered clauses, and formal structure that add tokens. Casual English uses common short words ("the", "is", "and") that are typically single tokens. So the same page of legal text might cost 1.5-2× more than casual English. For a contract processing app handling thousands of documents, this difference compounds significantly. You\'d want to estimate token counts on sample documents before committing to a pricing model.',
    explanation: 'Token economics directly impact cost because APIs charge per token. Different text types tokenize very differently — understanding this helps you budget accurately and optimize (e.g., summarizing before sending to the API, or choosing a model with a more efficient tokenizer for your domain).',
  },
]

export const TokensModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="tokens" title="Tokens &amp; Tokenizers" subtitle="How text becomes numbers — and why the way you split matters.">
    <WhyTokenizeSection />
    <BPESection />
    <TokenEconomicsSection />
    <VocabularySection />
    <TrainTokenizerSection />
    <KnowledgeCheck moduleId="tokens" questions={translateQuestions(tokensQuestions, lang)} />
  </ModuleLayout>
  )
}