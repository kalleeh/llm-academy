import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { WhoBuiltWhatSection } from './industry/WhoBuiltWhatSection'
import { OpenVsClosedSection } from './industry/OpenVsClosedSection'
import { EcosystemSection } from './industry/EcosystemSection'
import { WhereItsHeadingSection } from './industry/WhereItsHeadingSection'
import { KeyPlayersBusiness } from './industry/KeyPlayersBusiness'
import { OpenVsClosedBusiness } from './industry/OpenVsClosedBusiness'
import { WhereItsHeadingBusiness } from './industry/WhereItsHeadingBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const QUESTIONS: Question[] = [
  {
    id: 'industry-1',
    type: 'mc',
    question: 'A startup needs to build a medical chatbot that processes patient data. They want maximum control over data privacy and the ability to customize model behavior. Which approach best fits their constraints?',
    options: [
      'Use GPT-4o API with a strong system prompt',
      'Fine-tune an open model like Llama and self-host it',
      'Use Claude API with a BAA agreement',
      'Wait for a medical-specific closed model',
    ],
    correctIndex: 1,
    explanation: 'Open models give full fine-tuning control for medical domain adaptation and eliminate per-query API costs at scale. However, self-hosting doesn\'t automatically mean better security — they\'d still need proper encryption, access controls, and compliance infrastructure. Enterprise API services with HIPAA BAAs are also viable. The key advantage of open models here is customization depth, not just privacy.',
  },
  {
    id: 'industry-2',
    type: 'free',
    question: 'Explain why the gap between open and closed models has been shrinking. What specific technical and ecosystem factors enabled open models to catch up?',
    modelAnswer: 'Several factors drove convergence: (1) Architecture innovations like MoE became public knowledge, letting open labs like DeepSeek build efficient large models. (2) The open-source ecosystem (HuggingFace, Unsloth, vLLM) dramatically lowered the barrier to training and serving. (3) Distillation from frontier models provided high-quality synthetic training data. (4) Companies like Meta strategically released weights to build ecosystem moats. (5) Quantization advances (GGUF, AWQ) made large open models runnable on consumer hardware.',
    explanation: 'The convergence is driven by both technical advances (MoE, distillation, quantization) and strategic decisions by companies to open-source weights, creating a virtuous cycle of community improvement.',
  },
  {
    id: 'industry-3',
    type: 'mc',
    question: 'Why do companies like Meta release model weights for free despite spending hundreds of millions on training?',
    options: [
      'They are legally required to as a public company',
      'Open weights create an ecosystem moat — developers build on their platform, driving adoption of Meta\'s infrastructure and tools',
      'They cannot monetize the models through APIs',
      'Open-source models always outperform closed ones',
    ],
    correctIndex: 1,
    explanation: 'Meta\'s strategy is ecosystem-driven: free weights attract developers who build on Llama, creating dependency on Meta\'s ecosystem. This drives adoption of their hardware, cloud partnerships, and developer tools — similar to how Android being free helped Google dominate mobile.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  { id: 'ind-biz-1', type: 'mc', question: 'Why does Meta give away their AI model (Llama) for free?', options: ['They can\'t figure out how to charge for it', 'Free models build an ecosystem — developers build on Llama, creating dependency on Meta\'s tools and infrastructure (like Android helped Google)', 'Open-source models are always better', 'It\'s required by law'], correctIndex: 1, explanation: 'Meta\'s strategy is like Google\'s with Android — give away the core product to build an ecosystem that drives adoption of your broader platform.' },
  { id: 'ind-biz-2', type: 'mc', question: 'Your company handles sensitive customer data. Which matters most when choosing between open and closed AI models?', options: ['Which model scores highest on benchmarks', 'Data privacy — with open models you can keep data on your own servers; with closed models, data goes to the provider', 'Which company is biggest', 'The model\'s release date'], correctIndex: 1, explanation: 'For sensitive data, the key question is: where does the data go? Open models let you self-host (data stays with you). Closed APIs send data to the provider\'s servers.' },
]

export const IndustryModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="industry" title="Who Makes What" subtitle="The key AI companies, what they offer, and the open vs closed debate — and what it means for your business.">
        <KeyPlayersBusiness />
        <OpenVsClosedBusiness />
        <WhereItsHeadingBusiness />
        <KnowledgeCheck moduleId="industry-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="industry" title="The Industry Map" subtitle="Who&apos;s building LLMs, how open vs closed models compare, the ecosystem that connects them, and where the field is heading in 2026 and beyond.">
      <WhoBuiltWhatSection />
      <OpenVsClosedSection />
      <EcosystemSection />
      <WhereItsHeadingSection />
      <KnowledgeCheck moduleId="industry" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
