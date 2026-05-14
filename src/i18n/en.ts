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
const modules = {
  aiproblem: {
    // Business: 1. The AI Family Tree
    landscape: {
      title: '1. The AI Family Tree',
      intro:
        '"AI" is a big umbrella. Not everything under it is the same. Think of it like this: all LLMs are AI, but not all AI is an LLM — just like all golden retrievers are dogs, but not all dogs are golden retrievers. Click each layer to learn more.',
      levels: [
        {
          label: 'Artificial Intelligence',
          plain: 'Any smart automation',
          analogy:
            'A catch-all term for software that does things we used to think only humans could do — recognizing faces, understanding speech, making decisions.',
          examples: [
            'Spam filters in your email',
            'Auto-complete when you type',
            'Fraud detection on your credit card',
          ],
        },
        {
          label: 'Machine Learning',
          plain: 'Learning from examples',
          analogy:
            'Instead of programming every rule by hand, you show the system thousands of examples and it figures out the patterns — like training a new hire by having them study past cases instead of reading a 500-page manual.',
          examples: [
            'Netflix recommendations ("people like you also watched…")',
            'Email sorting into Primary/Social/Promotions',
            'Predicting which customers might cancel',
          ],
        },
        {
          label: 'Deep Learning',
          plain: 'Pattern recognition on steroids',
          analogy:
            'A more powerful version of machine learning that can handle messy, complex data like photos, audio, and text — things that are easy for humans but were impossible for traditional software.',
          examples: [
            'Face recognition to unlock your phone',
            'Voice assistants understanding what you say',
            'Translating between languages in real time',
          ],
        },
        {
          label: 'Large Language Models',
          plain: 'AI that understands and generates language',
          analogy:
            'The AI behind ChatGPT, Copilot, and Gemini. Trained by reading billions of web pages, it learned to write, reason, summarize, translate, and have conversations — like an incredibly well-read colleague who can discuss almost any topic.',
          examples: [
            'ChatGPT, Claude, Gemini, Copilot',
            'Drafting emails, summarizing documents',
            'Answering questions about your company data',
          ],
        },
      ],
      examplesLabel: 'Examples you already use:',
    },
    // Business: 2. Should You Use AI for This?
    decision: {
      title: '2. Should You Use AI for This?',
      intro:
        'Not every problem needs AI. Sometimes a spreadsheet, a checklist, or a simple rule is better. The key question is: are there clear rules, or does it require judgment?',
      introSub:
        "Think of it this way: if you can write the complete instructions on a single page, you probably don't need AI. If it takes years of experience to do well, AI might help.",
      scenarios: [
        {
          task: 'Calculate employee bonuses based on a fixed formula',
          answer: 'No AI needed',
          why: 'The rules are fixed and exact — like following a recipe step by step. A spreadsheet formula does this perfectly. AI would add complexity and might even get the numbers wrong.',
        },
        {
          task: 'Predict which customers are likely to cancel next quarter',
          answer: 'Machine Learning',
          why: "There's historical data (past cancellations) and patterns to find (usage dropping, fewer logins). ML learns these patterns from examples — like a sales rep who develops a gut feeling for at-risk accounts, but backed by data.",
        },
        {
          task: 'Answer employee questions about company policies',
          answer: 'LLM + your documents',
          why: 'Employees ask questions in natural language ("can I carry over vacation days?"). An LLM can understand the question, search your policy docs, and give a clear answer — like having an always-available HR assistant.',
        },
        {
          task: 'Summarize a 50-page contract and flag key risks',
          answer: 'LLM',
          why: 'This requires reading, understanding context, and making judgments about what matters — exactly what LLMs are good at. Like asking a junior lawyer to do a first pass, but in 30 seconds.',
        },
      ],
      bestFitLabel: 'Best fit:',
      selfExplainPrompt:
        'Think of a task at your job that takes a lot of time. Would AI help? Is it rule-based (spreadsheet), pattern-based (ML), or language-based (LLM)?',
      selfExplainAnswer:
        "Example: 'I spend 2 hours every Monday categorizing support tickets by priority.' This is pattern-based — there's historical data on how tickets were categorized, and the task requires reading the ticket text and making a judgment call. An LLM could read each ticket and categorize it based on past patterns, saving most of that time.",
    },
    // Tech: 1. The Landscape
    landscapeSection: {
      title: '1. The Landscape',
      intro:
        'AI is a broad field. Machine Learning is a subset, Deep Learning is a subset of that, and LLMs are a specific kind of deep learning. Click each layer to explore.',
      levels: [
        {
          label: 'Artificial Intelligence',
          definition:
            'Any system that performs tasks normally requiring human intelligence — reasoning, planning, perception, or decision-making.',
          examples: [
            'Rule-based systems (if/else logic for tax calculations)',
            'Expert systems (medical diagnosis from symptom rules)',
            'Search algorithms (A*, minimax for chess/pathfinding)',
            'Robotic process automation (RPA for form filling)',
          ],
        },
        {
          label: 'Machine Learning',
          definition:
            'Systems that learn patterns from data instead of being explicitly programmed. They improve with more data.',
          examples: [
            'Regression (predicting house prices from features)',
            'Classification (spam vs. not spam)',
            'Clustering (customer segmentation)',
            'Recommendation engines (Netflix, Spotify)',
          ],
        },
        {
          label: 'Deep Learning',
          definition:
            'ML using neural networks with many layers. Excels at learning from raw, unstructured data like images, audio, and text.',
          examples: [
            'CNNs — image classification, object detection',
            'RNNs/LSTMs — time-series, sequence modeling',
            'Transformers — the architecture behind modern LLMs',
            'GANs — image generation, style transfer',
          ],
        },
        {
          label: 'Large Language Models',
          definition:
            'Massive transformer models trained on internet-scale text. They predict the next token and emerge with reasoning, coding, and conversation abilities.',
          examples: [
            'GPT-4, Claude, Gemini — general-purpose reasoning',
            'Llama, Mistral — open-weight models',
            'Text generation, summarization, translation',
            'Code generation, analysis, debugging',
          ],
        },
      ],
      overlays: [
        {
          label: 'Generative AI',
          description:
            'Models that create new content (text, images, audio, code). Spans Deep Learning and LLMs.',
        },
        {
          label: 'Agentic AI',
          description:
            'LLMs augmented with tools, memory, and planning — they take actions, not just generate text.',
        },
      ],
    },
    // Tech: 2. Problem Classification
    classificationSection: {
      title: '2. Problem Classification',
      p2: 'Not every problem needs an LLM. Click each card to reveal the best approach — and more importantly,',
      scenarios: [
        { problem: 'Calculate shipping costs based on weight and distance', approach: 'Rule-based / traditional software', why: 'The logic is deterministic — fixed formulas with known inputs. No learning needed, just math.' },
        { problem: 'Detect fraudulent credit card transactions', approach: 'Classical ML (XGBoost, random forest)', why: 'Structured tabular data (amount, location, time) with labeled fraud/not-fraud examples. Tree-based models excel here with fast inference.' },
        { problem: 'Predict customer churn next quarter', approach: 'Classical ML (logistic regression, gradient boosting)', why: 'Tabular customer features (tenure, usage, support tickets) predict a binary outcome. Interpretability matters for business decisions.' },
        { problem: 'Classify product images by category', approach: 'Deep Learning (CNN / vision model)', why: "Images are unstructured pixel data. CNNs learn spatial hierarchies (edges → shapes → objects) that hand-crafted features can't match." },
        { problem: 'Transcribe customer support calls', approach: 'Deep Learning (speech-to-text, Whisper)', why: 'Audio is raw waveform data. Deep learning models like Whisper learn to map acoustic patterns to text across accents and noise levels.' },
        { problem: 'Summarize legal contracts', approach: 'LLM', why: 'Requires understanding complex language, legal jargon, and generating coherent summaries. LLMs handle long-context text comprehension natively.' },
        { problem: 'Build a customer support chatbot', approach: 'LLM (+ RAG for company knowledge)', why: 'Needs natural conversation, intent understanding, and access to company-specific docs. RAG grounds the LLM in your actual knowledge base.' },
        { problem: 'Generate code from requirements', approach: 'LLM', why: 'Requires understanding natural language specs and producing syntactically valid, logically correct code. LLMs are trained on billions of lines of code.' },
        { problem: 'Recommend products based on purchase history', approach: 'Classical ML (collaborative filtering)', why: 'Structured user-item interaction data. Collaborative filtering finds patterns like "users who bought X also bought Y" efficiently at scale.' },
        { problem: 'Detect anomalies in server metrics', approach: 'Classical ML (isolation forest, autoencoders)', why: 'Time-series numerical data with mostly normal patterns. Isolation forests efficiently isolate outliers without needing labeled anomaly examples.' },
      ],
    },
    // Tech: 3. The Decision Framework
    decisionFrameworkSection: {
      title: '3. The Decision Framework',
      intro: 'Walk through this decision tree to find the right approach for your problem.',
      tree: {
        start: { question: 'Is your problem well-defined with clear, deterministic rules?' },
        'rule-based': {
          answer: 'Rule-based system',
          explanation: "If the logic can be fully captured in formulas, lookup tables, or decision rules — you don't need ML at all. Traditional software is cheaper, faster, and 100% predictable.",
          example: 'Tax calculation, unit conversion, shipping cost formulas, form validation.',
        },
        structured: { question: 'Do you have structured/tabular data?' },
        prediction: { question: 'Do you need prediction or pattern recognition?' },
        'classical-ml': {
          answer: 'Classical ML',
          explanation: 'Structured data with rows and columns is the sweet spot for gradient boosting, random forests, and logistic regression. These models are fast, interpretable, and battle-tested.',
          example: 'Fraud detection, churn prediction, credit scoring, demand forecasting.',
        },
        'rule-based-2': {
          answer: 'Rule-based or simple analytics',
          explanation: 'If you have structured data but just need aggregation, filtering, or reporting — SQL and business logic are the right tool.',
          example: 'Dashboard metrics, inventory alerts, threshold-based notifications.',
        },
        media: { question: 'Does it involve images, audio, or video?' },
        'deep-learning': {
          answer: 'Deep Learning (CNN / speech models)',
          explanation: 'Unstructured media data requires neural networks that learn hierarchical features. CNNs for images, specialized architectures like Whisper for audio.',
          example: 'Image classification, object detection, speech-to-text, video analysis.',
        },
        text: { question: 'Does it involve understanding or generating natural language?' },
        llm: {
          answer: 'LLM',
          explanation: 'If the task requires reading, writing, reasoning about, or generating text — LLMs are purpose-built for this. Add RAG for domain knowledge, fine-tuning for specialized behavior.',
          example: 'Summarization, chatbots, code generation, document Q&A, translation.',
        },
        reassess: {
          answer: 'Reassess the problem',
          explanation: 'If none of the above fit, break the problem into smaller sub-problems. Most real-world systems combine multiple approaches — an LLM for text + classical ML for scoring + rules for validation.',
          example: 'E-commerce: rules for pricing + ML for recommendations + LLM for product descriptions.',
        },
      },
    },
    // Tech: 4. What Makes LLMs Different
    llmDifferenceSection: {
      title: '4. What Makes LLMs Different',
      intro: "LLMs aren't just \"bigger ML models.\" They represent a fundamentally different paradigm.",
      sameProblemHeading: 'Same Problem, Two Approaches: Sentiment Analysis',
      comparison: [
        { dimension: 'Training data', ml: 'Task-specific labeled datasets', llm: 'Massive unlabeled text (internet-scale)' },
        { dimension: 'Deployment', ml: 'One model per task', llm: 'One model, many tasks' },
        { dimension: 'Input format', ml: 'Structured features (numbers, categories)', llm: 'Natural language (free-form text)' },
        { dimension: 'Adaptation', ml: 'Retrain from scratch or transfer learn', llm: 'Prompt engineering or fine-tuning' },
        { dimension: 'Inference cost', ml: 'Cheap (milliseconds, minimal compute)', llm: 'Expensive (seconds, GPU-heavy)' },
        { dimension: 'Strengths', ml: 'Precision on narrow, well-defined tasks', llm: 'Flexibility across broad, open-ended tasks' },
      ],
      overkillCases: [
        { label: 'Simple classification', detail: 'Binary yes/no on structured data — logistic regression is faster and cheaper.' },
        { label: 'Structured data tasks', detail: 'Tabular data with clear features — tree-based models (XGBoost) dominate.' },
        { label: 'Latency-critical systems', detail: 'Real-time scoring at <10ms — LLM inference is too slow.' },
      ],
      mlBetterCases: [
        { label: 'Tabular data', detail: 'Rows and columns with numerical/categorical features — gradient boosting wins.' },
        { label: 'Real-time scoring', detail: 'Fraud detection, ad bidding — need sub-millisecond responses.' },
        { label: 'Interpretability required', detail: 'Regulated industries need to explain every decision (credit, healthcare).' },
      ],
    },
    // Tech: 5. The AI/ML/LLM Toolbox
    toolboxSection: {
      title: '5. The AI/ML/LLM Toolbox',
      intro: 'Each level of the AI landscape has its own ecosystem of tools and frameworks.',
      upNextNote:
        'The rest of this course dives deep into the LLM track — how they work under the hood, how to use them effectively, and how to build real applications with them.',
      toolbox: [
        { level: 'Rule-based', tools: ['if/else logic', 'regex', 'decision tables', 'state machines'] },
        { level: 'Classical ML', tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'statsmodels'] },
        { level: 'Deep Learning', tools: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'] },
        { level: 'LLMs', tools: ['Hugging Face', 'OpenAI API', 'Ollama', 'vLLM'] },
        { level: 'Agentic AI', tools: ['LangChain', 'CrewAI', 'AutoGen', 'LlamaIndex'] },
      ],
    },
  },
  industry: {
    // Business: 1. Who Makes AI?
    keyPlayers: {
      title: '1. Who Makes AI?',
      intro:
        'A handful of companies dominate the AI landscape. Think of it like the smartphone market — a few big players, each with a different strategy. Click each to learn more.',
      players: [
        { name: 'OpenAI', product: 'ChatGPT, GPT-4o', position: 'The one everyone knows — like the iPhone of AI. First to market, biggest brand recognition.', users: 'Millions of consumers and businesses. Microsoft is their biggest partner (Copilot runs on OpenAI).' },
        { name: 'Google', product: 'Gemini', position: 'Built into everything Google — Search, Gmail, Docs, Android. Massive distribution advantage.', users: 'Anyone using Google products. Enterprises on Google Cloud.' },
        { name: 'Anthropic', product: 'Claude', position: 'The "safety-first" company. Popular with enterprises who care about reliability and responsible AI.', users: 'Enterprises, developers, Amazon (major investor and partner via AWS).' },
        { name: 'Amazon / AWS', product: 'Bedrock, Nova, AgentCore', position: "Rather than building one model, AWS built the platform — Amazon Bedrock gives you access to 100+ models (Claude, Llama, Mistral, and Amazon's own Nova family) through a single API with enterprise security. AgentCore handles deploying AI agents at scale.", users: 'Enterprises already on AWS. Companies that want model choice without vendor lock-in to a single AI provider.' },
        { name: 'Meta', product: 'Llama (free)', position: 'Gives away their AI for free. Strategy: build the ecosystem, like Android vs iPhone. If everyone builds on Llama, Meta wins.', users: 'Developers and companies who want to run AI on their own servers.' },
        { name: 'Others', product: 'Mistral, DeepSeek, Cohere, etc.', position: 'Smaller players with specific strengths — some are cheaper, some are better for certain languages or tasks.', users: 'Companies looking for alternatives or specialized capabilities.' },
      ],
    },
    // Business: 2. Open vs Closed AI
    openVsClosed: {
      title: '2. Open vs Closed AI — What It Means for You',
      intro:
        'Some AI models are closed (you pay to use them) and some are open (free to download and run yourself). Think of it like Microsoft Office vs LibreOffice, or iPhone vs Android.',
      closedTitle: 'Closed models (GPT-4o, Claude, Gemini)',
      closedSubtitle: 'Like using Microsoft Office 365',
      openTitle: 'Open models (Llama, Mistral, DeepSeek)',
      openSubtitle: 'Like using Android or LibreOffice',
      realPictureTitle: 'The real picture: it is not black and white',
      realPictureText:
        'The open = private, closed = risky framing is outdated. Enterprise cloud AI services (Azure OpenAI, AWS Bedrock, Google Vertex) offer security certifications and compliance guarantees most companies cannot replicate themselves. Self-hosting gives you control, but control ≠ security — you need the team and expertise to actually secure it.',
      selfExplainPrompt:
        "Your CTO says 'we should use open-source AI to avoid vendor lock-in.' What are the trade-offs you'd want to discuss before making that decision?",
      selfExplainAnswer:
        "I'd raise these points: (1) We avoid vendor lock-in and per-use costs, but we take on maintenance responsibility — do we have the technical staff? (2) Data privacy is better since nothing leaves our servers, which matters for our regulated data. (3) Open models are slightly less capable for complex tasks — we should test with our actual use cases. (4) Setup takes weeks vs hours for an API. (5) A hybrid approach might work: use open models for high-volume, simple tasks (cost savings) and closed APIs for complex, low-volume tasks (best quality). (6) We should factor in the total cost: GPU hosting isn't free, even if the model is.",
    },
    // Tech: 1. Who Built What
    whoBuiltWhatSection: {
      title: '1. Who Built What',
      intro:
        'The LLM landscape is dominated by a handful of well-funded labs, each with a distinct philosophy. Click any card to see details.',
      players: [
        { name: 'OpenAI', approach: 'Closed-source, API-first, massive scale', innovation: 'Pioneered RLHF at scale; o3 reasoning via RL-trained chain-of-thought; GPT-5.5 leads coding (88.7% SWE-bench)', detail: 'Frontier lab. Defined the modern LLM era with ChatGPT. GPT-5.5 (released April 2026) sets new bars on coding and professional benchmarks. GPT-Rosalind specialised for drug discovery and genomics. o3 leads reasoning benchmarks.' },
        { name: 'Anthropic', approach: 'Safety-focused, Constitutional AI', innovation: 'Constitutional AI — alignment using AI feedback guided by explicit principles, reducing need for human labels on harmful outputs', detail: 'Founded by ex-OpenAI researchers. Leads on safety and agentic coding. Claude Opus 4.7 (released April 16, 2026) hits 87.6% on SWE-bench Verified at $5/$25 per MTok with a 1M token context window. Investors offered ~$800B valuation; running at ~$30B annualised revenue.' },
        { name: 'Google DeepMind', approach: 'Vertical integration — TPUs, data, distribution', innovation: 'Custom TPU hardware; 1M+ token context windows; Gemma open models', detail: 'Merged Google Brain + DeepMind. Gemini natively multimodal from training. Gemini 3.1 Pro adds smarter reasoning and better factual grounding. Owns the full stack: TPU chips, training infra, Search/Android/Cloud distribution.' },
        { name: 'Meta', approach: 'Open-source leader, MoE architecture', innovation: 'Largest open-weight models; Llama 4 uses MoE to match closed-model quality', detail: 'Llama 4 Maverick (400B total, 17B active via 128 experts) rivals GPT-4o on benchmarks. Open weights enable the entire ecosystem. Meta bets open-source wins long-term.' },
        { name: 'DeepSeek', approach: 'Efficiency-first, open-weight', innovation: 'MoE + Multi-head Latent Attention + FP8 training — V3 trained for ~$5.5M', detail: 'Chinese lab that shocked the industry. V3 (671B total, 37B active) trained on 14.8T tokens for a fraction of typical cost. R1 matches o1 on reasoning — R1-Zero proved pure RL can develop reasoning; the final R1 adds minimal cold-start SFT for readability.' },
        { name: 'Mistral', approach: 'European, open-weight, efficiency-focused', innovation: 'Sliding Window Attention; punches above weight class on efficiency', detail: 'Paris-based. Mistral 7B outperformed Llama 2 13B at launch. Mixtral popularized MoE for open models. Strong EU regulatory positioning.' },
        { name: 'Amazon / AWS', approach: 'Platform + own models — Bedrock hosts 100+ models from all providers', innovation: 'Bedrock model marketplace; AgentCore for enterprise agent deployment; Nova family optimized for Bedrock', detail: "AWS built the platform layer: Amazon Bedrock provides a single API to access Claude, Llama, Mistral, and Amazon's own Nova models. AgentCore handles agent runtime, memory, identity, and observability at scale. Nova models (Micro/Lite/Pro/Premier) are optimized for cost-performance on Bedrock, with Nova Premier supporting 1M token context and model distillation." },
        { name: 'xAI', approach: 'Real-time data via X/Twitter, massive compute', innovation: 'Trained on 200K GPU Colossus cluster (H100/H200); real-time information access', detail: "Elon Musk's AI company. Grok 3 trained on one of the largest GPU clusters ever built. Integrates live data from X platform. Open-sourced Grok 1 weights early on." },
        { name: 'Apple', approach: 'On-device, privacy-first', innovation: 'On-device models running on Apple Silicon; Private Cloud Compute', detail: 'Apple Foundation Models (AFM) run locally on iPhone/Mac. Private Cloud Compute extends to Apple servers with cryptographic privacy guarantees. Focus on practical, integrated AI.' },
      ],
    },
    // Tech: 2. Open vs Closed
    openVsClosedSection: {
      title: '2. Open vs Closed',
      intro: 'The gap between open-weight and closed-source models has narrowed dramatically.',
      trendCallout: 'Open models now match or exceed closed models on most standard benchmarks. The remaining gap is in agentic capabilities, long-context reliability, and safety tooling — and it\'s shrinking fast.',
      openModelsHeading: 'Open models that compete with frontier closed models (as of mid-2026):',
      comparison: [
        { dimension: 'Access', open: 'Download weights, run anywhere', closed: 'API-only, vendor lock-in' },
        { dimension: 'Fine-tuning', open: 'Full control — LoRA, full FT, merging', closed: 'Limited API fine-tuning or none' },
        { dimension: 'Cost', open: 'Infra cost only; free weights', closed: 'Per-token API pricing' },
        { dimension: 'Privacy', open: 'Full control over data — but security is your responsibility', closed: 'Data processed by provider — enterprise tiers offer strong compliance (SOC 2, HIPAA)' },
        { dimension: 'Community', open: 'Huge ecosystem — HF, Reddit, Discord', closed: 'Vendor docs and support' },
        { dimension: 'Cutting-edge', open: 'Closing fast — DeepSeek R1 ≈ o1', closed: 'Still leads on hardest benchmarks' },
        { dimension: 'Safety tooling', open: 'DIY guardrails, community tools', closed: 'Built-in moderation, content filters' },
        { dimension: 'Deployment', open: 'Self-host, edge, on-device', closed: 'Cloud-only via provider' },
      ],
      openModels: [
        { name: 'Llama 4 Maverick', org: 'Meta', params: '400B (17B active)', note: 'MoE, 128 experts, rivals GPT-4o' },
        { name: 'DeepSeek R1', org: 'DeepSeek', params: '671B (37B active)', note: 'Matches o1 on reasoning benchmarks' },
        { name: 'Qwen 2.5 72B', org: 'Alibaba', params: '72B', note: 'Strong multilingual, code, math' },
        { name: 'Mistral Large 2', org: 'Mistral', params: '123B', note: 'Competitive with GPT-4 Turbo' },
        { name: 'Gemma 3 27B', org: 'Google', params: '27B', note: 'Best-in-class at size, open weights' },
      ],
    },
    // Tech: 3. The Ecosystem
    ecosystemSection: {
      title: '3. The Ecosystem',
      intro: "LLMs don't exist in isolation. A full stack connects foundation models to end users.",
      keyInsight: 'You rarely build from scratch. Most teams pick a foundation model, optionally fine-tune it, serve it with an existing framework, and wire it into their app with an orchestration layer. The ecosystem makes this possible without training a single weight.',
      layers: [
        { name: 'Foundation Models', tools: [ { name: 'GPT-5.5 / Claude Opus 4.7', note: 'Frontier closed models via API' }, { name: 'Llama 4 / DeepSeek V3', note: 'Open-weight models you can self-host' }, { name: 'Gemma 3 / Qwen 2.5', note: 'Smaller open models for fine-tuning' } ] },
        { name: 'Fine-tuning Tools', tools: [ { name: 'Hugging Face Transformers', note: 'De facto standard for model training & sharing' }, { name: 'Unsloth', note: '2-5× faster LoRA fine-tuning, lower memory' }, { name: 'Axolotl', note: 'Config-driven fine-tuning framework' } ] },
        { name: 'Serving & Inference', tools: [ { name: 'vLLM', note: 'Production serving with PagedAttention' }, { name: 'Ollama', note: 'Local inference, one-command setup' }, { name: 'TensorRT-LLM', note: 'Nvidia-optimized, max throughput' } ] },
        { name: 'Orchestration', tools: [ { name: 'LangChain', note: 'Chains, agents, tool use, RAG pipelines' }, { name: 'LlamaIndex', note: 'Data ingestion, indexing, retrieval' }, { name: 'Semantic Kernel', note: "Microsoft's orchestration SDK" } ] },
        { name: 'Applications', tools: [ { name: 'Chatbots & Assistants', note: 'Customer support, internal tools' }, { name: 'Code Assistants', note: 'Copilot, Cursor, Cody, Kiro' }, { name: 'Autonomous Agents', note: 'Multi-step task execution with tool use' } ] },
      ],
    },
    // Tech: 4. Where It Is Heading
    whereItsHeadingSection: {
      title: '4. Where It Is Heading',
      intro: 'Six trends shaping the LLM landscape in 2026 and beyond. Click any card to dive deeper.',
      trends: [
        { id: 'reasoning', title: 'Reasoning Models', tagline: 'RL-trained chain-of-thought', detail: 'Models like o3 and DeepSeek R1 use reinforcement learning to develop internal chain-of-thought reasoning. They "think" before answering, dramatically improving math, code, and logic tasks. R1 proved you can get there with pure RL — no supervised fine-tuning needed.', examples: ['OpenAI o3', 'DeepSeek R1', 'Claude with extended thinking'] },
        { id: 'multimodal', title: 'Native Multimodal', tagline: 'Text + image + audio + video in one model', detail: 'Frontier models now process and generate text, images, audio, and video natively — not as bolted-on modules. Gemini was trained multimodal from the start. GPT-5.5 and Claude handle images, audio, and documents in a single context.', examples: ['Gemini 3.1 Pro (native)', 'GPT-5.5 (omni)', 'Llama 4 (vision)'] },
        { id: 'agentic', title: 'Agentic AI', tagline: 'Models that use tools and take actions', detail: 'LLMs are evolving from text generators to autonomous agents that browse the web, write and execute code, call APIs, and complete multi-step tasks. Computer use, MCP (Model Context Protocol), and tool-use frameworks are making this practical.', examples: ['Claude computer use', 'OpenAI Operator', 'Devin (code agent)', 'MCP ecosystem'] },
        { id: 'on-device', title: 'On-Device AI', tagline: 'Smaller models running locally', detail: 'Quantized models (1-4B params) now run on phones and laptops. Apple Intelligence runs on-device by default. Gemma, Phi, and Llama small variants enable private, offline AI with zero API costs.', examples: ['Apple Intelligence (AFM)', 'Gemma 3 2B', 'Phi-4 mini', 'Llama 3.2 3B'] },
        { id: 'efficiency', title: 'Efficiency Revolution', tagline: 'MoE, quantization, distillation', detail: 'DeepSeek V3 trained a 671B model for $5.5M — 10-50× cheaper than expected. Techniques: MoE (activate only needed experts), FP8 training, Multi-head Latent Attention, aggressive quantization, and distillation from large to small models.', examples: ['DeepSeek V3 ($5.5M training)', 'MoE routing', 'GGUF quantization', 'Knowledge distillation'] },
        { id: 'regulation', title: 'Regulation & Safety', tagline: 'EU AI Act, safety requirements', detail: 'The EU AI Act is now in effect, classifying AI systems by risk level. High-risk systems (hiring, credit, law enforcement) face strict requirements. Foundation model providers must document training data, energy use, and safety testing. The US and China are developing parallel frameworks.', examples: ['EU AI Act (2024-2026 rollout)', 'NIST AI RMF', 'China interim AI rules', 'Frontier model safety commitments'] },
      ],
    },
  },
  evaluation: {
    // Business: 1. How to Tell If Your AI Is Working
    measuring: {
      title: '1. How to Tell If Your AI Is Working',
      intro: '"It seems pretty good" isn\'t good enough.',
      introSub: 'Think of it like quality assurance before launching a product — test it systematically, not just casually.',
      goodAnswerLabel: 'Good answer',
      badAnswerLabel: 'Bad answer',
    },
    // Business: 2. Choosing the Right AI Model
    choosing: {
      title: '2. Choosing the Right AI Model',
      intro: 'Choosing an AI model is like hiring for a specific role',
      introSub: "A PhD in physics is impressive, but you wouldn't hire them for a receptionist role.",
      tipsTitle: 'Reading AI leaderboards (like reading product reviews)',
      selfExplainPrompt: 'How would you evaluate whether an AI chatbot is working well for your customer support team?',
    },
    // Tech: 1. Why Evaluation Matters
    whyEvaluationSection: {
      title: '1. Why Evaluation Matters',
      lossTrainsSomething: 'Training loss tells you the model is learning ',
      compareModelsLabel: 'Compare these two models. Model A has ',
      keyInsightCallout: 'Model A has lower perplexity because it produces "safe" generic sentences that are easy to predict. Model B takes more risks with specific facts and structure — harder to predict, but far more useful.',
      lossNotQuality: 'Loss is a training signal, not a quality metric.',
      practiceHeading: 'Evaluation in Practice — nanochat',
    },
    // Tech: 2. Key Benchmarks
    benchmarksSection: {
      title: '2. Key Benchmarks (2025–2026)',
      intro: 'The industry uses standardized benchmarks to compare models. No single benchmark tells the whole story.',
      saturationCallout: 'Top models now score 85-95% on many benchmarks, making it hard to differentiate. The industry is shifting toward harder benchmarks (GPQA, ARC-AGI, SWE-bench) and human preference ratings (LMArena).',
      benchmarks: [
        { name: 'MMLU-Pro', category: 'Knowledge', what: 'Tests general knowledge across 14 disciplines — from biology to physics to law. Harder than original MMLU with 10-choice questions and reasoning-focused problems.', scoring: 'Accuracy (% correct). Multiple choice, 10 options.' },
        { name: 'GPQA', category: 'Science', what: 'Graduate-level science questions written by PhD experts. Designed to be hard even for domain specialists outside their field.', scoring: 'Accuracy on expert-validated questions.' },
        { name: 'HumanEval / SWE-bench', category: 'Coding', what: 'HumanEval: 164 Python problems. SWE-bench: real GitHub issues requiring multi-file fixes in actual repos.', scoring: 'Pass@1 (first attempt correct). SWE-bench: % of issues resolved.' },
        { name: 'MATH / AIME', category: 'Math', what: 'MATH: competition-level math problems. AIME: American Invitational Mathematics Examination problems.', scoring: 'Accuracy. AIME scored 0-15.' },
        { name: 'ARC-AGI', category: 'Reasoning', what: 'Abstract reasoning puzzles testing pattern recognition and generalization. Visual grid transformations.', scoring: '% of puzzles solved correctly.' },
        { name: 'LMArena / Chatbot Arena', category: 'Human Pref', what: 'Blind side-by-side comparisons. Real users chat with two anonymous models and pick the better one. ELO rating system.', scoring: 'ELO rating from pairwise human preferences.' },
      ],
    },
    // Tech: 3. Custom Evaluation
    customEvalSection: {
      title: '3. Custom Evaluation',
      intro: 'Public benchmarks test general capabilities. For ',
      taskTypes: [
        { label: 'Classification', metrics: ['Accuracy', 'F1 Score', 'Precision / Recall'], tip: 'Build a balanced eval set with examples from every class. 200+ examples minimum.' },
        { label: 'Text Generation', metrics: ['ROUGE-L', 'BLEU', 'BERTScore', 'Human rating'], tip: 'Automated metrics correlate poorly with quality. Always include human evaluation for generation tasks.' },
        { label: 'Code Generation', metrics: ['Pass@1', 'Pass@5', 'Execution success rate'], tip: 'Run generated code in a sandbox. Test with edge cases, not just happy paths.' },
        { label: 'Question Answering', metrics: ['Exact Match', 'F1 (token overlap)', 'Faithfulness'], tip: 'For RAG: measure both retrieval quality and answer quality separately.' },
        { label: 'Conversational', metrics: ['Human preference (A/B)', 'Helpfulness rating', 'Safety rate'], tip: 'Use blind A/B comparisons against a baseline model. 100+ conversations minimum.' },
      ],
    },
    // Tech: 4. The Leaderboard Problem
    leaderboardSection: {
      title: '4. The Leaderboard Problem',
      intro: "Benchmarks are useful but flawed. Here's why you shouldn't pick a model based on leaderboard rank alone.",
      arenaHeading: 'The Alternative: LMArena / Chatbot Arena',
      arenaIntro: 'Instead of automated benchmarks, LMArena uses ',
      arenaWorks: "Can't be gamed (blind), measures what users actually care about, captures nuance that automated metrics miss.",
      arenaLimits: "Biased toward chatty/verbose responses, English-centric, doesn't test specialized domains well.",
      bottomLine: 'Use benchmarks as a starting filter, then evaluate on',
    },
  },
  agents: {
    // Business: 1. What Are AI Agents? (was getWhatAreAgentsContent(lang) reading from src/modules/agents/content/)
    whatAreAgents: {
      sectionTitle: '1. What Are AI Agents?',
      intro: 'Most AI tools today are like **a very smart colleague you can text** — they answer questions, but they can\'t actually *do* anything. An AI agent is different: it\'s more like **a personal assistant who can take action on your behalf**.',
      introSub: 'Think of the difference between asking someone "what time is the meeting?" vs. "reschedule my meeting to Thursday and tell everyone."',
      demoTitle: 'From Chatbot to Agent',
      demoDescription: 'Click through to see how AI capabilities evolve — like going from a colleague who answers questions to an assistant who handles tasks.',
      levels: [
        { level: 'Chatbot', analogy: 'Like texting a knowledgeable friend', description: 'You ask a question, you get an answer. That\'s it. The AI can\'t check anything, look anything up, or do anything on your behalf. It only knows what it was trained on.', everyday: 'Imagine asking a colleague a question over Slack — they answer from memory, but they can\'t open your spreadsheet or check your calendar for you.', limit: 'If the answer requires up-to-date info or doing something, you\'re stuck doing it yourself.' },
        { level: 'AI + Search', analogy: 'Like a colleague who can Google things', description: 'The AI can look things up before answering — searching your company documents, checking a knowledge base, or browsing the web. This is called RAG (Retrieval-Augmented Generation).', everyday: 'Like asking your colleague a question and they say "hang on, let me check the shared drive" — then come back with an answer that references actual documents.', limit: 'It can find information, but still can\'t take action. It can tell you the meeting is at 3pm, but can\'t reschedule it.' },
        { level: 'AI Agent', analogy: 'Like a personal assistant who gets things done', description: 'The AI can think about what needs to happen, take actions (send emails, update spreadsheets, book meetings, query databases), check the results, and keep going until the job is done.', everyday: 'Like telling your executive assistant "reschedule my Thursday meetings to next week and email the attendees." They figure out the steps, do them, handle any issues, and report back.', limit: 'More powerful but needs guardrails — you want to approve big decisions before the assistant acts.' },
      ],
      loopTitle: 'How does an agent actually work?',
      loopIntro: 'An agent follows a simple loop — the same one a good assistant uses:',
      loopSteps: [
        { label: 'Think', desc: 'What needs to happen next?' },
        { label: 'Act', desc: 'Do something (send email, look up data, update a record)' },
        { label: 'Check', desc: 'Did it work? What happened?' },
        { label: 'Repeat', desc: 'Until the task is done' },
      ],
      loopOutro: 'This is exactly what you do when you delegate a task to someone: they think about it, take a step, check the result, and keep going. The difference is the AI does this in seconds.',
      beforeAfterTitle: 'Before & after: what agents change',
      examples: [
        { scenario: 'Customer support', without: 'Agent answers the question from a script. Customer still has to navigate the website themselves to change their plan.', with: 'Agent looks up the customer\'s account, checks their billing, changes the plan, sends a confirmation email — all in one conversation.' },
        { scenario: 'Expense reports', without: 'AI can explain the expense policy. Employee still fills out the form manually.', with: 'Employee forwards a receipt. Agent reads it, fills out the expense form, categorizes it correctly, and submits it for approval.' },
        { scenario: 'Meeting prep', without: 'AI summarizes a document you paste in. You still have to find the right documents yourself.', with: 'You say "prep me for the 2pm client call." Agent pulls the client\'s recent emails, last meeting notes, open proposals, and creates a one-page brief.' },
      ],
      withoutLabel: 'Without agent',
      withLabel: 'With agent',
      everydayLabel: 'Everyday comparison',
      limitLabel: 'Limitation:',
      selfExplainPrompt: 'In your own words, explain the difference between a chatbot and an agent to a colleague who has never heard of AI agents. Use an everyday comparison.',
      selfExplainAnswer: 'A chatbot is like texting a really knowledgeable friend — they can answer your questions, but they can\'t do anything for you. An agent is like having a personal assistant — you can say "book me a flight to London next Tuesday, under $500, aisle seat" and they\'ll actually search flights, compare options, book it, and send you the confirmation. The key difference is action: a chatbot talks, an agent does.',
    },
    // Tech: 1. What Are AI Agents? — only the section title is rendered through the tree;
    // the body paragraph stays inline in JSX (was effectively already EN-only).
    whatAreAgentsSection: {
      title: '1. What Are AI Agents?',
    },
    // Business: 2. What Can Agents Actually Do?
    toolUse: {
      title: '2. What Can Agents Actually Do?',
      intro: 'An agent\'s power comes from its tools — the things it can connect to and use. Think of it like hiring an assistant and giving them access to your email, calendar, and filing system.',
      tools: [
        { name: 'Search / Retrieval', analogy: 'Like looking something up in a filing cabinet', whatItDoes: 'The agent searches your company documents, knowledge base, or the web.', businessExample: 'A customer asks about your return policy. The agent searches your policy documents and gives an accurate answer.' },
        { name: 'Email & Messaging', analogy: 'Like asking your assistant to send a message', whatItDoes: 'The agent can draft and send emails, Slack messages, or notifications.', businessExample: 'After resolving a support ticket, the agent sends a follow-up email.' },
        { name: 'Data Lookup', analogy: 'Like checking a spreadsheet or database', whatItDoes: 'The agent can query your CRM, ERP, or any business system.', businessExample: '"What\'s the status of the Acme Corp deal?" — the agent checks Salesforce.' },
        { name: 'Calculations', analogy: 'Like handing someone a calculator', whatItDoes: 'The agent can run calculations and generate reports accurately.', businessExample: '"What would our margin be if we discount 15%?" — the agent calculates exactly.' },
        { name: 'Actions & Updates', analogy: 'Like asking someone to update a record', whatItDoes: 'The agent can create, update, or delete records in your business systems.', businessExample: '"Create a follow-up task for the Acme account." — the agent creates it.' },
      ],
      guardrailScenarios: [
        { action: 'Look up information', risk: 'Low', recommendation: 'Let the agent do this freely.' },
        { action: 'Send an email to a customer', risk: 'Medium', recommendation: 'Show a draft and ask for approval before sending.' },
        { action: 'Update a financial record', risk: 'High', recommendation: 'Always require human approval.' },
        { action: 'Delete customer data', risk: 'Critical', recommendation: 'Never automate this. Require explicit human action.' },
      ],
      trustTitle: 'The trust question: what should agents do alone?',
      trustIntro: 'Just like you wouldn\'t give a new employee the company credit card on day one, you need to decide what an agent can do on its own vs. what needs your approval. The bigger the consequence of a mistake, the more human oversight you need.',
      platformNote: 'Platforms like Amazon Bedrock AgentCore handle the plumbing — connecting to tools, managing memory across conversations, running securely at scale — so your team can focus on the agent\'s logic rather than infrastructure.',
      selfExplainPrompt: 'Your manager asks: "Should we let the AI agent send emails to customers without approval?" How would you think through this decision?',
      selfExplainAnswer: 'I\'d consider the risk: a wrong email could damage the relationship. I\'d recommend starting with a draft-and-approve workflow. Over time, auto-send routine responses while keeping human review for sensitive communications. Start cautious, loosen as trust builds.',
    },
    // Tech: 2. Function Calling — body prose is hardcoded EN in JSX; only title is migrated.
    functionCallingSection: {
      title: '2. Function Calling',
    },
    // Tech: 3. MCP (Model Context Protocol). Key normalized from legacy `mCPSection` to `mcpSection`.
    mcpSection: {
      title: '3. MCP (Model Context Protocol)',
      p2: 'Instead of writing custom integrations for every model provider, you build one MCP server. Any MCP-compatible client — Claude, ChatGPT, Cursor, VS Code, your own app — can discover and use your tools automatically.',
    },
    // Business: 3. How to Set Up Agents for Your Team
    patterns: {
      title: '3. How to Set Up Agents for Your Team',
      intro: 'There\'s no one-size-fits-all. Just like you organize a team differently for a quick task vs. a major project, there are different ways to set up AI agents.',
      patterns: [
        { name: 'Single Agent', analogy: 'One assistant handling everything', howItWorks: 'One AI agent receives the task, figures out the steps, and does them all. Simple and fast for straightforward tasks.', bestFor: 'Tasks with clear steps that one person could handle — answering questions, filling forms, simple lookups.', realExample: 'A customer asks "what\'s my order status?" The agent checks the order system and responds. Done in one go.' },
        { name: 'Handoff (Routing)', analogy: 'A receptionist directing you to the right department', howItWorks: 'A "router" agent figures out what kind of request this is, then hands it off to a specialist agent. Like calling a company and being transferred to the right department.', bestFor: 'When you have different types of requests that need different expertise — support vs. sales vs. billing.', realExample: 'Customer writes in. Router agent detects it\'s a billing issue and hands off to the billing specialist agent, which has access to payment systems.' },
        { name: 'Multi-Agent Team', analogy: 'A project team where each person has a role', howItWorks: 'Multiple specialized agents work together, each handling their part. One might research, another writes, another reviews — like a team collaborating on a project.', bestFor: 'Complex tasks that benefit from different perspectives or skills — report generation, research projects, content creation.', realExample: 'Creating a market analysis: one agent gathers data, another analyzes trends, a third writes the executive summary, and a fourth checks the numbers.' },
        { name: 'Human-in-the-Loop', analogy: 'An assistant who checks with you before big decisions', howItWorks: 'The agent does the work but pauses at key decision points to get your approval. Like an assistant who drafts the email but waits for you to hit send.', bestFor: 'High-stakes tasks where mistakes are costly — financial transactions, customer communications, legal documents.', realExample: 'Agent prepares a contract amendment, shows you the changes, and waits for your "looks good" before sending it to the client.' },
      ],
      decisionQuestions: [
        { question: 'How complex is the task?', simple: 'Single agent — keep it simple', complex: 'Multi-agent team — divide and conquer' },
        { question: 'How risky are mistakes?', simple: 'Let the agent run autonomously', complex: 'Add human-in-the-loop checkpoints' },
        { question: 'Are there different request types?', simple: 'One agent handles all', complex: 'Router + specialist agents' },
        { question: 'How fast does it need to be?', simple: 'Single agent is fastest', complex: 'Multi-agent adds latency but improves quality' },
      ],
    },
    // Tech: 4. Agent Design Patterns
    designPatternsSection: {
      title: '4. Agent Design Patterns',
      intro: 'Not all agents work the same way. These are the core architectural patterns — each suited to different types of tasks.',
      patterns: [
        { name: 'ReAct', description: 'The most common pattern. The agent alternates between thinking (reasoning about what to do), acting (calling a tool), and observing (reading the result). Repeats until the task is done.', useCase: 'General-purpose agents, Q&A with tool use, data retrieval tasks.', example: '"What are the top 3 restaurants near me?" → thinks → calls search API → reads results → thinks → responds' },
        { name: 'Reflection', description: 'The agent generates an output, then reviews its own work and improves it. A second LLM call (or the same model with a critic prompt) evaluates quality and suggests fixes.', useCase: 'Code generation, writing tasks, any output that benefits from self-review.', example: 'Write code → review for bugs → fix issues → verify tests pass → return final version' },
        { name: 'Planning', description: 'Before executing anything, the agent creates a step-by-step plan. Then it follows the plan, potentially re-planning if something unexpected happens.', useCase: 'Complex multi-step tasks, research, project management.', example: '"Build me a dashboard" → plan: 1) gather requirements 2) design schema 3) create components 4) test' },
        { name: 'Multi-Agent', description: 'Multiple specialized agents collaborate. Each agent has a specific role (researcher, coder, reviewer) and they pass work between each other.', useCase: 'Complex workflows, software development, research pipelines.', example: 'Researcher finds info → Writer drafts content → Editor reviews → Publisher formats' },
        { name: 'Human-in-the-Loop', description: 'The agent pauses before risky actions and asks for human approval. Essential for production systems where mistakes have real consequences.', useCase: 'Financial transactions, infrastructure changes, data deletion, production deployments.', example: '"Delete all inactive users" → agent pauses → shows list of 847 users → waits for confirmation' },
      ],
    },
    // Business: 4. How Agents Connect to Everything (HowAgentsConnectBusiness).
    // Component currently uses `useT(EN, {})` (empty overrides), but the legacy `connectSv/Ko`
    // contains preserved human translations — reconnected here through sv.ts/ko.ts.
    connect: {
      title: '4. How Agents Connect to Everything',
      intro: 'An agent is only useful if it can do things. Here is how the ecosystem fits together — what each piece does, where you actually see it in your tools, and whether you need to do anything about it.',
      concepts: [
        { name: 'MCP — connecting AI to your tools', analogy: 'Universal access badges for your systems', whatItIs: 'An open standard (often called the "USB-C of AI") that lets any AI tool talk to any external system through one protocol. Built by Anthropic, adopted across the industry. Hundreds of public connectors exist for things like GitHub, Slack, Salesforce, Postgres, Google Drive, Jira, Linear, Notion.', whereYouSeeIt: 'When you click "Connect to Slack" or "Connect to Salesforce" inside a Claude Project, Custom GPT, Cursor, or Kiro — that&apos;s often an MCP connection under the hood. Your IT admin sees them in tool settings as "MCP servers" or "connectors."', doIneedToDoSomething: 'Usually no — the AI tool comes with a list of pre-built MCP connectors. You just click "connect" and authorise. For non-standard internal systems, your engineering team might build a custom MCP server (a one-time effort).', whyCare: 'Without MCP your AI is a smart text box. With MCP it can read your real data and take real actions — file a Jira ticket, query your database, send a Slack message. This is where AI stops being a chat toy and starts replacing busywork.', example: 'Your team installs the GitHub MCP server. Now everyone&apos;s AI tool — Claude, Cursor, Kiro — can review pull requests, file issues, and read code in your private repos. One install, every tool benefits.' },
        { name: 'Skills — packaged expertise for AI', analogy: 'A training manual for one specific task — packaged so any AI can use it', whatItIs: 'A folder of instructions (a SKILL.md file) that teaches an AI HOW to do one thing — the workflow, decision rules, edge cases. Skills are an open standard from Anthropic. The AI loads only the skills it needs, when it needs them.', whereYouSeeIt: 'A "Skills" panel in Claude or Anthropic&apos;s API console. A "skills/" folder in a code repo. A library of installable skills inside Microsoft Agent Framework or Amazon Quick. The newest tools list available skills like an app store.', doIneedToDoSomething: 'You can use skills others have built (more like installing an app) without writing one. Writing one is a markdown file — no code required. Operations, HR, finance teams write skills for their own processes.', whyCare: 'Without a skill, you have to re-explain a multi-step process to AI every time. With a skill, the AI just knows how your team files an expense, runs a release, or onboards a customer — once and forever, no matter which AI tool the user picks.', example: 'Your finance team writes an "expense-policy" skill. From then on, anyone in the company who asks any AI tool to file an expense gets the right approver, right policy version, and right escalation path — automatically.' },
        { name: 'Kiro Powers — bundled expertise for developers', analogy: 'A specialist consultant who arrives with their own toolkit', whatItIs: 'A Kiro-specific feature: curated bundles of MCP servers + best-practice rules + automation hooks for a specific tech domain. Think "AWS Observability Power" or "Feature Flags Power."', whereYouSeeIt: 'Inside the Kiro IDE — in the Powers panel. When you mention a relevant keyword, Kiro auto-loads the right Power.', doIneedToDoSomething: 'Engineering teams using Kiro can install Powers from the marketplace. Other teams don&apos;t need to do anything — Powers are an engineering tool.', whyCare: 'For engineering managers: Powers let you encode "how we do AWS observability" or "how we use feature flags" as a shareable bundle. Newcomers get up to speed in days, not months.', example: 'Your team installs the "AWS Observability" Power. Now every engineer using Kiro automatically gets your company&apos;s logging conventions, your CloudWatch dashboards, and your incident playbooks — without having to learn them from scratch.' },
        { name: 'A2A — agents talking to other agents', analogy: 'Departments sending requests to each other', whatItIs: 'Where MCP connects an agent to TOOLS, A2A (Agent-to-Agent) connects an agent to OTHER AGENTS. Created by Google in 2025, donated to the Linux Foundation. Backed by 100+ organisations.', whereYouSeeIt: 'Mostly behind the scenes today — but you&apos;ll see it as "agent marketplaces" emerge: a Salesforce agent calling an Atlassian agent, your support agent delegating to a billing agent. The user just sees one conversation; behind the scenes, multiple agents collaborated.', doIneedToDoSomething: 'For most teams, no action needed in 2026. As more vendors ship A2A-compatible agents, this becomes the plumbing for cross-system AI workflows.', whyCare: 'A2A is the difference between "10 disconnected AI tools" and "your AI tools work together." Today most companies have the disconnected version. Watch this space over the next 12-18 months.', example: 'A customer asks your support agent for a refund. Via A2A, the support agent delegates to the billing agent (which has the actual access to issue refunds). The user sees one smooth response; two agents collaborated.' },
      ],
      platformNote: 'Platforms like Amazon Bedrock AgentCore, Microsoft Copilot Studio, and Salesforce Agentforce wrap all of this together — they manage which model runs, which tools are available, how memory works, what limits apply. Most companies don\'t build this from scratch; they pick a platform that fits their existing stack.',
      insightTitle: 'The pattern: open standards, not lock-in',
      insightText: 'Notice the pattern: most of these are open standards, not vendor lock-in. MCP, Agent Skills, A2A — all donated to the Linux Foundation under the Agentic AI Foundation (December 2025). That means a skill or MCP connector you write or buy works across vendors. This is rare in enterprise software and worth pushing your AI tool vendors to honour.',
      selfExplainPrompt: 'Think of a multi-step process at your company that involves multiple systems (e.g. closing a deal, onboarding a hire, processing a refund). Which of the four concepts above would each step rely on?',
      selfExplainAnswer: 'Example — closing a deal: (1) MCP connects the agent to your CRM, email, calendar, project management, and billing systems. (2) A "deal-close" Skill encodes your team&apos;s 6-step workflow. (3) Powers are not relevant here (engineering-specific). (4) A2A could come into play if the deal-close agent has to delegate billing setup to a finance team agent. The platform (Quick / Copilot Studio / Agentforce) ties them all together at runtime.',
    },
    // Tech: 6. Building Agents
    buildingAgentsSection: {
      title: '6. Building Agents',
      p2: 'A basic agent is just a loop: send messages → check for tool calls → execute tools → feed results back → repeat. Add frameworks like LangGraph or CrewAI only when you need graph-based routing, persistent state, or multi-agent orchestration.',
      frameworks: [
        { name: 'Raw function calling', description: 'Direct API calls with tool schemas. No framework overhead.', bestFor: 'Simple agents, learning, prototypes' },
        { name: 'Vercel AI SDK', description: 'Web-focused, great TypeScript support, streaming-first.', bestFor: 'Web apps, Next.js, streaming UIs' },
        { name: 'LangChain / LangGraph', description: 'Most popular. LangGraph adds graph-based workflows for complex agents.', bestFor: 'Production agents, complex workflows' },
        { name: 'CrewAI', description: 'Multi-agent framework with role-based agents that collaborate.', bestFor: 'Multi-agent teams, role-based tasks' },
        { name: 'AutoGen (Microsoft)', description: 'Multi-agent conversations with human-in-the-loop support.', bestFor: 'Research, complex multi-agent systems' },
        { name: 'Amazon Bedrock AgentCore', description: 'Managed infrastructure for deploying agents at scale — runtime, memory, identity, observability. Works with any framework (LangGraph, CrewAI, Strands).', bestFor: 'Enterprise deployment, production agents on AWS' },
      ],
    },
    // Business: 6. Business Reality — When AI Takes the Wheel
    businessImpact: {
      title: '6. The Business Reality — When AI Takes the Wheel',
      intro: 'Every executive wants AI transformation. But when it is time to actually let AI make decisions, the room gets quiet. This is the self-driving car problem — the technology might be ready, but are the people and processes?',
      introSub: 'Understanding the spectrum of AI autonomy — and honestly assessing where your organization is ready — is the difference between successful adoption and expensive failures.',
      levels: [
        { level: 'AI as a tool', analogy: 'A calculator — you press the buttons', description: 'AI does exactly what you ask, one task at a time.', orgChange: 'Minimal. Individual productivity boost.', risk: 'Low — the human is always in control.', examples: 'ChatGPT for drafting emails. Copilot for code suggestions.' },
        { level: 'AI as an assistant', analogy: 'A junior employee — does the legwork, you review', description: 'AI handles multi-step tasks but checks with you at key points.', orgChange: 'Moderate. Workflows change: humans shift from doing to reviewing.', risk: 'Medium — mistakes are caught at review points.', examples: 'AI drafts customer responses for human approval. AI triages support tickets.' },
        { level: 'AI as a colleague', analogy: 'A trusted team member — handles their area, escalates exceptions', description: 'AI autonomously handles routine decisions within defined boundaries.', orgChange: 'Significant. Roles shift from execution to oversight.', risk: 'Higher — the AI acts without per-action approval.', examples: 'AI resolves routine support tickets end-to-end. AI processes expense reports.' },
        { level: 'AI as an autonomous operator', analogy: 'A self-driving car — no one at the wheel', description: 'AI makes and executes decisions independently across complex workflows.', orgChange: 'Transformational. Entire processes are redesigned.', risk: 'Highest — cascading errors, accountability gaps.', examples: 'Fully autonomous trading systems. Self-driving supply chain optimization.' },
      ],
      carTitle: 'The self-driving car lesson',
      carIntro: 'The parallels between autonomous vehicles and autonomous AI agents are striking — and the lessons are directly applicable to your AI strategy.',
      parallels: [
        { car: 'Self-driving cars are statistically safer than human drivers', ai: 'AI agents can be more consistent and accurate than humans for routine tasks', but: 'But when a self-driving car crashes, it makes national news. We hold autonomous systems to a higher standard.' },
        { car: 'People are more afraid of plane crashes than car crashes', ai: 'People are more afraid of AI making a wrong decision than a human making the same wrong decision', but: 'The fear is about control. We accept risks we feel we control (driving) more than risks we don\'t (flying, AI).' },
        { car: 'Tesla: ship it, iterate. Waymo: test exhaustively, launch slowly.', ai: 'Some companies go all-in on autonomous AI. Others start with human-in-the-loop.', but: 'Both have merit. Low-risk tasks can tolerate the Tesla approach; high-stakes decisions need the Waymo approach.' },
      ],
      frameworkButton: 'Practical framework: which decisions can AI make?',
      riskFramework: [
        { decision: 'Answer a FAQ', impact: 'Low', reversible: 'Yes', recommendation: 'Fully autonomous' },
        { decision: 'Send a marketing email', impact: 'Medium', reversible: 'No', recommendation: 'Draft + human approval first, then auto-send routine ones' },
        { decision: 'Issue a refund under $50', impact: 'Medium', reversible: 'Partially', recommendation: 'Autonomous with audit trail' },
        { decision: 'Change contract terms', impact: 'High', reversible: 'Difficult', recommendation: 'Always human approval' },
        { decision: 'Hiring/firing recommendation', impact: 'Critical', reversible: 'No', recommendation: 'AI provides data only — never the decision' },
      ],
      failTitle: 'Why 40% of agentic AI projects may fail',
      failIntro: 'Industry analysts project that up to 40% of agentic AI initiatives could be cancelled by 2027 — not because the technology does not work, but because organizations are not ready.',
      failurePatterns: [
        { pattern: 'Technology-first, process-second', detail: 'Teams build the agent before defining what decisions it can make and who is accountable.' },
        { pattern: 'No escalation path', detail: 'The agent handles 95% of cases well, but the 5% it can\'t handle have no clear path to a human.' },
        { pattern: 'Rubber-stamp reviews', detail: 'Humans are "in the loop" but approve everything without checking.' },
        { pattern: 'All-or-nothing thinking', detail: 'Leaders want full autonomy or nothing. The gradual approach feels too slow but is far more likely to succeed.' },
      ],
      selfExplainPrompt: 'Your CEO says "I want our customer support to be fully autonomous by Q4." How would you advise them?',
      selfExplainAnswer: 'I recommend the Waymo approach: Start with Level 2 for routine tasks in Q1. Move to Level 3 in Q2 once we have data showing 98%+ accuracy. Keep complex tasks at Level 2 through Q3. Evaluate full autonomy in Q4 based on actual performance data. This gets 70% of the efficiency gains early with minimal risk.',
    },
    // Tech: 7. A2A — Agent-to-Agent Protocol. Key normalized from `a2ASection` to `a2aSection`.
    a2aSection: {
      title: '7. A2A — Agent-to-Agent Protocol',
      p3: 'MCP handles agent→tool connections. A2A handles agent→agent delegation. Together they enable cross-team workflows where each team owns and operates their own agent.',
      p4: 'Example: cross-team agent collaboration',
      protocols: [
        { name: 'MCP', direction: 'Agent → Tool/Resource', analogy: 'USB — connecting peripherals to a computer', scope: 'One agent accessing external capabilities (APIs, databases, file systems)', standard: 'Anthropic (open, adopted by OpenAI, AWS, Microsoft)', status: '3,000+ servers, production-ready' },
        { name: 'A2A', direction: 'Agent → Agent', analogy: 'HTTP — computers talking to computers', scope: 'Agents discovering, delegating to, and collaborating with other agents across org boundaries', standard: 'Google → Linux Foundation (100+ orgs: AWS, Microsoft, Salesforce, SAP)', status: 'Spec stable, early production adoption' },
      ],
    },
    // Tech: 8. Skills, Steering, and the Managed Runtime
    skillsHarnessSection: {
      title: '8. Skills, Steering, and the Managed Runtime',
      intro: 'MCP gives agents tools. Agent Skills give them workflows. AGENTS.md and Kiro steering give them project context. Bedrock AgentCore gives them a managed runtime. The ecosystem has converged on distinct, layered standards — most of them open and donated to the Agentic AI Foundation (Linux Foundation, December 2025).',
      capabilities: [
        { name: 'MCP Server', layer: 'Connectivity', what: 'Universal tool connector — exposes one API/database/service to any MCP client', granularity: 'Single tool or resource', reusability: 'Any MCP-compatible agent or IDE', example: 'mcp-server-salesforce, mcp-server-postgres, mcp-server-slack' },
        { name: 'Agent Skill (SKILL.md)', layer: 'Behavior', what: 'Open-standard package — folder with SKILL.md (frontmatter + instructions) plus optional scripts/, references/, assets/. Loads progressively: metadata always, body when activated, files on demand.', granularity: 'Multi-step workflow or domain expertise', reusability: 'Any Skills-compatible agent (Claude Code, Codex, Microsoft Agent Framework, Kiro, …)', example: 'customer-onboarding, pdf-processing, code-review' },
        { name: 'AGENTS.md', layer: 'Project context', what: 'README for agents — repo-level instructions: setup, code style, test commands, PR rules. Open standard from the Agentic AI Foundation.', granularity: 'Whole repo or subdirectory (nested files supported)', reusability: 'Codex CLI, Claude Code, Cursor, Aider, Kiro, OpenHands, and more', example: 'monorepo root + per-package AGENTS.md' },
        { name: 'Kiro Steering', layer: 'Workspace context', what: 'Markdown files in .kiro/steering/ that give Kiro persistent project knowledge — conventions, libraries, standards.', granularity: 'Workspace', reusability: 'Kiro CLI / IDE', example: 'product.md, structure.md, tech.md' },
        { name: 'Bedrock AgentCore', layer: 'Runtime', what: 'Managed agent runtime on AWS — model + system prompt + tools + skills + memory + observability + limits.', granularity: 'Complete agent', reusability: 'Production deployment', example: 'Support agent, sales assistant, IT helpdesk' },
      ],
    },
    // Tech: 8. Production Governance — Trust at Scale.
    // Note: section number "8" is a pre-existing duplicate with skillsHarnessSection — preserved from legacy.
    // Drops dead p3-p6, p9, p10 keys (legacy had p3-p20 placeholders; component only renders p2/p7/p8/p11/p12).
    productionGovernanceSection: {
      title: '8. Production Governance — Trust at Scale',
      intro: 'McKinsey (2026): "Organizations can no longer concern themselves only with AI systems saying the wrong thing; they must contend with systems doing the wrong thing."',
      p2: 'Deploying agents to production is fundamentally different from deploying APIs. An API does what you coded. An agent',
      p7: 'Autonomy tiers — match oversight to risk',
      p8: 'Agent-specific failure modes (beyond hallucination)',
      p11: 'Organizations without proactive governance could see a',
      p12: 'The EU AI Act (phasing in 2025-2027) imposes fines up to',
      autonomyTiers: [
        { tier: 'L0 — Copilot', loop: 'Human acts, AI suggests', oversight: 'Every action', examples: 'Code completion, email drafts, search suggestions', risk: 'Minimal — human executes' },
        { tier: 'L1 — Executor', loop: 'Human approves, AI acts', oversight: 'Per-action approval', examples: 'AI drafts + human sends email, AI prepares + human files ticket', risk: 'Low — human gate on every action' },
        { tier: 'L2 — Bounded autonomy', loop: 'AI acts within rules, human monitors', oversight: 'Async review + alerts', examples: 'Auto-resolve L1 tickets, process refunds <$100, schedule meetings', risk: 'Medium — errors may not be caught immediately' },
        { tier: 'L3 — Supervised autonomy', loop: 'AI acts, escalates exceptions', oversight: 'Exception-based + audits', examples: 'End-to-end customer onboarding, automated incident response', risk: 'High — cascading errors possible, need kill switches' },
        { tier: 'L4 — Full autonomy', loop: 'AI acts, human sets strategy', oversight: 'Outcome-based review', examples: 'Autonomous trading, self-healing infrastructure, supply chain optimization', risk: 'Critical — accountability gaps, regulatory exposure' },
      ],
      governanceControls: [
        { control: 'Action boundaries', what: 'Whitelist of permitted actions per agent. Anything not explicitly allowed is denied.', implementation: 'System prompt constraints + AgentCore harness max_iterations + tool-level IAM policies' },
        { control: 'Spend limits', what: 'Cap on financial impact per action and per session.', implementation: 'Guardrails on refund amounts, purchase limits, API call budgets. Hard-coded in skill logic, not just prompt instructions.' },
        { control: 'Audit trail', what: 'Every agent action logged with reasoning trace, tool calls, inputs/outputs.', implementation: 'AgentCore Observability — step-by-step execution traces, metadata tagging, trajectory inspection.' },
        { control: 'Kill switch', what: 'Ability to immediately halt an agent or class of agents.', implementation: 'AgentCore Runtime session termination. Circuit breakers on error rate thresholds.' },
        { control: 'Human escalation', what: 'Defined triggers that pause the agent and route to a human.', implementation: 'Confidence thresholds, topic classifiers (Bedrock Guardrails), explicit escalation rules in skills.' },
        { control: 'Drift detection', what: 'Monitor for behavioral changes over time — is the agent doing something it didn\'t used to do?', implementation: 'Baseline metrics (action distribution, escalation rate, error rate). Alert on statistical deviation.' },
      ],
    },
  },
} as const

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
