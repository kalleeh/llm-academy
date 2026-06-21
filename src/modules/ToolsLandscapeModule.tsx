import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import { ModuleChallenges } from '../components/ModuleChallenges'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { ToolCategoriesSection } from './toolslandscape/ToolCategoriesSection'
import { AgenticLoopSection } from './toolslandscape/AgenticLoopSection'
import { ChoosingStackSection } from './toolslandscape/ChoosingStackSection'
import { ToolCategoriesBusiness } from './toolslandscape/ToolCategoriesBusiness'
import { DelegationDemoBusiness } from './toolslandscape/DelegationDemoBusiness'
import { PickingToolsBusiness } from './toolslandscape/PickingToolsBusiness'

const QUESTIONS: Question[] = [
  {
    id: 'toolsland-1',
    type: 'mc',
    question: 'You need to rename a config key that appears in ~40 files across a repo, updating tests as you go. Which tool fits best, and why?',
    options: [
      'A chat assistant — paste each file in and apply the edits it suggests',
      'An IDE assistant — accept inline suggestions file by file',
      'An agentic coding tool — it can search the repo, edit all files, and run the tests itself',
      'No AI — multi-file changes are too risky to involve AI at all',
    ],
    correctIndex: 2,
    explanation:
      'This is the signature agentic-coding task: multi-file, mechanical, and verifiable by tests. A chat assistant can\'t see the repo, an IDE assistant works one file at a time. The test suite is the safety net that makes agent autonomy safe here.',
  },
  {
    id: 'toolsland-2',
    type: 'free',
    question: 'Describe the agentic loop (the cycle an agentic tool runs for each task) and explain why the verification step changes how much you can safely delegate.',
    modelAnswer:
      'The loop is: understand the task → plan → act (edit files, run commands) → verify (run tests, check output) → repeat or report. Verification is what makes delegation safe: if the agent proves its work with passing tests or checkable sources, you can review outcomes instead of supervising every step. Without verification you\'d have to re-check everything manually, which erases the time saved.',
    explanation:
      'The verify step is the difference between "AI that generates plausible output" and "an agent whose work you can trust at checkpoints." Delegation scales with verifiability.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'toolsland-biz-1',
    type: 'mc',
    question: 'Your operations team manually assembles a weekly report from five spreadsheets and a folder of emails. Which AI tool category fits best?',
    options: [
      'A chat assistant — paste the spreadsheets into the chat each week',
      'An agentic work app — delegate the whole assembly and review the draft',
      'A coding agent like Claude Code',
      'None — recurring reports must be done by hand for accuracy',
    ],
    correctIndex: 1,
    explanation:
      'Recurring, multi-source, well-defined output is exactly what agentic work apps are for. The agent operates on the files directly — no weekly copy-paste — and a human reviews the draft. Accuracy comes from the review checkpoint, not from doing it by hand.',
  },
  {
    id: 'toolsland-biz-2',
    type: 'mc',
    question: 'What is the most important skill shift for a team that starts delegating work to agentic AI tools?',
    options: [
      'Learning to write code',
      'Typing faster prompts',
      'Writing clear briefs and reviewing work at checkpoints — managing, not doing',
      'Memorizing each tool\'s menu options',
    ],
    correctIndex: 2,
    explanation:
      'Agentic tools turn doers into delegators. The quality of the brief (outcome, format, constraints) determines the quality of the output, and checkpoint review is where errors get caught cheaply. These are management skills, applied to AI.',
  },
]

export const ToolsLandscapeModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="tools-landscape" title="AI Tools Landscape" subtitle="The AI tools your teams should be using — and how to pick the right one for each job.">
        <ToolCategoriesBusiness />
        <DelegationDemoBusiness />
        <PickingToolsBusiness />
        <ModuleChallenges moduleId="toolslandscape-business" />
        <KnowledgeCheck moduleId="toolslandscape-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="tools-landscape" title="AI Tools Landscape" subtitle="Chat assistants, agentic work apps, coding agents — what tool for what job, and why.">
      <ToolCategoriesSection />
      <AgenticLoopSection />
      <ChoosingStackSection />
      <ModuleChallenges moduleId="toolslandscape" />
      <KnowledgeCheck moduleId="toolslandscape" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
