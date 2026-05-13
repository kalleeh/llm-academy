import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

interface RiskTier {
  tier: string
  examples: string
  obligations: string
  deadline: string
  color: string
  badge: string
}

// Verified May 2026 — EU AI Act timeline updated by Digital Omnibus deal (May 7 2026):
// - Prohibited AI: in force since Feb 2, 2025
// - GPAI obligations: in force Aug 2, 2025
// - High-risk (biometrics, critical infrastructure, education, employment,
//   law enforcement, migration): postponed to Dec 2, 2027 (was Aug 2, 2026)
// - Product-embedded AI: Aug 2, 2028 deadline
// - Watermarking on AI-generated content: Dec 2, 2026 (delayed from Feb 2027)
// Penalties: up to €35M or 7% of global annual turnover for prohibited AI;
// up to €15M or 3% for high-risk violations.
// Sources: europarl.europa.eu, reuters.com, iapp.org, traverssmith.com (May 2026)

const RISK_TIERS: RiskTier[] = [
  {
    tier: 'Unacceptable risk — banned',
    examples: 'Social scoring, real-time biometric ID in public, manipulation of vulnerable people, predictive policing based on profiling, untargeted facial-recognition scraping.',
    obligations: 'BANNED outright. Don&apos;t build, don&apos;t buy, don&apos;t deploy.',
    deadline: 'In force since 2 Feb 2025',
    color: 'border-red-500/30 bg-red-500/5',
    badge: 'bg-red-500/20 text-red-300',
  },
  {
    tier: 'High risk — heavy obligations',
    examples: 'AI in hiring, credit scoring, insurance underwriting, medical devices, critical infrastructure, education grading, law enforcement, migration / border control.',
    obligations:
      'Risk management system, data governance, technical docs, human oversight, accuracy + robustness + cybersecurity, post-market monitoring, conformity assessment before deployment, registration in EU database.',
    deadline: 'Postponed (May 2026 deal): now 2 Dec 2027 (was 2 Aug 2026); product-embedded AI: 2 Aug 2028.',
    color: 'border-amber-500/30 bg-amber-500/5',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  {
    tier: 'Limited risk — transparency',
    examples: 'Chatbots, AI-generated images / video / audio (deepfakes), emotion recognition, biometric categorisation.',
    obligations: 'Tell users they&apos;re interacting with AI. Watermark AI-generated content (Dec 2026).',
    deadline: 'Watermarking: 2 Dec 2026',
    color: 'border-blue-500/30 bg-blue-500/5',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  {
    tier: 'Minimal risk — no specific obligations',
    examples: 'AI-enabled spam filters, AI in video games, AI inventory management, AI-assisted writing tools used internally.',
    obligations: 'Voluntary best practices. Most everyday business AI use lands here.',
    deadline: 'No deadline',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
]

interface ConcreteObligation {
  obligation: string
  whatItMeans: string
  whoBears: string
}

const CONCRETE_OBLIGATIONS: ConcreteObligation[] = [
  {
    obligation: 'AI literacy for staff (Art. 4)',
    whatItMeans:
      'Anyone who uses AI tools at work must have appropriate training for the AI systems they use and the risks involved. The bar scales with risk.',
    whoBears: 'Every company using AI in the EU. In force since Feb 2025.',
  },
  {
    obligation: 'Disclose when users are talking to AI',
    whatItMeans:
      'A chatbot must be clearly labelled as AI. Customers must know they&apos;re not talking to a human.',
    whoBears: 'Anyone deploying customer-facing AI in the EU. In force.',
  },
  {
    obligation: 'Watermark AI-generated content',
    whatItMeans:
      'AI-generated images, video, and audio (especially deepfakes) need machine-readable watermarks. Content credentials standards (C2PA) are emerging as the de facto answer.',
    whoBears: 'AI tool providers and content publishers. Deadline: 2 Dec 2026.',
  },
  {
    obligation: 'High-risk system documentation',
    whatItMeans:
      'A technical dossier — training data sources, performance metrics, known failure modes, testing protocols. Must be ready before deployment and kept up to date.',
    whoBears: 'Anyone deploying high-risk AI in the EU. Deadline now 2 Dec 2027.',
  },
  {
    obligation: 'GDPR overlap (always)',
    whatItMeans:
      'AI doesn&apos;t change GDPR — your AI tool processing personal data still needs lawful basis, data minimisation, purpose limitation, DPIA for high-risk processing. Pasting customer data into ChatGPT Free is almost always a GDPR problem.',
    whoBears: 'Everyone processing EU personal data, AI or not.',
  },
]

const REGIONAL = [
  {
    region: 'EU',
    summary: 'AI Act (risk-tiered, in phased rollout). Penalties up to €35M / 7% of global turnover.',
  },
  {
    region: 'United States',
    summary:
      'No federal AI law (as of May 2026); patchwork of state laws (Colorado AI Act, NYC bias audit). Sector regulators (FTC, EEOC, FDA) apply existing rules to AI.',
  },
  {
    region: 'United Kingdom',
    summary: 'Pro-innovation, principles-based. Sector regulators lead. AI bill expected but not yet in force.',
  },
  {
    region: 'China',
    summary:
      'Generative AI rules in force since 2023, watermarking required, security reviews for public-facing AI.',
  },
  {
    region: 'Other',
    summary:
      'Canada (AIDA pending), Brazil (AI bill in progress), Japan, Korea — all moving toward risk-tiered approaches similar to the EU.',
  },
]

const PRACTICAL_CHECKLIST = [
  'Map every AI tool your team uses — including the unauthorised ones (shadow AI).',
  'Classify each by EU AI Act risk tier (most everyday tools are minimal risk).',
  'Confirm staff using AI have basic AI literacy training (now required, not aspirational).',
  'For customer-facing AI: add an "I&apos;m an AI" disclosure. Cheap fix, mandatory.',
  'Never paste customer personal data into consumer AI (ChatGPT Free, Claude Free). Use enterprise tiers (ChatGPT Enterprise, Claude Team, Amazon Quick) which have data-handling agreements.',
  'For any high-risk use case (hiring, credit, healthcare, education): get legal involved BEFORE you build. Retrofitting compliance is much more expensive.',
  'Keep an AI register — what models you use, for what, with what data. Auditors will ask.',
]

const EN = {
  title: '3. Compliance — What You Actually Need to Know',
  intro:
    'AI compliance is moving fast, varies by region, and changes often. Here&apos;s what matters in May 2026 — verified against the latest EU Digital Omnibus deal — without the legal jargon.',
  riskTiersTitle: 'EU AI Act in one diagram: four risk tiers',
  obligationsTitle: 'What every company needs to do (regardless of risk tier)',
  regionalTitle: 'Other regions, briefly',
  checklistTitle: 'Practical checklist',
  selfExplainPrompt:
    'Your HR team wants to use an AI tool to screen CVs. Walk through which EU AI Act risk tier this falls under, what obligations apply, and what you&apos;d need before going live.',
  selfExplainAnswer:
    'CV screening is squarely "high-risk AI" under the EU AI Act (Annex III, employment use case). Obligations: documented risk management, training data quality controls, technical documentation, human oversight (a hiring manager must meaningfully review AI output, not rubber-stamp), accuracy testing for bias across protected groups, post-deployment monitoring, registration in the EU database. The deadline was Aug 2 2026 but was just postponed to Dec 2 2027 (May 2026 Omnibus deal). Practically: don&apos;t deploy without legal review, a bias audit, a clear human-in-the-loop process, and a documented procedure for candidates to contest decisions. Penalties for non-compliance reach €15M or 3% of global revenue.',
}

export const ComplianceBusiness: React.FC = () => {
  const c = useT(EN, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="compliance-biz">
      <h2 id="compliance-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Risk tiers */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.riskTiersTitle}</h3>
      <div className="mb-6 space-y-2">
        {RISK_TIERS.map((t, i) => (
          <div key={t.tier} className={`rounded-lg border ${t.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs ${t.badge}`}>{t.tier.split(' — ')[0]}</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.tier.split(' — ')[1]}</span>
                </div>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-xs">
                <div>
                  <p className="mb-1 font-medium text-zinc-500">Examples</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: t.examples }} />
                </div>
                <div>
                  <p className="mb-1 font-medium text-zinc-500">Obligations</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: t.obligations }} />
                </div>
                <div>
                  <p className="mb-1 font-medium text-amber-300">Deadline (May 2026 status)</p>
                  <p className="text-zinc-700 dark:text-zinc-300">{t.deadline}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Concrete obligations */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.obligationsTitle}</h3>
      <div className="mb-6 space-y-2">
        {CONCRETE_OBLIGATIONS.map((o) => (
          <div key={o.obligation} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
            <p className="mb-1 font-mono text-sm font-medium text-amber-300">{o.obligation}</p>
            <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: o.whatItMeans }} />
            <p className="mt-2 text-xs text-zinc-500">Who: {o.whoBears}</p>
          </div>
        ))}
      </div>

      {/* Regional */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.regionalTitle}</h3>
      <div className="mb-6 grid gap-2 sm:grid-cols-2">
        {REGIONAL.map((r) => (
          <div key={r.region} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3">
            <p className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">{r.region}</p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{r.summary}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
        <p className="mb-3 text-sm font-medium text-emerald-300">{c.checklistTitle}</p>
        <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          {PRACTICAL_CHECKLIST.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: '☐ ' + item }} />
          ))}
        </ul>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
