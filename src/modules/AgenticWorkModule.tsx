import { translateQuestions, useLanguage } from '../i18n'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { WhatIsAgenticWorkSection } from './agenticwork/WhatIsAgenticWorkSection'
import { DelegateSuperviseSection } from './agenticwork/DelegateSuperviseSection'
import { DelegateInExcelSection } from './agenticwork/DelegateInExcelSection'
import { GuardrailsSection } from './agenticwork/GuardrailsSection'
import { TaskToToolSection } from './agenticwork/TaskToToolSection'
import { BriefLibrarySection } from './agenticwork/BriefLibrarySection'

const QUESTIONS: Question[] = [
  {
    id: 'agwork-1',
    type: 'mc',
    question: 'Which task is the best candidate to delegate to an agentic work app?',
    options: [
      'Deciding which team members to lay off this quarter',
      'Reconciling 240 expense lines against a written policy and flagging the violations for your review',
      'Approving the final wording of a legal contract before signature',
      'Choosing the company\'s strategic direction for next year',
    ],
    correctIndex: 1,
    explanation:
      'A delegable task is multi-step (worth the setup), has a clear definition of done (so you can check it), and is recoverable if wrong (a flagged list you review, not an irreversible decision). The expense reconciliation fits all three; the others are high-judgment or irreversible calls you keep.',
  },
  {
    id: 'agwork-2',
    type: 'free',
    question: 'An agent is allowed to issue refunds up to $1,000 on its own. It approves a clearly fraudulent $950 refund. Which guardrail was missing, and why was the spending cap not enough?',
    modelAnswer:
      'The missing guardrail was a human-in-the-loop approval for refunds above a risk threshold (or any refund flagged as suspicious). A spending cap only limits the size of an action; it supplies no judgment about whether the action is legitimate. $950 was under the cap, so the cap let it through — exactly as designed. Caps limit magnitude; they do not detect fraud. The fix is to route risky or anomalous refunds to a person before they pay out, and to keep an audit trail so the decision is reviewable.',
    explanation:
      'Spend ceilings bound how much, never whether-it-should. Consequential or anomalous actions need a human checkpoint, not just a smaller number.',
  },
  {
    id: 'agwork-3',
    type: 'mc',
    question: 'You have delegated the same weekly inventory-reconciliation task to an agent four weeks running. What is the higher-leverage next move?',
    options: [
      'Keep delegating it each week — it works fine',
      'Ask an AI app builder to make you a small reusable tool that does the reconciliation, then review and keep it',
      'Hire a developer to build a custom system',
      'Go back to doing it by hand to stay in control',
    ],
    correctIndex: 1,
    explanation:
      'A delegation that repeats every week with the same shape is the signal it wants to become a tool. No-code/low-code app builders let you commission a reusable tool by describing it — same brief, bigger deliverable. You still review what it builds and own the result; you do not need a developer or a budget request.',
  },
]

export const AgenticWorkModule: React.FC = () => {
  const { lang } = useLanguage()

  return (
    <ModuleLayout moduleId="agentic-work" title="Agentic Work" subtitle="AI assistants that do tasks for you — delegate multi-step work, supervise, and set guardrails.">
      <WhatIsAgenticWorkSection />
      <DelegateSuperviseSection />
      <DelegateInExcelSection />
      <GuardrailsSection />
      <TaskToToolSection />
      <BriefLibrarySection />
      <KnowledgeCheck moduleId="agenticwork" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
