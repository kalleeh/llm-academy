import { translateQuestions, useLanguage } from '../i18n'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { CodingAgentDifferentSection } from './agenticcoding/CodingAgentDifferentSection'
import { RealSessionSection } from './agenticcoding/RealSessionSection'
import { WorkingEffectivelySection } from './agenticcoding/WorkingEffectivelySection'
import { SpinUpToolsSection } from './agenticcoding/SpinUpToolsSection'
import { StealThisSetupSection } from './agenticcoding/StealThisSetupSection'

const QUESTIONS: Question[] = [
  {
    id: 'agcode-1',
    type: 'mc',
    question: 'What most fundamentally separates an agentic coding tool from an IDE autocomplete or a chat assistant?',
    options: [
      'It uses a larger language model',
      'It plans across steps and acts in your repo — editing files, running commands and tests, and verifying the result — rather than only suggesting or answering',
      'It only works with JavaScript',
      'It never makes mistakes',
    ],
    correctIndex: 1,
    explanation:
      'Autocomplete predicts the next tokens; chat advises in a window. An agent decomposes a task, reads and edits the codebase, runs tools (commands, tests, MCP), and verifies its own work in a think → act → verify loop. Acting-and-verifying is the dividing line.',
  },
  {
    id: 'agcode-2',
    type: 'free',
    question: 'You are about to hand a coding agent a task. Describe how you would scope it and where you would review, so you get a good result without watching every keystroke.',
    modelAnswer:
      'Scope it like a brief to a competent engineer: a clear outcome, the constraints that matter (interfaces to preserve, edge cases to handle), and a definition of done — e.g. "add retry-with-backoff to the S3 client, max 3 tries, keep the existing interface, add a test for the timeout path." Put durable project context (stack, conventions, test command) in an AGENTS.md so the agent starts pre-briefed. Then review at checkpoints: let it complete a coherent unit (the change plus a passing test) and review that diff like a PR, instead of supervising token by token. If it thrashes — two failed attempts at the same error — step in, add context or correct the plan rather than letting it dig deeper.',
    explanation:
      'Good scoping + durable context + checkpoint review is the operating model. You delegate the work but keep the accountability, and the agent\'s own tests are what let you review outcomes instead of keystrokes.',
  },
  {
    id: 'agcode-3',
    type: 'mc',
    question: 'A non-technical colleague needs a small internal form they will own and tweak themselves. You could build it as a single-file app in your repo or point them at a no-code app builder. What is the better default, and why?',
    options: [
      'Always build it yourself in the repo — code you own is always better',
      'A no-code builder, so they can change the fields without a PR or you in the loop — reserve code-you-maintain for what touches secrets or ships to users',
      'Refuse — non-technical people should not own tools',
      'Build it in your production framework so it is robust',
    ],
    correctIndex: 1,
    explanation:
      'Match ceremony to lifespan and ownership. A form a colleague will own and edit is better as a no-code app they control than as code that routes every change through you. Keep code-you-maintain for tools that touch credentials, need your repo, or ship to real users. Knowing when to hand off to no-code is its own engineering judgment.',
  },
]

export const AgenticCodingModule: React.FC = () => {
  const { lang } = useLanguage()

  return (
    <ModuleLayout moduleId="agentic-coding" title="Agentic Coding" subtitle="Coding with an agent as your pair — task decomposition, context & memory, review loops, MCP.">
      <CodingAgentDifferentSection />
      <RealSessionSection />
      <WorkingEffectivelySection />
      <SpinUpToolsSection />
      <StealThisSetupSection />
      <KnowledgeCheck moduleId="agenticcoding" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
