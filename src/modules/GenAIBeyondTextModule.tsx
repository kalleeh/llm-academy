import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { ModalitiesModelsSection } from './genaibeyondtext/ModalitiesModelsSection'
import { MultimodalAPISection } from './genaibeyondtext/MultimodalAPISection'
import { ChoosingIntegratingSection } from './genaibeyondtext/ChoosingIntegratingSection'
import { ModalityUsesBusiness } from './genaibeyondtext/ModalityUsesBusiness'
import { PickTheToolBusiness } from './genaibeyondtext/PickTheToolBusiness'
import { UseResponsiblyBusiness } from './genaibeyondtext/UseResponsiblyBusiness'

const QUESTIONS: Question[] = [
  {
    id: 'genai-1',
    type: 'mc',
    question: 'A teammate says "let\'s add a feature where users photograph a document and we pull out the fields." Which modality and integration is the most direct fit?',
    options: [
      'Train a custom image-diffusion model on documents',
      'A multimodal/vision model via API — send the image + a prompt asking for the fields as structured JSON',
      'A text-to-speech model',
      'A video generation model',
    ],
    correctIndex: 1,
    explanation:
      'Reading content out of an image is a multimodal/vision job: send the image and a prompt requesting structured JSON (ideally with a strict schema), get JSON back. It is an ordinary API call — no training needed. Diffusion models generate images, they do not read them; TTS and video are unrelated.',
  },
  {
    id: 'genai-2',
    type: 'free',
    question: 'Generating a short video clip costs far more than generating an image, which costs far more than a vision-on-text call. What does that cost structure imply for how you design a media feature?',
    modelAnswer:
      'Budget per asset and design around the cost gradient: prefer the cheapest modality that does the job (vision/text over image over video), generate at the smallest size/length that works, cache and reuse aggressively, and reserve expensive video generation for high-value moments with a human in the loop. Make cost-per-asset a visible metric, set ceilings, and avoid letting users trigger unbounded expensive generations. The engineering is the same request/response as text, but the unit economics force restraint that text features rarely need.',
    explanation:
      'Media calls are billed per image/second, not per token, and the gradient is steep. Good designs default to the cheapest sufficient modality and cap the expensive ones.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'genai-biz-1',
    type: 'mc',
    question: 'Marketing wants 30 on-brand image variations for a launch page, fast. Which kind of tool fits best?',
    options: [
      'A video generation tool',
      'An image generation tool (with brand review before publishing)',
      'A speech-to-text transcription tool',
      'None — only a human designer can do this',
    ],
    correctIndex: 1,
    explanation:
      'Image generation produces and edits on-brand visuals in minutes at near-zero cost — ideal for volume and A/B variations. Keep a brand-accuracy review before publishing, and disclose AI imagery where required. Video and STT are the wrong modality here.',
  },
  {
    id: 'genai-biz-2',
    type: 'mc',
    question: 'Your team wants a branded voiceover and someone suggests cloning a popular celebrity\'s voice to narrate it. What is the right call?',
    options: [
      'Go ahead — if AI made it, it is fine to use',
      'Don\'t clone a real person\'s voice without consent; use a licensed or synthetic brand voice with clear rights',
      'Only clone the voice if the video is internal',
      'Cloning is always illegal, so avoid all AI voice tools',
    ],
    correctIndex: 1,
    explanation:
      'Cloning a real person\'s voice without consent is a rights and reputation problem — "it was AI" is not a defense. Use licensed or synthetic voices with clear commercial terms. AI voice tools themselves are fine; cloning someone you don\'t have rights to is the issue.',
  },
]

export const GenAIBeyondTextModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="genai-beyond-text" title="Generative AI Beyond Text" subtitle="Image, voice, video, and multimodal — what each is for, the tools, and using them responsibly.">
        <ModalityUsesBusiness />
        <PickTheToolBusiness />
        <UseResponsiblyBusiness />
        <KnowledgeCheck moduleId="genaibeyondtext-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="genai-beyond-text" title="Generative AI Beyond Text" subtitle="Image, voice, video, and multimodal — the models and APIs, and how to integrate them.">
      <ModalitiesModelsSection />
      <MultimodalAPISection />
      <ChoosingIntegratingSection />
      <KnowledgeCheck moduleId="genaibeyondtext" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
