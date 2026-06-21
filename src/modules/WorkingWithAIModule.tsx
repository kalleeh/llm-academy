import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import { ModuleChallenges } from '../components/ModuleChallenges'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { WhatModelSeesSection } from './workingwithai/WhatModelSeesSection'
import { IterationLoopSection } from './workingwithai/IterationLoopSection'
import { PowerFeaturesSection } from './workingwithai/PowerFeaturesSection'
import { AgentContextSection } from './workingwithai/AgentContextSection'
import { StarterKitSection } from './workingwithai/StarterKitSection'
import { BriefingBusiness } from './workingwithai/BriefingBusiness'
import { VagueToValuableBusiness } from './workingwithai/VagueToValuableBusiness'
import { MakeItStickBusiness } from './workingwithai/MakeItStickBusiness'

const QUESTIONS: Question[] = [
  {
    id: 'workai-1',
    type: 'mc',
    question: 'A 100-message chat that has covered three different tasks starts giving muddled, off-target answers. What is the most effective fix?',
    options: [
      'Ask the model to try harder and pay attention',
      'Start a fresh chat for the current task, carrying over a short summary of what matters',
      'Switch to a different AI provider',
      'Repeat your last question in all caps',
    ],
    correctIndex: 1,
    explanation:
      'The model re-reads the whole thread every turn — a wandering thread means diluted, conflicting context. A fresh chat with a tight summary gives it exactly what the current task needs and nothing else. "New task, new chat" is the cheapest quality upgrade.',
  },
  {
    id: 'workai-2',
    type: 'free',
    question: 'Describe the iteration loop for working with a chat assistant, and explain why a mediocre first output is useful rather than a failure.',
    modelAnswer:
      'The loop: prompt → read the output as a diagnostic → identify what context was missing (sample data, constraints, format, the real rule) → supply it in a refined prompt → repeat. A mediocre first output is useful because the gap between what you got and what you wanted is precisely the list of context you failed to supply — it tells you what to add. Two informed turns beat ten vague ones.',
    explanation:
      'Treating outputs as diagnostics turns disappointment into information. The skill is reading the gap, not writing one perfect mega-prompt.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'workai-biz-1',
    type: 'mc',
    question: 'Your AI draft of a customer email came out generic and off-brand. What went wrong, most likely?',
    options: [
      'The AI is not good at emails',
      'The brief was generic — no context about your company, audience, or tone, so the model filled the gaps with averages',
      'You need a paid plan for better writing',
      'Emails should not be delegated to AI',
    ],
    correctIndex: 1,
    explanation:
      'Generic in, generic out. The model fills every unspecified gap with the statistical average. One sentence each of context, task, format, and audience turns the same model into something that sounds like you.',
  },
  {
    id: 'workai-biz-2',
    type: 'mc',
    question: 'You find yourself typing "I manage the front office at a dental clinic, keep it concise and friendly" at the start of every chat. What should you do?',
    options: [
      'Keep typing it — repetition is unavoidable',
      'Put it in custom instructions so every chat starts pre-briefed',
      'Stop providing that context to save time',
      'Use a different assistant for each tone',
    ],
    correctIndex: 1,
    explanation:
      'Anything true in every chat belongs in custom instructions — your role, company, preferred tone and length. Set it once and the "who you are" half of every brief is permanently handled.',
  },
]

export const WorkingWithAIModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="working-with-ai" title="Working With AI" subtitle="Brief it like a colleague, iterate like an editor — make great AI results your default.">
        <BriefingBusiness />
        <VagueToValuableBusiness />
        <MakeItStickBusiness />
        <AgentContextSection />
        <StarterKitSection />
        <ModuleChallenges moduleId="workingwithai-business" />
        <KnowledgeCheck moduleId="workingwithai-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="working-with-ai" title="Working With AI" subtitle="Context, iteration, files, custom instructions — getting great results from a chat assistant.">
      <WhatModelSeesSection />
      <IterationLoopSection />
      <PowerFeaturesSection />
      <AgentContextSection />
      <StarterKitSection />
      <ModuleChallenges moduleId="workingwithai" />
      <KnowledgeCheck moduleId="workingwithai" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
