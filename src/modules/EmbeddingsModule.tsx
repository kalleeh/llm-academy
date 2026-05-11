import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { WhatAreEmbeddingsSection } from './embeddings/WhatAreEmbeddingsSection'
import { EmbeddingModelsSection } from './embeddings/EmbeddingModelsSection'
import { VectorDatabasesSection } from './embeddings/VectorDatabasesSection'
import { ChunkingStrategiesSection } from './embeddings/ChunkingStrategiesSection'
import { RAGPipelineSection } from './embeddings/RAGPipelineSection'
import { SmartSearchBusiness } from './embeddings/SmartSearchBusiness'
import { RAGBusiness } from './embeddings/RAGBusiness'
import { WaysToFeedAIBusiness } from './embeddings/WaysToFeedAIBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const QUESTIONS: Question[] = [
  {
    id: 'embeddings-1',
    type: 'free',
    question: 'Explain what an embedding vector actually represents. Why can we use cosine similarity between two vectors to determine if two sentences have similar meaning?',
    modelAnswer: 'An embedding vector is a dense numerical representation where each dimension captures some learned semantic feature. During training, the model learns to place semantically similar texts close together in this high-dimensional space. Cosine similarity works because it measures the angle between vectors — texts with similar meaning get mapped to similar directions regardless of vector magnitude, so a small angle (high cosine) indicates semantic similarity.',
    explanation: 'Embeddings encode meaning as geometry. The training process ensures that semantic relationships are preserved as spatial relationships, making vector math a proxy for meaning comparison.',
  },
  {
    id: 'embeddings-2',
    type: 'mc',
    question: 'You\'re building a RAG system for legal contracts. Documents are 50+ pages long with dense cross-references between clauses. Which chunking strategy would likely perform best?',
    options: [
      'Fixed-size chunks of 512 tokens with no overlap',
      'Sentence-level splitting for maximum granularity',
      'Semantic chunking with overlap, preserving clause boundaries and adding parent-document context',
      'One embedding per entire document',
    ],
    correctIndex: 2,
    explanation: 'Legal documents have meaningful structural units (clauses, sections) that should be preserved. Semantic chunking respects these boundaries, overlap captures cross-references, and parent-document context helps the retriever understand where a clause fits. Fixed-size chunks would split mid-clause, sentence-level loses context, and whole-document embeddings dilute specific clause information.',
  },
  {
    id: 'embeddings-3',
    type: 'mc',
    question: 'Why do vector databases use approximate nearest neighbor (ANN) algorithms like HNSW instead of exact search?',
    options: [
      'ANN algorithms always return better results than exact search',
      'Exact search is O(n) per query — at millions of vectors, ANN trades a tiny accuracy loss for orders-of-magnitude speed improvement',
      'Vector databases cannot store enough data for exact search',
      'ANN algorithms use less storage space',
    ],
    correctIndex: 1,
    explanation: 'Exact nearest neighbor search requires comparing the query against every vector (O(n)), which becomes impractical at scale. ANN algorithms like HNSW build graph structures that enable sub-linear search time, typically finding 95-99% of true nearest neighbors while being 100-1000× faster.',
  },
  {
    id: 'embeddings-4',
    type: 'free',
    question: 'Walk through the complete RAG pipeline from a user asking a question to receiving an answer. What happens at each stage, and where can things go wrong?',
    modelAnswer: 'The pipeline: (1) Query embedding — user question is converted to a vector. Can fail if the question uses different vocabulary than the documents. (2) Retrieval — vector DB finds top-k similar chunks via ANN search. Can fail if chunks are poorly sized, embeddings are low quality, or k is too small. (3) Reranking (optional) — a cross-encoder rescores retrieved chunks for relevance. Helps but adds latency. (4) Context assembly — retrieved chunks are formatted into the LLM prompt with the original question. Can fail if too many chunks exceed context window or irrelevant chunks dilute signal. (5) Generation — LLM produces an answer grounded in the retrieved context. Can fail via hallucination if the model ignores context or context doesn\'t contain the answer.',
    explanation: 'RAG is a multi-stage pipeline where each stage can introduce errors that compound downstream. Understanding failure modes at each stage is key to building reliable systems.',
  },
  {
    id: 'embeddings-5',
    type: 'mc',
    question: 'A RAG system retrieves relevant chunks but the LLM still generates incorrect answers. Which intervention is most likely to help?',
    options: [
      'Increase the embedding model dimensions',
      'Add more documents to the vector database',
      'Improve the prompt to instruct the model to only answer from provided context, and add a "not found" fallback',
      'Switch to a larger chunk size',
    ],
    correctIndex: 2,
    explanation: 'If retrieval is working (relevant chunks found) but generation is wrong, the problem is in the generation stage. A better prompt that constrains the model to answer only from provided context and explicitly handle missing information addresses the hallucination problem directly.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  { id: 'emb-biz-1', type: 'mc', question: 'An employee searches your knowledge base for "vacation policy" but the document is titled "PTO Allowance Guidelines." Regular search finds nothing. What would AI-powered search do?', options: ['Also find nothing — different words', 'Find the document because it understands "vacation" and "PTO" mean the same thing', 'Only work if you add "PTO" as a keyword tag', 'Require the employee to search again with different words'], correctIndex: 1, explanation: 'AI-powered search understands meaning, not just keywords. It knows "vacation," "PTO," and "time off" are related concepts and finds relevant documents regardless of exact wording.' },
  { id: 'emb-biz-2', type: 'mc', question: 'Your AI chatbot needs to answer questions about company policies that change monthly. What\'s the best approach?', options: ['Retrain the AI every month', 'Use RAG — the AI searches your current documents before answering, so it\'s always up-to-date', 'Just tell the AI to say "I don\'t know" to policy questions', 'Print the policies and scan them'], correctIndex: 1, explanation: 'RAG (the open-book exam approach) is perfect for changing information. You update the documents, and the AI automatically uses the latest versions — no retraining needed.' },
  { id: 'emb-biz-3', type: 'mc', question: 'You upload a PDF to ChatGPT and ask questions about it. Is this RAG?', options: ['Yes — any time AI reads a document, that\'s RAG', 'No — the file is put directly into the conversation context, not indexed and searched. It\'s more like handing someone a printout.', 'Only if the PDF is longer than 10 pages', 'It depends on which AI model you use'], correctIndex: 1, explanation: 'Uploading a file to a chat puts it directly into the conversation context — the AI reads the whole thing (or tries to). RAG is different: documents are indexed, chunked, and searched so the AI only retrieves the relevant parts. Knowledge base features (like ChatGPT Projects or Amazon Quick) are actual RAG.' },
]

export const EmbeddingsModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="embeddings" title="Search &amp; Knowledge Retrieval" subtitle="How AI-powered search understands meaning (not just keywords), and how to give AI access to your company&apos;s knowledge.">
        <SmartSearchBusiness />
        <RAGBusiness />
        <WaysToFeedAIBusiness />
        <KnowledgeCheck moduleId="embeddings-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="embeddings" title="Embeddings &amp; Vector Search" subtitle="How text becomes numbers, the models and databases that power semantic search, chunking strategies that make or break retrieval, and the full RAG pipeline from document to answer.">
      <WhatAreEmbeddingsSection />
      <EmbeddingModelsSection />
      <VectorDatabasesSection />
      <ChunkingStrategiesSection />
      <RAGPipelineSection />
      <KnowledgeCheck moduleId="embeddings" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
