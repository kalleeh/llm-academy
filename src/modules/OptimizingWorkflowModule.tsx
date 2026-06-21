import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import { ModuleChallenges } from '../components/ModuleChallenges'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { WhereAIFitsSection } from './optimizingworkflow/WhereAIFitsSection'
import { ReusableSetupsSection } from './optimizingworkflow/ReusableSetupsSection'
import { TeamPatternsSection } from './optimizingworkflow/TeamPatternsSection'
import { PromptLibrarySection } from './optimizingworkflow/PromptLibrarySection'
import { AIShapedTasksBusiness } from './optimizingworkflow/AIShapedTasksBusiness'
import { OneOffToSystemBusiness } from './optimizingworkflow/OneOffToSystemBusiness'
import { RollItOutBusiness } from './optimizingworkflow/RollItOutBusiness'

const QUESTIONS: Question[] = [
  {
    id: 'optwf-1',
    type: 'mc',
    question: 'You notice you have pasted the same paragraph about your stack and test conventions into the chat several times this week. What is the highest-leverage fix?',
    options: [
      'Type faster, or keep a copy in a scratch file to paste',
      'Move that standing context into an AGENTS.md / custom instructions the tool reads automatically, and turn the recurring action into a saved command',
      'Switch to a model with a bigger context window',
      'Accept that re-explaining context is just part of using AI',
    ],
    correctIndex: 1,
    explanation:
      'Re-typed context is the signal to build a setup. Standing facts belong in a file the tool reads every session (AGENTS.md / custom instructions); the recurring action becomes a saved prompt or command. The five-minute setup pays for itself by the third use.',
  },
  {
    id: 'optwf-2',
    type: 'free',
    question: 'Your team wants to "measure our AI impact" and proposes tracking lines of AI-generated code. Why is that the wrong metric, and what would you measure instead?',
    modelAnswer:
      'Lines of AI code is a vanity metric: more lines can mean genuine speed or it can mean bloat and review burden — it does not distinguish them, and it is trivially gamed. Measure outcomes instead: cycle time (idea to merged PR), time-to-first-PR for new hires, the share of a task that shifted from "writing" to "reviewing", and honest notes on where AI did NOT help. Those tie to value and survive a cost review.',
    explanation:
      'Good metrics measure time saved and throughput, not volume produced. Volume metrics reward generating more code, which is often the opposite of the goal.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'optwf-biz-1',
    type: 'mc',
    question: 'You want to find where AI will help your team most. Which task is the best first candidate?',
    options: [
      'A high-stakes one-off: next year\'s strategy memo',
      'A recurring, text-shaped, judgment-light task — like the weekly status digest you rebuild every Monday',
      'Whatever task is most visible to leadership',
      'The most technically impressive thing AI can do',
    ],
    correctIndex: 1,
    explanation:
      'AI-shaped tasks are recurring, judgment-light, and text-shaped. The weekly time-sink that fits all three earns back your setup effort many times over — far more than a flashy one-off or a high-judgment call you should keep.',
  },
  {
    id: 'optwf-biz-2',
    type: 'mc',
    question: 'You rebuild the same weekly report from scratch in the chat every Monday. What turns this one-off habit into a system?',
    options: [
      'Type the request more politely each week',
      'Save the brief that worked and set up a project holding the recurring sources, so "generate this week\'s report" is the whole instruction',
      'Ask a different colleague to do it',
      'Wait for the AI to remember on its own',
    ],
    correctIndex: 1,
    explanation:
      'A system is a good brief that stopped living in your head. Saving the winning brief and putting the recurring sources in a project turns a 90-minute rebuild into a 5-minute review job — the redo disappears, your judgment stays the last step.',
  },
]

export const OptimizingWorkflowModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="optimizing-workflow" title="Optimizing Your Workflow" subtitle="Find your AI-shaped tasks, turn one-offs into systems, and roll it out to your team.">
        <AIShapedTasksBusiness />
        <OneOffToSystemBusiness />
        <RollItOutBusiness />
        <PromptLibrarySection />
        <ModuleChallenges moduleId="optimizingworkflow-business" />
        <KnowledgeCheck moduleId="optimizingworkflow-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="optimizing-workflow" title="Optimizing Your Workflow" subtitle="Where AI fits your day, reusable setups, team patterns — from one-off prompts to a system.">
      <WhereAIFitsSection />
      <ReusableSetupsSection />
      <TeamPatternsSection />
      <ModuleChallenges moduleId="optimizingworkflow" />
      <KnowledgeCheck moduleId="optimizingworkflow" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
