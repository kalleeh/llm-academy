import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { BusinessImpactBusiness } from './agents/BusinessImpactBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'org-biz-1',
    type: 'mc',
    question: 'Your CEO wants fully autonomous AI customer support by Q4. Using the autonomy spectrum, what\'s the best approach?',
    options: [
      'Go straight to full autonomy — the technology is ready',
      'Start at Level 2 (AI acts within rules, humans monitor) for routine tasks, expand gradually based on performance data',
      'Don\'t use AI for customer support — too risky',
      'Wait until AI is 100% reliable before deploying anything',
    ],
    correctIndex: 1,
    explanation: 'The Waymo approach: start narrow, expand with evidence. You get 70% of the efficiency gains early with minimal risk, and you have data to justify expanding autonomy — rather than one bad incident forcing a full rollback.',
  },
  {
    id: 'org-biz-2',
    type: 'mc',
    question: 'Industry analysts project that up to 40% of agentic AI initiatives may be cancelled by 2027. What\'s the primary reason?',
    options: [
      'The AI models aren\'t good enough',
      'Organizations aren\'t ready — governance gaps, unclear accountability, and process changes that weren\'t planned for',
      'AI is too expensive',
      'Customers don\'t want to interact with AI',
    ],
    correctIndex: 1,
    explanation: 'The failures are organizational, not technological. Teams build the agent before defining what decisions it can make, who\'s accountable when it\'s wrong, and how existing processes need to change. Technology-first, process-second is the #1 failure pattern.',
  },
  {
    id: 'org-biz-3',
    type: 'mc',
    question: 'An AI agent can issue refunds up to $100 autonomously. A customer requests a $95 refund for a clearly fraudulent claim. The agent processes it because it\'s within the $100 limit. What governance control was missing?',
    options: [
      'The spend limit was too high',
      'The agent needed fraud detection logic — spend limits alone don\'t catch contextual problems',
      'AI should never issue refunds',
      'The agent needed a bigger model',
    ],
    correctIndex: 1,
    explanation: 'Spend limits are necessary but not sufficient. The agent also needs contextual rules (flag suspicious patterns), escalation triggers (unusual claim patterns → human review), and outcome monitoring (track refund fraud rate). Multiple layers of governance, not just one threshold.',
  },
  {
    id: 'org-biz-4',
    type: 'free',
    question: 'Self-driving cars are statistically safer than human drivers, yet many people feel less safe in them. How does this parallel apply to AI agents in your organization, and how would you address the trust gap?',
    modelAnswer: 'The parallel is about perceived control vs actual safety. People accept risks they feel they control (driving, making decisions manually) more than risks they don\'t (autonomous AI). Even if the AI makes fewer errors than humans, a single AI mistake feels scarier because no one was "at the wheel." To address this: (1) Start with transparency — show people what the AI is doing and why (audit trails, reasoning traces). (2) Give humans meaningful oversight, not rubber-stamp approval. (3) Celebrate the data — "the AI resolved 500 tickets this week with 98.5% accuracy and 4.6/5 CSAT." (4) Share failure stories honestly — "the AI got this wrong, here\'s what we fixed." (5) Let people opt out initially — forced adoption breeds resistance. Trust is built through evidence and experience, not mandates.',
    explanation: 'The trust gap is emotional, not rational. You can\'t logic people into trusting autonomous systems — you build trust through transparency, gradual exposure, honest communication about failures, and demonstrable results over time.',
  },
]

export const AIInOrgModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  // This module only exists in business mode
  if (mode !== 'business') return null

  return (
    <ModuleLayout moduleId="ai-in-org" title="AI in Your Organization" subtitle="The technology works. The harder question: is your organization ready? How autonomy changes
          roles, decisions, and risk — and why 40% of AI projects fail for non-technical reasons.">
      <BusinessImpactBusiness />
      <KnowledgeCheck moduleId="ai-in-org" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
