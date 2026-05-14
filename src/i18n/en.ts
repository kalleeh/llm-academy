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
