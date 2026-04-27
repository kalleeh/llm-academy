import { useState, useCallback, useMemo } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { whatAreEmbeddingsSectionSv, whatAreEmbeddingsSectionKo } from './tech-translations'

const SIMILARITY_EXAMPLES: Record<string, Record<string, number>> = {
  'The cat sat on the mat': {
    'A kitten rested on the rug': 0.92,
    'Dogs love to play fetch': 0.61,
    'The stock market crashed today': 0.08,
    'She placed the feline on the carpet': 0.89,
    'Mathematics is beautiful': 0.05,
  },
  'I love programming in Python': {
    'Coding in Python is my passion': 0.94,
    'JavaScript is a popular language': 0.72,
    'The snake slithered through grass': 0.18,
    'Software engineering is rewarding': 0.78,
    'The weather is nice today': 0.04,
  },
  'The restaurant had amazing pasta': {
    'The Italian food was delicious': 0.88,
    'I enjoyed the spaghetti at dinner': 0.91,
    'The car needs new tires': 0.03,
    'Cooking is a creative art form': 0.62,
    'The hotel room was spacious': 0.31,
  },
}

const SENTENCES = Object.keys(SIMILARITY_EXAMPLES)

const SCATTER_POINTS: { word: string; x: number; y: number; cluster: string }[] = [
  { word: 'cat', x: 20, y: 25, cluster: 'animals' },
  { word: 'dog', x: 25, y: 20, cluster: 'animals' },
  { word: 'fish', x: 18, y: 30, cluster: 'animals' },
  { word: 'bird', x: 28, y: 28, cluster: 'animals' },
  { word: 'horse', x: 22, y: 18, cluster: 'animals' },
  { word: 'red', x: 70, y: 70, cluster: 'colors' },
  { word: 'blue', x: 75, y: 65, cluster: 'colors' },
  { word: 'green', x: 68, y: 75, cluster: 'colors' },
  { word: 'yellow', x: 78, y: 72, cluster: 'colors' },
  { word: 'purple', x: 72, y: 78, cluster: 'colors' },
  { word: 'happy', x: 55, y: 20, cluster: 'emotions' },
  { word: 'sad', x: 50, y: 25, cluster: 'emotions' },
  { word: 'angry', x: 48, y: 18, cluster: 'emotions' },
  { word: 'joy', x: 58, y: 22, cluster: 'emotions' },
  { word: 'fear', x: 52, y: 30, cluster: 'emotions' },
  { word: 'car', x: 25, y: 72, cluster: 'vehicles' },
  { word: 'truck', x: 30, y: 68, cluster: 'vehicles' },
  { word: 'bus', x: 22, y: 78, cluster: 'vehicles' },
  { word: 'bike', x: 28, y: 75, cluster: 'vehicles' },
]

const CLUSTER_COLORS: Record<string, { dot: string; text: string; label: string }> = {
  animals: { dot: 'bg-green-400', text: 'text-green-400', label: 'Animals' },
  colors: { dot: 'bg-purple-400', text: 'text-purple-400', label: 'Colors' },
  emotions: { dot: 'bg-amber-400', text: 'text-amber-400', label: 'Emotions' },
  vehicles: { dot: 'bg-blue-400', text: 'text-blue-400', label: 'Vehicles' },
}

const EN_P6 = `Type a sentence to compare (or pick from the list below)`
const EN_P5 = `Type a sentence to compare (or pick from the list below)`
const EN_P2 = `{c.p2}`
const EN_P3 = `Words with similar meanings cluster together in embedding space. This is a 2D projection of high-dimensional vectors.`
const EN_P4 = `Embeddings capture meaning as numbers. &quot;Cat&quot; and &quot;dog&quot; are close because they share semantic properties (animals, pets). &quot;Red&quot; and &quot;blue&quot; cluster together because they&apos;re both colors. This geometric structure enables similarity search, clustering, and retrieval.`
export const WhatAreEmbeddingsSection: React.FC = () => {
  const c = useT({ title: '1. What Are Embeddings' , p2: EN_P2, p3: EN_P3, p4: EN_P4 , p5: EN_P5 , p6: EN_P6 }, { sv: whatAreEmbeddingsSectionSv, ko: whatAreEmbeddingsSectionKo })
  const [selectedSentence, setSelectedSentence] = useState(SENTENCES[0])
  const [inputText, setInputText] = useState('')

  const handleSentenceChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSentence(e.target.value)
    setInputText('')
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }, [])

  const similarities = SIMILARITY_EXAMPLES[selectedSentence] ?? {}
  const comparisonEntries = Object.entries(similarities)

  const matchedScore = useMemo(() => {
    if (!inputText.trim()) return null
    const lower = inputText.toLowerCase()
    for (const [text, score] of comparisonEntries) {
      if (text.toLowerCase().includes(lower) || lower.includes(text.toLowerCase().slice(0, 10))) {
        return { text, score }
      }
    }
    return { text: inputText, score: 0.15 }
  }, [inputText, comparisonEntries])

  return (
    <section aria-labelledby="what-are-embeddings">
      <h2 id="what-are-embeddings" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Embeddings convert text into <strong className="text-zinc-100">dense numerical vectors</strong>{' '}
        that capture semantic meaning. Similar texts produce similar vectors, enabling machines to
        understand that &quot;king&quot; is closer to &quot;queen&quot; than to &quot;bicycle&quot;.
      </p>

      {/* Pipeline visualization */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-4 text-sm font-medium text-zinc-400">Embedding Pipeline</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-md border border-zinc-600 bg-zinc-800 px-4 py-3">
            <p className="text-xs text-zinc-500">Input Text</p>
            <p className="font-mono text-sm text-zinc-200">&quot;The cat sat&quot;</p>
          </div>
          <span className="text-zinc-500">→</span>
          <div className="rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-3">
            <p className="text-xs text-violet-400">Embedding Model</p>
            <p className="font-mono text-xs text-violet-300">text-embedding-3-large</p>
          </div>
          <span className="text-zinc-500">→</span>
          <div className="rounded-md border border-zinc-600 bg-zinc-800 px-4 py-3">
            <p className="text-xs text-zinc-500">Vector (3072 dims)</p>
            <p className="font-mono text-xs text-amber-300">[0.12, -0.34, 0.56, 0.01, ...]</p>
          </div>
        </div>
      </div>

      {/* Similarity demo */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">
          Similarity Score Explorer
        </h3>
        <div className="mb-4">
          <label htmlFor="sentence-select" className="mb-1 block text-xs text-zinc-500">
            Base sentence
          </label>
          <select
            id="sentence-select"
            value={selectedSentence}
            onChange={handleSentenceChange}
            className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
          >
            {SENTENCES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="compare-input" className="mb-1 block text-xs text-zinc-500">{c.p6}</label>
          <input
            id="compare-input"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Try typing a sentence..."
            className="w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600"
          />
          {matchedScore && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-zinc-400">Cosine similarity:</span>
              <span className={`font-mono text-sm font-bold ${
                matchedScore.score > 0.7 ? 'text-green-400' : matchedScore.score > 0.4 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {matchedScore.score.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {comparisonEntries.map(([text, score]) => (
            <div key={text} className="flex items-center gap-3 rounded-md bg-zinc-800 px-3 py-2">
              <div className="w-16 shrink-0">
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                  <div
                    className={`h-full rounded-full transition-all ${
                      score > 0.7 ? 'bg-green-500' : score > 0.4 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
              </div>
              <span className="w-12 shrink-0 font-mono text-xs font-bold text-zinc-300">
                {score.toFixed(2)}
              </span>
              <span className="text-sm text-zinc-300">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2D Scatter plot */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">
          2D Embedding Space (Projected)
        </h3>
        <p className="mb-4 text-xs text-zinc-400">
          {c.p3}
        </p>

        <div className="relative mb-4 h-72 w-full rounded-md border border-zinc-700 bg-zinc-950">
          {SCATTER_POINTS.map(pt => (
            <div
              key={pt.word}
              className="group absolute"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className={`size-2.5 rounded-full ${CLUSTER_COLORS[pt.cluster].dot} transition-transform group-hover:scale-150`} />
              <span className={`absolute left-3 top-[-2px] text-xs ${CLUSTER_COLORS[pt.cluster].text} opacity-70 group-hover:opacity-100`}>
                {pt.word}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(CLUSTER_COLORS).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`size-2.5 rounded-full ${val.dot}`} />
              <span className="text-xs text-zinc-400">{val.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-md bg-zinc-800 p-3">
          <p className="text-xs leading-relaxed text-zinc-300">
            <strong className="text-zinc-100">Key insight:</strong> {c.p4}
          </p>
        </div>
      </div>

      <SelfExplain
        prompt="You just explored the similarity scores and scatter plot. Explain in your own words why 'The cat sat on the mat' and 'A kitten rested on the rug' have a high similarity score (~0.92) even though they share almost no words. What does this tell you about how embeddings work compared to keyword search?"
        modelAnswer="Embeddings encode semantic meaning, not surface-level word overlap. 'Cat' and 'kitten' map to nearby vectors because they refer to the same concept. 'Sat' and 'rested' share the meaning of being stationary. 'Mat' and 'rug' are near-synonyms. The embedding model learned these relationships from training data, so the vectors end up pointing in nearly the same direction despite different words. Keyword search would score this pair poorly (zero shared tokens), but embedding similarity captures the shared meaning. This is why embeddings power semantic search — they find conceptually similar content regardless of exact wording."
      />
    </section>
  )
}
