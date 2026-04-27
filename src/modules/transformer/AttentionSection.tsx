import { useT } from '../../useT'
import { attentionSectionSv, attentionSectionKo } from './tech-translations'
import { DEFAULT_WEIGHTS } from './attentionData'
import { AttentionHeatmap } from './AttentionHeatmap'
import { CodeBlock } from '../../components/CodeBlock'
import { SelfExplain } from '../../components/SelfExplain'

const ATTENTION_MATH = `# Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V

# Q = query  — "what am I looking for?"
# K = key    — "what do I contain?"
# V = value  — "what information do I provide?"

import torch
import torch.nn.functional as F

def attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / d_k ** 0.5
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V)`

const EN_INTRO = `Attention lets each word look at every other word in the sentence and decide how much to focus on each one.`

export const AttentionSection: React.FC = () => {
  const c = useT({ title: '2 · Attention Mechanism', intro: EN_INTRO }, { sv: attentionSectionSv, ko: attentionSectionKo })
  return (
  <section aria-labelledby="attention-heading">
    <h2 id="attention-heading" className="mb-2 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

    <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
      <p className="mb-3 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
        &quot;The cat sat on the mat because it was tired&quot;
      </p>
      <AttentionHeatmap weights={DEFAULT_WEIGHTS} />
      <p className="mt-3 text-xs text-zinc-500">
        Each row shows how much one word attends to every other word. Brighter = stronger attention.
        Notice how <span className="text-amber-300">&quot;it&quot;</span> strongly attends to{' '}
        <span className="text-amber-300">&quot;cat&quot;</span> — the model learns coreference.
      </p>
    </div>

    <SelfExplain
      prompt='You just explored the attention heatmap and saw how "it" attends strongly to "cat." Using the Query-Key-Value analogy (library analogy), explain in your own words how the model figures out that "it" refers to "cat" and not "mat" or "sat."'
      modelAnswer={"When processing \"it\", the model creates a Query vector that essentially asks \"what noun am I referring to?\" Each other word has a Key vector describing what it represents. The Key for \"cat\" (a noun, an animal, the subject) scores much higher against the Query from \"it\" than the Key for \"mat\" (an object, not the subject) or \"sat\" (a verb, can't be referenced by \"it\"). The high score means \"it\" pays strong attention to \"cat\", so the Value vector from \"cat\" (its actual meaning/information) gets mixed heavily into the representation of \"it\". The model learned these Query/Key patterns from seeing millions of sentences where pronouns refer back to subjects."}
    />

    {/* Q, K, V analogy */}
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold text-zinc-200">Query, Key, Value — A Library Analogy</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { letter: 'Q', name: 'Query', color: 'border-blue-600 bg-blue-950', text: 'text-blue-300', analogy: 'Your question: "I need books about cats"' },
          { letter: 'K', name: 'Key', color: 'border-emerald-600 bg-emerald-950', text: 'text-emerald-300', analogy: 'The label on each book spine — what it\'s about' },
          { letter: 'V', name: 'Value', color: 'border-amber-600 bg-amber-950', text: 'text-amber-300', analogy: 'The actual content inside the book you pull off the shelf' },
        ].map(item => (
          <div key={item.letter} className={`rounded-lg border p-3 ${item.color}`}>
            <div className={`mb-1 font-mono text-lg font-bold ${item.text}`}>
              {item.letter} <span className="text-xs font-normal text-zinc-400">({item.name})</span>
            </div>
            <p className="text-xs text-zinc-400">{item.analogy}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        You match your <strong className="text-blue-300">Query</strong> against every{' '}
        <strong className="text-emerald-300">Key</strong> to find the best matches, then read the{' '}
        <strong className="text-amber-300">Values</strong> of those matches.
      </p>
    </div>

    {/* Math */}
    <CodeBlock code={ATTENTION_MATH} language="python" title="attention.py — Scaled Dot-Product Attention" />
  </section>
  )
}