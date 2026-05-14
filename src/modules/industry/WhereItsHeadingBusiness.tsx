import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'

interface Trend {
  title: string
  oneLine: string
  whatItIs: string
  whatYoullSee: string
  whyItMatters: string
  whatToDo: string
  color: string
}

// Verified trends as of May 2026 — drawn from major model launches:
// - Reasoning: o3, GPT-5.5, DeepSeek R1, Claude extended thinking
// - Native multimodal: Gemini 3.1 Pro (1M context), GPT-5.5 omni, Claude vision
// - Agentic: Claude computer use, OpenAI Operator, MCP standard, Amazon Quick agents
// - On-device: Apple Intelligence (AFM), Gemma 3, Phi-4 mini, Llama 4 small variants
// - Cost compression: GPT-5.5-mini at sub-cent pricing, Gemini 3.1 cheapest frontier

const TRENDS: Trend[] = [
  {
    title: 'AI that "thinks before it speaks"',
    oneLine: 'Reasoning models — slower, but much smarter on hard problems.',
    whatItIs:
      'A new class of models (OpenAI o3, GPT-5.5 Pro, DeepSeek R1, Claude with "extended thinking") that pause and reason internally before responding. They take 5-60 seconds for complex tasks but solve problems older models couldn&apos;t.',
    whatYoullSee:
      'A "thinking..." indicator in your AI chat. Toggles like "extended thinking", "deep research", or "Pro mode" that slow down responses but improve quality dramatically. ChatGPT&apos;s "Thinking" mode is the most visible example.',
    whyItMatters:
      'For most everyday tasks (drafting emails, summarising), the fast models are still the right choice. But for hard analytical work — financial modeling, legal review, deep research, complex math — reasoning models genuinely outperform humans on benchmarks now. They cost more per call but reduce errors enough to be worth it for high-stakes decisions.',
    whatToDo:
      'Know which mode you&apos;re using. Default to fast/cheap. Switch to reasoning mode when accuracy matters more than speed. If your team is spending hours on analytical work, that&apos;s where reasoning models pay off.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    title: 'AI that sees, hears, and watches',
    oneLine: 'Native multimodal — one model handles text, images, audio, and video.',
    whatItIs:
      'Frontier models like Gemini 3.1 Pro, GPT-5.5, and Claude Opus 4.7 are trained on text, images, audio, and video together. You can paste a screenshot, a chart, a PDF, or upload a video, and ask questions about all of it in one conversation.',
    whatYoullSee:
      'Drag-and-drop boxes on every major AI tool. The ability to take a photo of a whiteboard and have AI summarise it. AI-generated subtitles. Video meeting summaries with screenshots called out. AI reading your dashboards and explaining what changed.',
    whyItMatters:
      'A huge fraction of business knowledge lives in slides, screenshots, scanned documents, and meeting recordings — not text. Multimodal AI unlocks all of it. The day-to-day implication: stop converting things to text before pasting. Just paste the screenshot.',
    whatToDo:
      'Try it on your existing pile of unread PDFs, screenshots, and meeting recordings. Most people are still treating AI as text-only out of habit.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    title: 'AI that takes actions, not just gives answers',
    oneLine: 'Agentic AI — models that use tools, click buttons, and complete tasks end-to-end.',
    whatItIs:
      'AI that can read your email, look at your calendar, fill in forms, run reports, file tickets — not just describe what to do, but actually do it. Examples: Claude&apos;s "computer use", OpenAI Operator, ChatGPT Agents, Amazon Quick agents, Microsoft Copilot Studio agents.',
    whatYoullSee:
      'AI buttons that say "Do this for me" instead of "Tell me how." Agents in Slack and Teams that respond with "I&apos;ve filed the ticket" instead of instructions. Connected apps in your AI tools (Gmail, Salesforce, Jira, GitHub).',
    whyItMatters:
      'This is the shift from AI-as-answer-machine to AI-as-junior-employee. The productivity gains are bigger than for chat AI — but so are the risks. An AI that can email customers can also email the wrong customer.',
    whatToDo:
      'Start with read-only agents (research, summaries, drafts). Move to "draft + human approval" agents for anything customer-facing. Save fully autonomous for tasks where mistakes are cheap and reversible.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    title: 'AI that runs on your laptop or phone',
    oneLine: 'On-device AI — small models that work offline, with no per-call cost.',
    whatItIs:
      'Models small enough to run on a laptop or phone (1-8B parameters). Apple Intelligence does this by default on newer iPhones. Gemma 3, Phi-4 mini, and Llama small variants run on most modern hardware.',
    whatYoullSee:
      'AI features in apps that work without internet. "On-device" or "private mode" toggles. Faster, cheaper AI for everyday tasks where you don&apos;t need frontier intelligence. iPhone Photos that searches your library by content.',
    whyItMatters:
      'Privacy: your data never leaves the device. Cost: zero per call. Latency: instant. The trade-off is intelligence — these are smaller, less capable models. Good for narrow tasks (transcription, summaries, simple Q&A); not great for complex reasoning.',
    whatToDo:
      'For sensitive data (HR, legal, medical) push for on-device or self-hosted AI. For most office work, frontier cloud models are still better. Watch for "private mode" toggles in your tools.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    title: 'AI is getting cheaper, faster',
    oneLine: 'Cost compression — every year, the same intelligence costs ~10× less.',
    whatItIs:
      'GPT-3-level intelligence cost ~$60 per million tokens in 2020. GPT-5.5-mini today costs about $0.20 for the same intelligence — and is much faster. This curve has held for 5 years and shows no sign of stopping.',
    whatYoullSee:
      '"Mini" or "Flash" or "Haiku" variants of every frontier model — same brand, much cheaper, fast enough for most tasks. Free tiers expanding (ChatGPT Free, Gemini, Claude Free, Amazon Quick Free). Things that were "too expensive to use AI for" 12 months ago are now routine.',
    whyItMatters:
      'Two things flip every 12-18 months: (1) tasks that weren&apos;t worth automating become worth automating, (2) the cheap-tier model from 12 months ago is now free or near-free. Plans built on "AI is too expensive for this" will be wrong by next year.',
    whatToDo:
      'Re-evaluate "we tried AI for that and it was too expensive" decisions every 12 months. The cost will have dropped 10×. Build with the cheaper tier whenever possible — saves money now and gets cheaper as time passes.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
]

// NOTE: this component never had SV/KO translations in the legacy system
// (it called `useT(EN, {})` with empty translation overrides). EN remains
// inline pending future translation work — same behavior as before.
const C = {
  title: '3. Where AI Is Heading — and What It Means for You',
  intro:
    'Five trends that matter for business decisions over the next 12-24 months. Each one is already happening, not speculative — but the pace at which they show up in your daily tools varies.',
  selfExplainPrompt:
    'Pick one of the five trends above. Sketch how it would change one specific process at your company over the next 12 months — what would you start preparing for now?',
  selfExplainAnswer:
    'Example — agentic AI in your customer support team: Today, your AI chatbot answers questions but a human still files tickets, looks up orders, and processes refunds. In 12 months, agents in Amazon Quick or Salesforce Agentforce will plausibly do all of that end-to-end for routine cases. To prepare: (1) document your team&apos;s decision rules now (what counts as routine? when must a human approve?). (2) clean up the systems the agent will need to read — the agent is only as good as your CRM hygiene. (3) plan the role shift — the support team moves from "doing tickets" to "supervising agents and handling exceptions." Failures are mostly organisational, not technical.',
}

export const WhereItsHeadingBusiness: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="heading-biz">
      <h2 id="heading-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{C.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{C.intro}</p>

      <div className="mb-6 space-y-2">
        {TRENDS.map((t, i) => (
          <div key={t.title} className={`rounded-lg border ${t.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.title}</span>
                <span className="ml-2 text-xs text-zinc-500">— {t.oneLine}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-sm">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">What it actually is</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: t.whatItIs }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Where you&apos;ll see it in real life</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: t.whatYoullSee }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-amber-300">Why it matters for business</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: t.whyItMatters }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-emerald-400">What to do about it</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: t.whatToDo }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <SelfExplain prompt={C.selfExplainPrompt} modelAnswer={C.selfExplainAnswer} />
    </section>
  )
}
