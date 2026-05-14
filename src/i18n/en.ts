/**
 * Canonical English translation tree — the single source of truth for
 * every user-facing string in the application.
 *
 * Architecture spec: docs/i18n-refactor/PLAN.md
 *
 * This is Checkpoint 1 of the i18n consolidation refactor. The cross-cutting
 * sections (ui, labels, moduleLabels) have been migrated from the old
 * src/ui-labels.ts and src/labels.ts. The per-module sections under
 * `modules.*`, plus `quiz` and `selfExplain`, are populated incrementally
 * in subsequent sessions; until then they remain empty and components
 * continue to use the legacy `useT(EN, {sv, ko})` / `tArray` / `translateQuestions`
 * / `translateSelfExplain` APIs which are still re-exported from this barrel.
 *
 * Adding content rules:
 *   - Preserve existing English wording verbatim from component .tsx files.
 *   - Group module entries by section file's `*Sv` / `*Ko` export name,
 *     lowercased (e.g. `toolUseSv` -> key `toolUse`).
 *   - Use `as const` so the inferred `Translation` type is precise.
 */

const ui = {
  appTitle: 'LLM Academy',
  track: {
    business: 'Business Track',
    technical: 'Technical Track',
  },
  review: {
    title: 'Spaced Review',
    empty: 'Complete a module\'s "Check Your Understanding" to start building your review schedule.',
    start: 'Start Review',
    allCaughtUp: 'All caught up! No questions due right now.',
    complete: 'Review Complete',
    iRemembered: 'I remembered',
    needReview: 'Need to review',
  },
  check: {
    title: 'Check Your Understanding',
    next: 'Next →',
    summary: 'See Summary',
    reviewSummary: 'Review Summary',
    showModel: 'Show model answer',
    yourAnswer: 'Your answer',
    modelAnswer: 'Model answer',
  },
  explain: {
    title: 'Explain It',
    placeholder: 'Type your explanation…',
    compare: 'Compare with model answer',
  },
  nav: {
    previous: 'Previous',
    next: 'Next',
  },
} as const

const labels = {
  // Common UI
  yes: 'Yes',
  no: 'No',
  pros: 'Pros',
  cons: 'Cons',
  tools: 'Tools',
  whenToUse: 'When to use',
  examples: 'Examples: ',
  clickToReveal: 'Click to reveal →',
  startOver: 'Start Over',
  upNext: 'Up next: ',
  dataRemaining: 'Data remaining',
  implementation: 'Implementation:',
  mitigation: 'Mitigation:',
  instruction: 'Instruction: ',
  response: 'Response: ',
  scoring: 'Scoring',
  cosineSimilarity: 'Cosine similarity:',

  // Table headers
  dimension: 'Dimension',
  traditionalMl: 'Traditional ML',
  llms: 'LLMs',
  framework: 'Framework',
  complexity: 'Complexity',
  flexibility: 'Flexibility',
  learningCurve: 'Learning Curve',
  bestFor: 'Best For',
  aspect: 'Aspect',
  functionCalling: 'Function Calling',
  topScores: 'Top Scores (2026)',
  budget: 'Budget: ',
  fineTune: 'Fine-tune: ',

  // Section headings
  keyTrends: 'Key Trends',
  techniques: 'Techniques',
  realWorldModels: 'Real-World Models',
  tradeoffComparison: 'Tradeoff Comparison',
  chunkSizeImpact: 'Chunk Size Impact',
  bestPractices: 'Best Practices',
  embeddingPipeline: 'Embedding Pipeline',
  fullRagPipeline: 'Full RAG Pipeline',
  typesOfEvaluation: 'Types of Evaluation',
  costCalculator: 'Cost Calculator',
  gpuPricingReference: 'GPU Pricing Reference',
  theKvCache: 'The KV Cache',
  inferencePipeline: 'Inference Pipeline',
  trainingDataRatio: 'Training Data Ratio',
  estimatedCapabilities: 'Estimated Capabilities',
  whenRagBeatsFt: 'When RAG Beats Fine-tuning',
  howFunctionCalling: 'How Function Calling Works',
  scaleComparison: 'Scale comparison',
  garbageInOut: 'Garbage In, Garbage Out',
  industryReality: 'Industry reality check',
  sizePipeline: 'Size pipeline',
  whenLlmsOverkill: 'When LLMs Are Overkill',
  whenMlWins: 'When Classical ML Wins',
  sameProblem: 'Same Problem, Two Approaches: Sentiment Analysis',
  lessEffort: '← Less effort, less control',
  moreEffort: 'More effort, more control →',

  // Diagram labels
  yourApp: 'Your App',
  mcpServer: 'MCP Server',
  denseFfn: 'Dense FFN',
  mixtureOfExperts: 'Mixture of Experts',
  graphRag: 'GraphRAG',
  agenticRag: 'Agentic RAG',
  qloraOnBudget: 'QLoRA — LoRA on a budget',
  llmGenerative: 'LLM (Generative)',
  embeddingModel: 'Embedding Model',
  inputToVector: 'Input → Fixed-size vector',
  bm25Keyword: 'BM25 Keyword (30%)',
  goodMlDataset: 'Good ML dataset',
  llmPretraining: 'LLM pre-training dataset',
  vector70: 'Vector 70%',
  bm2530: 'BM25 30%',
  modelSizeAxis: 'Model Size (GB) — 7B model',
  qualityAxis: 'Quality (%)',
  afterTraining: 'After training — structured patterns',
  beforeTraining: 'Before training — random noise',
  tokenizerCallout:
    'Why this matters: The tokenizer determines how efficiently your model "sees" text. A compression rate of 3.94 bytes/token means every token carries ~4 characters of information. Better compression = shorter sequences = faster training = lower cost. nanochat\'s 32K vocab is deliberately small to keep the embedding table manageable for models you can train on a single GPU node.',
  trainingKeyInsight:
    'Key insight: Random weights = the model knows nothing. Ask it anything and you get gibberish. In nanochat, the --depth flag is the single dial that controls model size — all other hyperparameters (width, heads, learning rate, training horizon) are calculated automatically to be compute-optimal.',
  a2aIntro:
    'MCP connects agents to tools. A2A connects agents to other agents. Launched by Google in April 2025 and donated to the Linux Foundation, A2A defines how opaque agents discover each other, negotiate capabilities, exchange tasks, and stream results — regardless of framework or vendor.',
  agentDef:
    'An agent is an LLM that can take actions — call APIs, query databases, run code — then use the results to keep reasoning. It closes the loop between thinking and doing.',
  fcKeyTakeaway:
    'Key takeaway: The model is a decision-maker, not an executor. It picks the right tool and arguments. Your application code runs the function, handles errors, and sends results back. This keeps the model sandboxed and your system in control.',
  sweetSpot: 'sweet spot',
  kvCache: 'KV Cache',
  tokWhyIntro:
    'Neural networks do math — they multiply matrices, add vectors, compute gradients. They can\'t read the letter "A" any more than your calculator can. So before any text reaches a model, it gets chopped into tokens — small pieces that each map to a number. The question is: how do you chop?',
  tokBpeIntro:
    'Byte Pair Encoding starts with individual characters and repeatedly merges the most frequent adjacent pair. After enough merges, common words become single tokens while rare words stay split into recognizable pieces.',
  tokEconIntro:
    'When you call an LLM API, you pay per token — both for input and output. Different kinds of text tokenize very differently, so the same "amount" of content can cost wildly different amounts.',
  tokVocabIntro:
    'A tokenizer\'s vocabulary is just a big lookup table: token string → integer ID. Modern LLMs typically have 32K–128K tokens. The vocabulary lives in a JSON file alongside the model weights. Click around to explore:',
  tokSpecialIntro:
    'Beyond regular text tokens, every tokenizer defines a handful of special tokens that control the model\'s behavior. These never appear in normal text — they\'re injected by the tokenizer automatically.',
  tokTrainIntro:
    'In Karpathy\'s nanochat — a minimal end-to-end LLM training harness — the tokenizer is the very first thing you build. Two scripts handle the entire lifecycle:',

  // Agent trace
  traceUser: 'User',
  traceThought: 'Thought',
  traceAction: 'Action',
  traceObservation: 'Observation',
  traceAnswer: 'Answer',

  // Attention variants
  mhaDesc: 'Each attention head has its own K and V projections. Maximum expressiveness but largest KV cache.',
  gqaDesc: 'Query heads are grouped, sharing K/V projections within each group. Best quality-speed tradeoff.',
  mqaDesc: 'All query heads share a single K/V pair. Fastest inference but some quality loss.',
  mlaDesc: 'Compresses KV into a low-rank latent space. Tiny cache with quality close to full MHA.',

  // Scaling laws
  noteSmallResearch: 'Small research experiment',
  noteGpt2Small: 'GPT-2 Small scale',
  noteMidResearch: 'Mid-size research',
  noteGpt2Xl: 'GPT-2 XL scale',
  noteChinchilla4b: 'Chinchilla-optimal 4B',
  noteLlama13b: 'Llama 2 13B scale',
  noteChinchilla70b: 'Chinchilla 70B territory',
  noteFrontier: 'Frontier dense models',

  // Chunking
  chunkFixed: 'Split every N tokens regardless of content boundaries',
  chunkSemantic: 'Split on natural boundaries: paragraphs and sections',
  chunkRecursive: 'Try headers first, then paragraphs, then sentences',

  // RAG pipeline
  ragDocument: 'Raw source data',
  ragChunk: 'Split into pieces',
  ragEmbed: 'Convert to vectors',
  ragStore: 'Vector database',
  ragQuery: 'Embed user query',
  ragRetrieve: 'Find similar chunks',
  ragGenerate: 'LLM generates answer',

  // Embedding categories
  catAnimals: 'Animals',
  catColors: 'Colors',
  catEmotions: 'Emotions',
  catVehicles: 'Vehicles',

  // Inference pipeline
  promptTokens: 'Prompt Tokens',
  prefill: 'Prefill',
  decode: 'Decode',
  promptTokensDesc: 'User input tokenized into IDs',
  prefillDesc: 'Process all tokens at once — build initial KV cache',
  decodeDesc: 'Generate one token at a time (autoregressive)',
  kvWhyExists: 'Avoids recomputing attention keys/values for all previous tokens at each decode step',
  kvHowGrows: 'Proportional to sequence_length × num_layers × num_heads × head_dim × 2 (K+V)',

  // System prompt builder
  spGoal: 'Goal',
  spContext: 'Context',
  spFormat: 'Format',
  spTone: 'Tone',
  spConstraints: 'Constraints',

  // Token economics
  tokEnglishProse: 'English prose',
  tokPythonCode: 'Python code',
  tokJsonData: 'JSON data',
  tokChineseText: 'Chinese text',
  tokNoteCommon: 'Common words → fewer tokens',
  tokNoteIndent: 'Indentation & syntax add tokens',
  tokNotePunct: 'Punctuation-heavy → more tokens',
  tokNoteChinese: 'Each character often = 2-3 tokens',

  // Training
  trainEmpty: 'Empty — about to clone nanochat',
  trainDepsInstalled: 'Dependencies installed',
  trainUntrained: 'Untrained model = gibberish',
  trainLoadBatch: 'Load Batch',
  trainForwardPass: 'Forward Pass',
  trainComputeLoss: 'Compute Loss',
  trainBackwardPass: 'Backward Pass',
  trainUpdateWeights: 'Update Weights',

  // Leaderboard
  dataContamination: 'Data Contamination',
  benchmarkGaming: 'Benchmark Gaming',
  narrowMeasurement: 'Narrow Measurement',
  saturation: 'Saturation',

  // Fine-tuning workspace
  ftProjectSetup: 'Project setup',
  ftBaseLoaded: 'Base model loaded in 4-bit',
  ftLoraConfigured: 'LoRA adapter configured',
  ftTrainingComplete: 'Training complete',
  ftAdapterSaved: 'Adapter saved',
  ftStartingAdapter: 'Starting with trained adapter',
  ftEvalComplete: 'Evaluation complete',
  ftMergedModel: 'Merged model (standalone)',
  ftQuantizedGguf: 'Quantized GGUF',
  ftRunningOllama: 'Running locally via Ollama',

  // Conversion pipeline
  cpOriginal: 'Original SafeTensors model (14 GB)',
  cpGgufFp16: 'After GGUF conversion (FP16)',
  cpQuantized: 'After Q4_K_M quantization (4 GB)',
  cpModelfile: 'Modelfile for Ollama',
  cpRegistered: 'Registered in Ollama',

  // Cost calculator
  apiProvider: 'API Provider',
  selfHosted: 'Self-Hosted',
} as const

const moduleLabels = {
  'ai-problem': {
    label: "What's an AI Problem?",
    subtitle: 'Not every problem needs an LLM — or even ML. Learn to classify problems and pick the right tool.',
    businessSubtitle: "Not everything needs AI. Learn when it helps, when it doesn't, and how to tell the difference.",
  },
  'data-foundations': {
    label: 'Data Foundations',
    businessLabel: 'Why Data Quality Matters',
    subtitle: 'How data is shaped, moved, stored, and why quality matters more than quantity.',
    businessSubtitle: 'Your AI is only as good as the data you feed it.',
  },
  tokens: {
    label: 'Tokens & Tokenizers',
    subtitle: 'How text becomes numbers — and why the way you split matters.',
  },
  transformer: {
    label: 'The Transformer',
    subtitle: 'The architecture behind every modern LLM — attention, layers, and how it all fits together.',
  },
  training: {
    label: 'Training From Scratch',
    subtitle: 'How billions of random numbers become a language model.',
  },
  'llm-data': {
    label: 'Data for LLM Training',
    subtitle: 'Where training data comes from, how it gets cleaned, and why the mix matters.',
  },
  alignment: {
    label: 'Alignment & Safety',
    businessLabel: 'Trust & Safety',
    subtitle: 'How models go from raw text predictors to helpful, harmless, and honest assistants.',
    businessSubtitle: 'Why AI sometimes goes wrong, and how to put guardrails in place.',
  },
  architecture: {
    label: 'Architecture Decisions',
    subtitle: 'Dense vs MoE, scaling laws, attention variants, and how to choose.',
  },
  solution: {
    label: 'From Problem to Solution',
    subtitle: 'Prompting, RAG, fine-tuning, build vs buy, and real-world cost analysis.',
    businessSubtitle: 'Four ways to use AI, from simple to complex — and how to decide between renting and buying.',
  },
  evaluation: {
    label: 'Evaluation & Benchmarks',
    businessLabel: 'How to Know If It Works',
    subtitle: 'Standardized benchmarks, custom evaluation, and why leaderboards can be misleading.',
    businessSubtitle: 'Measuring AI performance and choosing the right model.',
  },
  quantization: {
    label: 'Quantization & Formats',
    subtitle: 'Making models smaller and faster without losing quality.',
  },
  inference: {
    label: 'Inference & Deployment',
    subtitle: 'How models generate text, serving frameworks, and optimization.',
  },
  industry: {
    label: 'The Industry Map',
    businessLabel: 'Who Makes What',
    subtitle: "Who builds LLMs, open vs closed, the ecosystem, and where it's heading.",
    businessSubtitle: 'The key AI companies, what they offer, and what it means for your business.',
  },
  embeddings: {
    label: 'Embeddings & Vector Search',
    businessLabel: 'Search & Knowledge Retrieval',
    subtitle: 'How text becomes numbers, semantic search, chunking, and the RAG pipeline.',
    businessSubtitle: 'How AI-powered search understands meaning, and how to give AI access to your knowledge.',
  },
  prompting: {
    label: 'Prompt Engineering',
    businessLabel: 'How to Talk to AI',
    subtitle: 'From zero-shot to multi-step reasoning — techniques for reliable LLM outputs.',
    businessSubtitle: 'Getting great results from AI is about asking the right way.',
  },
  agents: {
    label: 'Agents & Tool Use',
    businessLabel: 'AI Assistants That Take Action',
    subtitle: 'How LLMs call tools, the protocols that connect them, and patterns for reliable agents.',
    businessSubtitle: 'From chatbots to AI assistants that actually get things done.',
  },
  'ai-in-org': {
    label: 'AI in Your Organization',
    subtitle: 'How autonomy changes roles, decisions, and risk.',
    businessSubtitle: 'The technology works. The harder question: is your organization ready?',
  },
  'fine-tuning': {
    label: 'Fine-Tuning Hands-On',
    subtitle: 'From deciding whether to fine-tune, through data prep, to a complete LoRA training run.',
  },
} as const

/**
 * Per-module translation tree. Populated incrementally — see
 * docs/i18n-refactor/PROGRESS.md for the migration checklist.
 *
 * Keys mirror the moduleLabels keys (kebab-case module ids), section
 * sub-keys are camelCased from the legacy `*Sv`/`*Ko` export names.
 */
const modules = {} as const

/**
 * Quiz Q&A keyed by question ID (e.g. 'aiproblem-biz-1').
 * Populated incrementally; until then components keep using the legacy
 * `translateQuestions(questions, lang)` helper.
 */
const quiz = {} as const

/**
 * SelfExplain prompts/answers keyed by the first 50 chars of the English
 * prompt (matches the legacy `translateSelfExplain` lookup).
 * Populated incrementally; until then components keep using the legacy
 * helper.
 */
const selfExplain = {} as const

export const en = {
  ui,
  labels,
  moduleLabels,
  modules,
  quiz,
  selfExplain,
} as const

export type Translation = typeof en
