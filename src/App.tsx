import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useDifficulty } from './DifficultyContext'
import { useLanguage, LANGUAGE_META, type Language } from './LanguageContext'
import { t, MODULE_LABELS } from './ui-labels'
import { Icon } from './components/Icon'
import { SpacedReview } from './components/SpacedReview'
import { AIProblemModule } from './modules/AIProblemModule'
import { DataFoundationsModule } from './modules/DataFoundationsModule'
import { TokensModule } from './modules/TokensModule'
import { TransformerModule } from './modules/TransformerModule'
import { TrainingModule } from './modules/TrainingModule'
import { LLMDataModule } from './modules/LLMDataModule'
import { AlignmentModule } from './modules/AlignmentModule'
import { ArchitectureModule } from './modules/ArchitectureModule'
import { SolutionModule } from './modules/SolutionModule'
import { EvaluationModule } from './modules/EvaluationModule'
import { QuantizationModule } from './modules/QuantizationModule'
import { InferenceModule } from './modules/InferenceModule'
import { IndustryModule } from './modules/IndustryModule'
import { EmbeddingsModule } from './modules/EmbeddingsModule'
import { PromptingModule } from './modules/PromptingModule'
import { AgentsModule } from './modules/AgentsModule'
import { FineTuningModule } from './modules/FineTuningModule'
import { AIInOrgModule } from './modules/AIInOrgModule'

type ModuleId = 'ai-problem' | 'data-foundations' | 'tokens' | 'transformer' | 'training' | 'llm-data' | 'alignment' | 'architecture' | 'solution' | 'evaluation' | 'quantization' | 'inference' | 'industry' | 'embeddings' | 'prompting' | 'agents' | 'ai-in-org' | 'fine-tuning'

const modules: { id: ModuleId; label: string; businessLabel?: string; businessVisible: boolean }[] = [
  { id: 'ai-problem', label: "What's an AI Problem?", businessVisible: true },
  { id: 'data-foundations', label: 'Data Foundations', businessLabel: 'Why Data Quality Matters', businessVisible: true },
  { id: 'tokens', label: 'Tokens & Tokenizers', businessVisible: false },
  { id: 'transformer', label: 'The Transformer', businessVisible: false },
  { id: 'training', label: 'Training From Scratch', businessVisible: false },
  { id: 'llm-data', label: 'Data for LLM Training', businessVisible: false },
  { id: 'alignment', label: 'Alignment & Safety', businessLabel: 'Trust & Safety', businessVisible: true },
  { id: 'architecture', label: 'Architecture Decisions', businessVisible: false },
  { id: 'solution', label: 'From Problem to Solution', businessVisible: true },
  { id: 'evaluation', label: 'Evaluation & Benchmarks', businessLabel: 'How to Know If It Works', businessVisible: true },
  { id: 'quantization', label: 'Quantization & Formats', businessVisible: false },
  { id: 'inference', label: 'Inference & Deployment', businessVisible: false },
  { id: 'industry', label: 'The Industry Map', businessLabel: 'Who Makes What', businessVisible: true },
  { id: 'embeddings', label: 'Embeddings & Vector Search', businessLabel: 'Search & Knowledge Retrieval', businessVisible: true },
  { id: 'prompting', label: 'Prompt Engineering', businessLabel: 'How to Talk to AI', businessVisible: true },
  { id: 'agents', label: 'Agents & Tool Use', businessLabel: 'AI Assistants That Take Action', businessVisible: true },
  { id: 'ai-in-org', label: 'AI in Your Organization', businessVisible: true },
  { id: 'fine-tuning', label: 'Fine-Tuning Hands-On', businessVisible: false },
]

const moduleComponents: Record<ModuleId, React.FC> = {
  'ai-problem': AIProblemModule,
  'data-foundations': DataFoundationsModule,
  tokens: TokensModule,
  transformer: TransformerModule,
  training: TrainingModule,
  'llm-data': LLMDataModule,
  alignment: AlignmentModule,
  architecture: ArchitectureModule,
  solution: SolutionModule,
  evaluation: EvaluationModule,
  quantization: QuantizationModule,
  inference: InferenceModule,
  industry: IndustryModule,
  embeddings: EmbeddingsModule,
  prompting: PromptingModule,
  agents: AgentsModule,
  'ai-in-org': AIInOrgModule,
  'fine-tuning': FineTuningModule,
}

function ModuleNavigation({
  activeModule,
  onNavigate,
  visibleModules: navModules,
}: {
  activeModule: ModuleId
  onNavigate: (id: ModuleId) => void
  visibleModules: typeof modules
}) {
  const activeIndex = navModules.findIndex((m) => m.id === activeModule)
  const prev = activeIndex > 0 ? navModules[activeIndex - 1] : null
  const next = activeIndex < navModules.length - 1 ? navModules[activeIndex + 1] : null

  return (
    <div className="mt-16 flex items-center justify-between border-t border-zinc-800 pt-8">
      {prev ? (
        <button
          onClick={() => onNavigate(prev.id)}
          className="group flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-3 text-sm text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <div className="text-left">
            <div className="text-xs text-zinc-500">Previous</div>
            <div>{prev.label}</div>
          </div>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => onNavigate(next.id)}
          className="group flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-3 text-sm text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200"
        >
          <div className="text-right">
            <div className="text-xs text-zinc-500">Next</div>
            <div>{next.label}</div>
          </div>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}

function getDueReviewCount(): number {
  const now = Date.now()
  // Count modules with completed checks that have no schedule yet (new items)
  let due = 0
  const scheduleRaw = localStorage.getItem('llm-academy-review-schedule')
  const schedule: Record<string, { nextReview: number }> = scheduleRaw ? JSON.parse(scheduleRaw) : {}

  // Count scheduled items that are due
  for (const entry of Object.values(schedule)) {
    if (entry.nextReview <= now) due++
  }

  // Count unscheduled check results (new items not yet reviewed)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith('llm-academy-checks-')) continue
    const moduleId = key.replace('llm-academy-checks-', '')
    try {
      const data = JSON.parse(localStorage.getItem(key) ?? '{}')
      const results: { questionId: string }[] = data.results ?? []
      for (const r of results) {
        const qid = `${moduleId}::${r.questionId}`
        if (!(qid in schedule)) due++
      }
    } catch { /* skip malformed */ }
  }
  return due
}

function App() {
  const { mode, toggle: toggleMode } = useDifficulty()
  const { lang, setLang } = useLanguage()
  const [activeModule, setActiveModule] = useState<ModuleId>('ai-problem')
  const [visited, setVisited] = useState<Set<ModuleId>>(() => new Set(['ai-problem']))
  const [fadeIn, setFadeIn] = useState(true)
  const [showReview, setShowReview] = useState(false)
  const [dueCount, setDueCount] = useState(() => getDueReviewCount())
  const mainRef = useRef<HTMLDivElement>(null)
  const activeButtonRef = useRef<HTMLButtonElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const ActiveComponent = moduleComponents[activeModule]

  const visibleModules = useMemo(
    () => (mode === 'business' ? modules.filter((m) => m.businessVisible) : modules),
    [mode],
  )

  // When switching to business mode, jump to first visible module if current is hidden
  useEffect(() => {
    const isVisible = visibleModules.some((m) => m.id === activeModule)
    if (!isVisible && visibleModules.length > 0) {
      setActiveModule(visibleModules[0].id)
      setVisited((prev) => new Set(prev).add(visibleModules[0].id))
    }
  }, [visibleModules, activeModule])

  const navigateTo = useCallback(
    (id: ModuleId) => {
      if (id === activeModule && !showReview) return
      setShowReview(false)
      setFadeIn(false)
      setTimeout(() => {
        setActiveModule(id)
        setVisited((prev) => new Set(prev).add(id))
        setDueCount(getDueReviewCount())
        setSidebarOpen(false)
        // Scroll to top immediately, then fade in after scroll completes
        mainRef.current?.scrollTo({ top: 0 })
        requestAnimationFrame(() => setFadeIn(true))
      }, 150)
      }, 150)
    },
    [activeModule, showReview],
  )

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeModule])

  const enterReview = useCallback(() => {
    if (showReview) return
    setFadeIn(false)
    setTimeout(() => {
      setShowReview(true)
      setSidebarOpen(false)
      mainRef.current?.scrollTo({ top: 0 })
      requestAnimationFrame(() => setFadeIn(true))
    }, 150)
  }, [showReview])

  // Refresh due count periodically and when returning from review
  useEffect(() => {
    if (!showReview) setDueCount(getDueReviewCount())
    const id = setInterval(() => setDueCount(getDueReviewCount()), 60_000)
    return () => clearInterval(id)
  }, [showReview])

  const activeIndex = visibleModules.findIndex((m) => m.id === activeModule)
  const visitedVisible = visibleModules.filter((m) => visited.has(m.id)).length
  const progressPercent = Math.round((visitedVisible / visibleModules.length) * 100)

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      {/* Mobile header */}
      <div className="fixed top-0 right-0 left-0 z-30 flex items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4 py-3 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          aria-label="Open navigation"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
        </button>
        <span className="font-mono text-xs font-semibold tracking-widest text-zinc-400 uppercase">{t(lang, 'app.title')}</span>
      </div>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Module navigation"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950 px-5 pt-5 pb-4">
          <h1 className="font-mono text-sm font-semibold tracking-widest text-zinc-400 uppercase">
            {t(lang, 'app.title')}
          </h1>
          {/* Mode toggle */}
          <button
            onClick={toggleMode}
            className="mt-2 flex w-full items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-left text-xs transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            aria-label={`Switch to ${mode === 'technical' ? 'business' : 'technical'} mode`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                mode === 'business'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {mode === 'business' ? <Icon name="lightbulb" size={12} /> : <Icon name="gear" size={12} />}
            </span>
            <span className="text-zinc-300">
              {t(lang, mode === 'business' ? 'track.business' : 'track.technical')}
            </span>
            <span className="ml-auto text-zinc-600">↔</span>
          </button>
          {/* Language selector */}
          <div className="mt-2 flex gap-1">
            {(Object.keys(LANGUAGE_META) as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 rounded-lg px-2 py-1.5 text-center font-mono text-xs transition-colors ${
                  lang === l
                    ? 'bg-zinc-700 text-zinc-100'
                    : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
              >
                {LANGUAGE_META[l].flag}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-xs text-zinc-500">
              {visitedVisible}/{visibleModules.length}
            </span>
          </div>
        </div>

        {/* Scrollable module list */}
        <ul className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3" role="list">
          {/* Spaced Review button */}
          <li>
            <button
              onClick={enterReview}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                showReview
                  ? 'bg-amber-500/10 text-amber-300 shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              aria-current={showReview ? 'page' : undefined}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  showReview ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                ↻
              </span>
              <span className="truncate">Spaced Review</span>
              {dueCount > 0 && (
                <span className="ml-auto rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-xs text-amber-400">
                  {dueCount}
                </span>
              )}
            </button>
          </li>
          <li className="py-1">
            <div className="border-t border-zinc-800/50" />
          </li>
          {visibleModules.map((mod, index) => {
            const isActive = activeModule === mod.id && !showReview
            const isVisited = visited.has(mod.id)
            const displayLabel = (() => {
              const ml = MODULE_LABELS[lang]?.[mod.id]
              if (!ml) return mod.label
              return mode === 'business' && ml.businessLabel ? ml.businessLabel : ml.label
            })()
            return (
              <li key={mod.id}>
                <button
                  ref={isActive ? activeButtonRef : undefined}
                  onClick={() => navigateTo(mod.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isVisited
                          ? 'bg-zinc-800 text-zinc-500'
                          : 'bg-zinc-900 text-zinc-600'
                    }`}
                  >
                    {isVisited && !isActive ? '✓' : index + 1}
                  </span>
                  <span className="truncate">{displayLabel}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Main content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto pt-12 md:pt-0">
        {/* Top progress indicator */}
        <div className="sticky top-0 z-10 h-0.5 bg-zinc-900">
          <div
            className="h-full bg-emerald-500/50 transition-all duration-300"
            style={{ width: showReview ? '100%' : `${((activeIndex + 1) / visibleModules.length) * 100}%` }}
          />
        </div>

        <div
          className={`p-8 transition-opacity duration-150 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        >
          {showReview ? (
            <SpacedReview
              onNavigateToModule={(moduleId) => {
                const target = modules.find((m) => m.id === moduleId)
                if (target) navigateTo(target.id)
              }}
            />
          ) : (
            <>
              <ActiveComponent />
              <ModuleNavigation activeModule={activeModule} onNavigate={navigateTo} visibleModules={visibleModules} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
