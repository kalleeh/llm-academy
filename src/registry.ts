import type { Course } from './CourseContext'

export type Persona = 'technical' | 'business'

export type ModuleId = 'ai-problem' | 'data-foundations' | 'tokens' | 'transformer' | 'training' | 'llm-data' | 'alignment' | 'architecture' | 'solution' | 'evaluation' | 'quantization' | 'inference' | 'industry' | 'embeddings' | 'prompting' | 'agents' | 'ai-in-org' | 'fine-tuning' | 'tools-landscape' | 'working-with-ai' | 'optimizing-workflow' | 'agentic-coding' | 'agentic-work'

export interface ModuleMeta {
  id: ModuleId
  label: string
  businessLabel?: string
  course: Course
  personas: Persona[]
}

export const MODULES: ModuleMeta[] = [
  { id: 'ai-problem', label: "What's an AI Problem?", course: 'understand', personas: ['technical', 'business'] },
  { id: 'data-foundations', label: 'Data Foundations', businessLabel: 'Why Data Quality Matters', course: 'understand', personas: ['technical', 'business'] },
  { id: 'tokens', label: 'Tokens & Tokenizers', course: 'understand', personas: ['technical'] },
  { id: 'transformer', label: 'The Transformer', course: 'understand', personas: ['technical'] },
  { id: 'training', label: 'Training From Scratch', course: 'understand', personas: ['technical'] },
  { id: 'llm-data', label: 'Data for LLM Training', course: 'understand', personas: ['technical'] },
  { id: 'alignment', label: 'Alignment & Safety', businessLabel: 'Trust & Safety', course: 'understand', personas: ['technical', 'business'] },
  { id: 'architecture', label: 'Architecture Decisions', course: 'understand', personas: ['technical'] },
  { id: 'solution', label: 'From Problem to Solution', course: 'understand', personas: ['technical', 'business'] },
  { id: 'evaluation', label: 'Evaluation & Benchmarks', businessLabel: 'How to Know If It Works', course: 'understand', personas: ['technical', 'business'] },
  { id: 'quantization', label: 'Quantization & Formats', course: 'understand', personas: ['technical'] },
  { id: 'inference', label: 'Inference & Deployment', course: 'understand', personas: ['technical'] },
  { id: 'industry', label: 'The Industry Map', businessLabel: 'Who Makes What', course: 'understand', personas: ['technical', 'business'] },
  { id: 'embeddings', label: 'Embeddings & Vector Search', businessLabel: 'Search & Knowledge Retrieval', course: 'understand', personas: ['technical', 'business'] },
  { id: 'prompting', label: 'Prompt Engineering', businessLabel: 'How to Talk to AI', course: 'understand', personas: ['technical', 'business'] },
  { id: 'agents', label: 'Agents & Tool Use', businessLabel: 'AI Assistants That Take Action', course: 'understand', personas: ['technical', 'business'] },
  { id: 'ai-in-org', label: 'AI in Your Organization', course: 'understand', personas: ['business'] },
  { id: 'fine-tuning', label: 'Fine-Tuning Hands-On', course: 'understand', personas: ['technical'] },
  { id: 'tools-landscape', label: 'AI Tools Landscape', course: 'use', personas: ['technical', 'business'] },
  { id: 'working-with-ai', label: 'Working With AI', course: 'use', personas: ['technical', 'business'] },
  { id: 'optimizing-workflow', label: 'Optimizing Your Workflow', course: 'use', personas: ['technical', 'business'] },
  { id: 'agentic-coding', label: 'Agentic Coding', course: 'use', personas: ['technical'] },
  { id: 'agentic-work', label: 'Agentic Work', course: 'use', personas: ['business'] },
]
