import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { EvolutionLadderSection } from './prompting/EvolutionLadderSection'
import { CoreTechniquesSection } from './prompting/CoreTechniquesSection'
import { SystemPromptsSection } from './prompting/SystemPromptsSection'
import { StructuredOutputSection } from './prompting/StructuredOutputSection'
import { AdvancedPatternsSection } from './prompting/AdvancedPatternsSection'
import { BasicsBusiness } from './prompting/BasicsBusiness'
import { TechniquesBusiness } from './prompting/TechniquesBusiness'
import { CookbookBusiness } from './prompting/CookbookBusiness'
import { SystemPromptsBusiness } from './prompting/SystemPromptsBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const QUESTIONS: Question[] = [
  {
    id: 'prompting-1',
    type: 'mc',
    question: 'You need an LLM to classify customer emails into 5 categories. You have no labeled examples. Which technique should you try first, and why?',
    options: [
      'Few-shot prompting with made-up examples for each category',
      'Zero-shot with clear category definitions and decision criteria in the prompt',
      'Chain-of-thought prompting to reason through each email',
      'Fine-tuning a model on synthetic data',
    ],
    correctIndex: 1,
    explanation: 'With no real examples, zero-shot with well-defined categories is the right starting point. Clear definitions give the model decision boundaries. Made-up examples risk teaching wrong patterns. CoT adds unnecessary latency for classification. Fine-tuning is premature — try prompting first.',
  },
  {
    id: 'prompting-2',
    type: 'free',
    question: 'Explain the purpose of a system prompt and how it differs from the user message. Why can\'t you just put everything in the user message?',
    modelAnswer: 'The system prompt sets persistent behavior, role, and constraints that apply across all turns of a conversation. It differs from user messages in that: (1) It\'s processed first and frames all subsequent interactions. (2) It establishes consistent behavior — tone, format, safety rules — without repeating them each turn. (3) Many APIs give system prompts higher priority in attention. You could put everything in the user message, but you\'d lose turn-persistent behavior, the content would compete with the actual query for attention, and multi-turn conversations would require repeating instructions every message.',
    explanation: 'System prompts create a persistent behavioral frame. They separate "how to behave" from "what to do right now," enabling consistent multi-turn interactions.',
  },
  {
    id: 'prompting-3',
    type: 'mc',
    question: 'Why does chain-of-thought prompting improve accuracy on math and reasoning tasks?',
    options: [
      'It makes the model use more compute by generating more tokens',
      'It forces the model to decompose problems into steps, making each step easier and exposing intermediate reasoning that can self-correct',
      'It activates special reasoning circuits in the transformer',
      'It reduces hallucination by grounding the model in facts',
    ],
    correctIndex: 1,
    explanation: 'CoT works because it decomposes hard problems into easier sub-problems. Each generated token conditions the next, so intermediate steps create a "scratchpad" that guides the model toward the correct answer. The model effectively gets to "think out loud" rather than jumping to a final answer in one step.',
  },
  {
    id: 'prompting-4',
    type: 'mc',
    question: 'You need an LLM to output valid JSON for a downstream API. The model sometimes adds markdown formatting or explanatory text around the JSON. What\'s the most reliable fix?',
    options: [
      'Add "Output only JSON" to the prompt',
      'Use regex to extract JSON from the response',
      'Use the API\'s structured output / JSON mode feature combined with a schema definition',
      'Increase temperature to 0 for deterministic output',
    ],
    correctIndex: 2,
    explanation: 'Structured output modes (like OpenAI\'s JSON mode or response_format) constrain the model\'s token generation to only produce valid JSON matching a schema. This is a hard guarantee, unlike prompt instructions which the model can ignore, or regex which is fragile. Temperature 0 doesn\'t prevent format violations.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  { id: 'prompt-biz-1', type: 'mc', question: 'You ask AI "write me an email" and get a generic, useless result. What went wrong?', options: ['The AI model is too small', 'The prompt was too vague — you didn\'t specify who it\'s to, what it\'s about, the tone, or the length', 'AI can\'t write emails', 'You need a more expensive AI model'], correctIndex: 1, explanation: 'Like giving instructions to a new intern — "write something" gets vague results. "Draft a follow-up email to a client who hasn\'t responded in 2 weeks, professional but warm, under 100 words" gets exactly what you need.' },
  { id: 'prompt-biz-2', type: 'mc', question: 'Which prompting technique is most like training a new employee by showing them examples of good work?', options: ['Giving the AI a role', 'Asking for step-by-step thinking', 'Providing examples of what good output looks like', 'Specifying the output format'], correctIndex: 2, explanation: 'Showing examples (called "few-shot" in technical terms) is exactly like training by example. The AI picks up on patterns in tone, structure, and approach from the examples you provide.' },
]

export const PromptingModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="prompting" title="How to Talk to AI" subtitle="Getting great results from AI is about asking the right way. Learn practical techniques you can use today.">
        <BasicsBusiness />
        <TechniquesBusiness />
        <CookbookBusiness />
        <SystemPromptsBusiness />
        <KnowledgeCheck moduleId="prompting-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="prompting" title="Prompt Engineering" subtitle="From zero-shot to multi-step reasoning — the techniques that turn vague requests into reliable, structured, production-ready LLM outputs.">
      <EvolutionLadderSection />
      <CoreTechniquesSection />
      <SystemPromptsSection />
      <StructuredOutputSection />
      <AdvancedPatternsSection />
      <KnowledgeCheck moduleId="prompting" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
