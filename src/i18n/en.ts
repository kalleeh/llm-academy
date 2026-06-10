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
  'tools-landscape': {
    label: 'AI Tools Landscape',
    subtitle: 'Chat assistants, agentic work apps, coding agents — what tool for what job, and why.',
    businessSubtitle: 'The AI tools your teams should be using — and how to pick the right one for each job.',
  },
  'working-with-ai': {
    label: 'Working With AI',
    subtitle: 'Context, iteration, files, custom instructions — getting great results from a chat assistant.',
    businessSubtitle: 'Brief it like a colleague, iterate like an editor — make great AI results your default.',
  },
  'optimizing-workflow': {
    label: 'Optimizing Your Workflow',
    subtitle: 'Where AI fits your day, reusable setups, team patterns — from one-off prompts to a system.',
    businessSubtitle: 'Find your AI-shaped tasks, turn one-offs into systems, and roll it out to your team.',
  },
  'agentic-coding': {
    label: 'Agentic Coding',
    subtitle: 'Coding with an agent as your pair — task decomposition, context & memory, review loops, MCP.',
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
    bridgeToTools: 'You know who builds the models. The flip side: which of these products should YOU be using day to day?',
    bridgeToToolsBusiness: 'You know the players. Now see which of their tools fit your teams — and how to pick.',
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
  quantization: {
    // Tech: 1. What is Quantization? — only the section title is rendered through the tree;
    // body prose is hardcoded EN in JSX. Legacy intro field was orphaned (component never rendered c.intro).
    whatIsQuantizationSection: {
      title: '1. What is Quantization?',
    },
    // Tech: 2. Quantization Methods — full content tree including the methods array
    quantizationMethodsSection: {
      title: '2. Quantization Methods',
      intro: 'Four main approaches dominate the ecosystem. Each targets a different use case.',
      methods: [
        {
          name: 'GPTQ',
          tagline: 'Post-training, GPU-optimized quantization',
          howItWorks:
            'GPTQ quantizes weights layer-by-layer using a small calibration dataset (~128 samples). It minimizes the output error of each layer by solving an optimization problem, producing INT4/INT3 weights optimized for GPU inference via CUDA kernels.',
          pros: [
            'Excellent GPU inference speed with optimized kernels',
            'Well-established with broad tooling support',
            'Good quality at INT4 with proper calibration',
          ],
          cons: [
            'Requires calibration data (quality-sensitive)',
            'GPU-only — no CPU inference support',
            'Quantization process is slow (hours for large models)',
          ],
          whenToUse: 'Legacy GPU deployments. Being superseded by AWQ for new projects.',
        },
        {
          name: 'AWQ',
          tagline: 'Activation-aware — the GPU production standard',
          howItWorks:
            'AWQ identifies the most important weights by analyzing activation patterns, then protects those weights during quantization. Instead of treating all weights equally, it preserves the 1% of weights that matter most for quality, achieving better accuracy at the same bit-width.',
          pros: [
            'Best quality-per-bit for GPU inference in 2025–2026',
            'Faster quantization than GPTQ',
            'Excellent vLLM and TGI integration',
          ],
          cons: [
            'GPU-only (no CPU fallback)',
            'Newer ecosystem — fewer pre-quantized models than GPTQ',
            'Requires activation statistics from calibration data',
          ],
          whenToUse: 'Default choice for GPU production serving. Use with vLLM or TGI.',
        },
        {
          name: 'GGUF',
          tagline: 'The llama.cpp ecosystem format',
          howItWorks:
            'GGUF is a file format (not just a quantization method) designed for llama.cpp. It bundles model weights, tokenizer, and metadata into a single file. Supports many quantization levels (Q2_K through Q8_0) with mixed-precision: important layers get more bits, less important layers get fewer.',
          pros: [
            'Runs on CPU, GPU, or mixed (CPU offload)',
            'Single-file format — easy to distribute',
            'Huge ecosystem: Ollama, LM Studio, llama.cpp',
            'Many quant levels for fine-grained size/quality control',
          ],
          cons: [
            'Slower than AWQ/GPTQ on pure GPU inference',
            'Quality can vary between quant levels',
            'Format is llama.cpp-specific',
          ],
          whenToUse: 'Local inference, Ollama, LM Studio, or any CPU/hybrid deployment.',
        },
        {
          name: 'BitsAndBytes',
          tagline: 'Easy integration for training and inference',
          howItWorks:
            'BitsAndBytes provides on-the-fly quantization integrated directly into the HuggingFace Transformers library. Load any model in 4-bit or 8-bit with a single flag. Most importantly, it enables QLoRA — fine-tuning a 4-bit quantized model with LoRA adapters, making fine-tuning accessible on consumer GPUs.',
          pros: [
            'One-line integration with HuggingFace',
            'Enables QLoRA fine-tuning on consumer GPUs',
            'No separate quantization step needed',
          ],
          cons: [
            'Slower inference than GPTQ/AWQ',
            'Not ideal for production serving',
            'NVIDIA GPU required',
          ],
          whenToUse: 'Fine-tuning with QLoRA, or quick experimentation. Not for production serving.',
        },
      ],
    },
    // Tech: 3. The Conversion Pipeline — title, intro, p2
    conversionPipelineSection: {
      title: '3. The Conversion Pipeline',
      intro: 'Walk through the real process: take a HuggingFace model, convert it to GGUF, and quantize it.',
      p2: 'SafeTensors (14 GB, 3 shards) → GGUF FP16 (14.5 GB, single file) → GGUF Q4_K_M (4 GB, quantized) → Ollama model. The final model runs on a laptop with 8 GB RAM.',
    },
    // Tech: 4. Quality vs Size — title + p2 only.
    // Legacy `quantLevelsTranslations` SV/KO data (FP32/FP16/INT8/INT4 generic precision tiers) is misaligned
    // with the current QUANT_LEVELS array (Q2_K/Q3_K_M/Q4_K_M/... GGUF quant levels) — pre-existing skew from a
    // refactor; SV/KO data is dropped and QUANT_LEVELS stays inline EN-only until future translation work.
    // Note: literal `&apos;` characters preserved in EN_P2 as-is (pre-existing rendering artifact —
    // renders as `isn&apos;t`/`There&apos;s` for users today; preserving per "EN bit-for-bit" rule).
    qualityVsSizeSection: {
      title: '4. Quality vs Size',
      p2: 'The relationship between model size and quality isn&apos;t linear. There&apos;s a sweet spot where you get most of the quality at a fraction of the size. For a 7B model, that sweet spot is',
    },
  },
  inference: {
    // Tech: 1. How Inference Works
    // EN_P4 was a dead duplicate of EN_P5 in legacy; only c.p5 was rendered. Drop p4.
    howInferenceWorksSection: {
      title: '1. How Inference Works',
      p2: 'Inference is the process of generating text from a trained model. It happens in two distinct phases —',
      p5: 'KV Cache Size vs Context Length',
    },
    // Tech: 2. Serving Frameworks
    servingFrameworksSection: {
      title: '2. Serving Frameworks',
      intro: 'A trained model is just weights on disk. To serve it at scale you need a framework that handles batching, scheduling, and optimization.',
      p3: 'Inference in Practice — nanochat',
      frameworks: [
        { name: 'vLLM', tagline: 'PagedAttention · Continuous batching · Production standard', features: ['PagedAttention for efficient KV cache', 'Continuous batching', 'OpenAI-compatible API', 'Tensor parallelism'] },
        { name: 'SGLang', tagline: 'RadixAttention · Fastest structured output', features: ['RadixAttention for prefix sharing', 'Fastest JSON/grammar output', 'Automatic KV cache reuse', 'Constrained decoding'] },
        { name: 'TensorRT-LLM', tagline: 'Nvidia optimized · Best raw throughput', features: ['Nvidia kernel fusion', 'FP8 quantization', 'In-flight batching', 'Multi-GPU via NVLink'] },
        { name: 'Ollama', tagline: 'Local · Easy · GGUF format', features: ['One-command install', 'GGUF model library', 'REST API built-in', 'macOS/Linux/Windows'] },
        { name: 'llama.cpp', tagline: 'C++ · CPU+GPU · Edge deployment', features: ['Pure C/C++ implementation', 'CPU + GPU hybrid inference', 'GGUF quantized models', 'Runs on phones & Raspberry Pi'] },
      ],
    },
    // Tech: 3. Optimization Techniques
    optimizationTechniquesSection: {
      title: '3. Optimization Techniques',
      intro: 'Raw model inference is slow. These techniques can improve throughput 2-10x without changing the model.',
      techniques: [
        { name: 'Continuous Batching', short: 'Process multiple requests simultaneously', description: 'Static batching waits for all requests to finish before starting new ones. Continuous batching inserts new requests as soon as a slot opens — GPU stays busy, throughput jumps 2-5×.' },
        { name: 'KV Cache Paging (vLLM)', short: 'Manage cache like virtual memory', description: 'Traditional KV cache pre-allocates contiguous memory per sequence, wasting space on short outputs. PagedAttention allocates cache in small blocks (pages) on demand — like OS virtual memory. Reduces waste from ~60% to ~4%.' },
        { name: 'Speculative Decoding', short: 'Small model drafts, large model verifies', description: 'A small "draft" model generates K candidate tokens cheaply. The large model verifies all K in a single forward pass (parallel). If most are accepted, you get K tokens for the cost of ~1 large-model step. Typical speedup: 2-3×.' },
        { name: 'Prefix Caching', short: 'Reuse KV cache for shared system prompts', description: 'Many requests share the same system prompt. Instead of recomputing its KV cache every time, cache it once and reuse across requests. SGLang\'s RadixAttention does this automatically with a trie structure. Saves 30-80% of prefill compute.' },
      ],
    },
    // Tech: 4. Cost Optimization
    costOptimizationSection: {
      title: '4. Cost Optimization',
      intro: 'Inference cost is the dominant expense in production LLM systems. Use this calculator to compare approaches.',
    },
  },
  architecture: {
    // Tech: 1. Dense vs Mixture-of-Experts. Title only — legacy SV/KO had empty `intro`. comparison[] is tArray-driven.
    denseMoESection: {
      title: '1. Dense vs Mixture-of-Experts',
      comparison: [
        { aspect: 'Training ease', dense: 'Simpler — standard backprop', moe: 'Harder — load balancing, routing instability' },
        { aspect: 'Fine-tuning', dense: 'Straightforward — all params updated', moe: 'Complex — expert freezing, routing drift' },
        { aspect: 'Memory (inference)', dense: 'All params in VRAM', moe: 'All params in VRAM (larger total)' },
        { aspect: 'Compute (inference)', dense: 'All params activated', moe: 'Only active experts computed — faster' },
        { aspect: 'Scaling efficiency', dense: 'Linear cost increase', moe: 'Sub-linear — add experts cheaply' },
      ],
    },
    // Tech: 2. Scaling Laws. EN_P5 == EN_P8 dead duplicate; EN_P6 == EN_P9 dead duplicate. Component renders only p7/p8/p9.
    scalingLawsSection: {
      title: '2. Scaling Laws',
      intro:
        'Before Chinchilla, models like GPT-3 (175B params, 300B tokens) were undertrained.\n        Chinchilla (70B params, 1.4T tokens) significantly outperformed GPT-3 with less compute.',
      p7: 'Chinchilla-optimal for 37B active',
      p8: 'DeepSeek\'s Challenge to Chinchilla',
      p9: 'DeepSeek V3 (671B total, 37B active) trained on',
    },
    // Tech: 3. Attention Variants
    attentionVariantsSection: {
      title: '3. Attention Variants',
      intro: 'The KV cache is the main memory bottleneck during inference. Different attention variants trade off memory, speed, and quality.',
      p3: 'Query Heads → KV Heads (8 query heads shown)',
    },
    // Tech: 4. Model Configuration. PRESETS stays inline (legacy presetsTranslations was {sv:[],ko:[]} — empty by design).
    modelConfigSection: {
      title: '4. Model Configuration',
      intro: 'Configure your own model architecture and see how parameter choices affect total size.',
    },
    // Tech: 5. The Decision Tree. getRecommendation() in component returns inline EN strings (decision logic).
    decisionTreeSection: {
      title: '5. The Decision Tree',
      intro: 'Choosing an architecture depends on your budget, use case, and whether you need to serve the model yourself.',
      p6: 'What\'s your compute budget?',
      p7: 'Do you need to fine-tune the model?',
      p8: 'Custom data, domain-specific tasks',
      p9: 'Prompting, RAG, or API use only',
    },
  },
  training: {
    // Tech: 1. Starting From Nothing. Component previously had no useT — heading was hardcoded EN. Legacy SV/KO `trainingSection1Sv.title` existed but was orphaned. Migrating to preserve those translations going forward.
    trainingSection1: {
      title: '1. Starting From Nothing',
    },
    // Tech: 2. The Training Loop. EN_P2 was a dead duplicate of EN_P3 — drop p2.
    // `subtitle` and `idle` come from a small inline `{en,sv,ko}[lang]` ad-hoc i18n in the original component.
    trainingSection2: {
      title: '2. The Training Loop',
      p3: 'Training is a loop that runs millions of times. Each iteration: show the model some text, see how wrong it is, then nudge the weights to be less wrong. Repeat until the loss stops dropping. In nanochat, one command kicks off the entire pre-training run —',
      subtitle: 'Click a stage or animate the full cycle',
      idle: 'Click a stage above or press Animate to see how each step works.',
    },
    // Tech: 3. The Filesystem After Training. Same as Section1 — legacy SV/KO title was orphaned in the original component.
    trainingSection3: {
      title: '3. The Filesystem After Training',
    },
    // Tech: 4. Training Variants
    trainingSection4: {
      title: '4. Training Variants',
      p2: 'Training from scratch is just one option — and the most expensive. Most people start from an existing model and adapt it. Click each approach to compare, then run the terminal command to see the filesystem change.',
      variants: [
        { label: 'From Scratch', desc: 'Build the entire model from random weights. nanochat can reproduce GPT-2 capability on 8× H100 in ~3 hours for ~$73 — a task that cost $50,000 in 2019. Frontier models still cost millions.' },
        { label: 'Continued Pre-training', desc: 'Start from an existing model and keep training on new domain data. Same architecture, shifted weights.' },
        { label: 'Full Fine-tuning', desc: 'Update ALL weights on a specific task dataset. Same structure, all weights change.' },
        { label: 'LoRA', desc: 'Freeze the base model. Train tiny adapter matrices that sit alongside the frozen weights. Two separate folders.' },
      ],
    },
    // Tech: 5. What's Inside the Weight Files
    trainingSection5: {
      title: '5. What\'s Inside the Weight Files',
      p2: 'Format comparison — when to use each:',
      formats: [
        { name: 'SafeTensors', ext: '.safetensors', useCase: 'Default for Hugging Face. Safe, fast, memory-mapped.', pros: 'No code execution risk, fast loading', cons: 'HF ecosystem only' },
        { name: 'GGUF', ext: '.gguf', useCase: 'Quantized models for llama.cpp / Ollama / local inference.', pros: 'Single file, quantization built-in', cons: 'Inference only, not for training' },
        { name: 'PyTorch', ext: '.bin / .pt', useCase: 'Legacy format. Uses Python pickle under the hood.', pros: 'Universal PyTorch support', cons: 'Security risk (arbitrary code execution)' },
      ],
    },
  },
  llmdata: {
    // Tech: 1. Data Sources. SOURCE_META holds non-translatable percent/barColor/color.
    dataSourcesSection: {
      title: '1. Data Sources',
      p2: 'Modern LLMs train on trillions of tokens from diverse sources. Key open datasets include',
      sources: [
        { name: 'Common Crawl', details: 'Web pages scraped regularly since 2008. FineWeb by HuggingFace extracted 15T tokens with aggressive quality filtering. DCLM (DataComp-LM) and RedPajama also build on Common Crawl with different filtering strategies.' },
        { name: 'Code', details: 'GitHub repos, StackOverflow, docs. The Stack v2 is 67.5 TB across 619 languages (~900B tokens). Code data dramatically improves reasoning and structured output.' },
        { name: 'Books', details: 'Digitized books provide extended narrative coherence and deep domain knowledge. Books3 (~196K books) was commonly used but faced copyright challenges.' },
        { name: 'Academic', details: 'Papers from arXiv, PubMed, Semantic Scholar. Provides scientific reasoning and mathematical notation. peS2o contains 40M open-access papers.' },
        { name: 'Wikipedia', details: 'All language editions. Despite being ~3% by volume, Wikipedia is high-quality factual text and is often upsampled during training for better factual grounding.' },
        { name: 'Other', details: 'Reddit, forums, multilingual data, curated instruction datasets, government docs, patents, legal text. Diversity here helps generalization.' },
      ],
    },
    // Tech: 2. Cleaning Pipeline. STEPS terminal content stays inline (technical commands, not translatable).
    cleaningPipelineSection: {
      title: '2. Cleaning Pipeline',
      intro: 'Raw web data is mostly garbage. A typical pipeline discards 85%+ through extraction, filtering, and deduplication.',
    },
    // Tech: 3. Data Mix
    dataMixSection: {
      title: '3. Data Mix',
      intro: 'The ratio of data types directly shapes what the model is good at.',
      p3: 'Illustrative — real capability depends on model size, training duration, and data quality.',
    },
    // Tech: 4. Synthetic Data. Title only — legacy `intro` field is orphaned (component renders no c.intro).
    syntheticDataSection: {
      title: '4. Synthetic Data',
    },
    // Tech: 5. Data Formats
    dataFormatsSection: {
      title: '5. Data Formats',
      intro: 'Each training stage uses a different format.',
    },
  },
  finetuning: {
    // Tech: 1. When to Fine-Tune
    // Note: WIN_CASES[0].title accidentally repeats the section heading ("1. When to Fine-Tune") in the
    // current EN component — pre-existing typo. Preserved verbatim per "EN bit-for-bit" rule.
    // Legacy SV/KO have the semantically-correct title ("Konsekvent utdataformat" / "일관된 출력 형식")
    // for that position, so SV/KO users see the intended content while EN keeps the existing bug.
    whenToFineTuneSection: {
      title: '1. When to Fine-Tune',
      intro: 'Fine-tuning is powerful but expensive. Walk through this decision tree to see if you actually need it.',
      winCases: [
        { title: '1. When to Fine-Tune', desc: 'Always return valid JSON, specific XML schema, or structured reports — without fragile prompt engineering.' },
        { title: 'Domain terminology', desc: 'Medical, legal, or internal jargon that the base model gets wrong or hallucinates.' },
        { title: 'Latency reduction', desc: 'A fine-tuned 8B model can match a general 70B model on your task — 10x faster, 10x cheaper.' },
        { title: 'Behavior patterns', desc: 'Teach a specific tone, refusal style, or multi-step reasoning pattern that prompting can\'t reliably produce.' },
      ],
    },
    // Tech: 2. Preparing Your Data. CHECKLIST stays inline EN-only — legacy checklistTranslations
    // had different semantic items (format/balance/QA/dedup/length/split) that don't align with the
    // current EN list (diversity/format/size/cleaning/validation/verification). Pre-existing skew.
    preparingDataSection: {
      title: '2. Preparing Your Data',
      intro: 'Data quality determines fine-tuning success. Pick a format, structure your examples, and validate before training.',
    },
    // Tech: 3. The Fine-Tuning Run.
    // Drop EN_P14 (== P17), EN_P15 (== P18), EN_P16 (== P19) dead duplicates from the EN object.
    fineTuningRunSection: {
      title: '3. The Fine-Tuning Run',
      intro: 'A complete LoRA fine-tune of Llama 3.1 8B using Unsloth. Click through each step to see the model load, LoRA attach, training progress, and adapter save.',
      p3: 'LoRA is the most popular way to fine-tune efficiently, but it&apos;s not the only one. The key question is always the same:',
      p5: 'Here&apos;s the idea: every number in a model&apos;s weights is normally stored with high precision — 16 bits per number (FP16), like measuring with a ruler that has millimeter marks. QLoRA says:',
      p6: 'The LoRA adapter matrices (the small part we&apos;re actually training) still use full precision — they need the fine-grained detail to learn properly. So you get the best of both worlds: a compressed base model that takes up little memory, plus precise adapter training on top.',
      p7: 'You can — but there&apos;s a cliff. At 4 bits, the quality loss from rounding is barely measurable. At 2 bits, the model starts forgetting things — like photocopying a photocopy, each round of compression loses detail. At 1 bit, you&apos;ve essentially reduced every weight to &quot;positive or negative&quot; — the model loses most of its nuance. 4-bit is the sweet spot where you save ~75% memory with &lt;1% quality loss.',
      p8: 'A 70B parameter model normally needs ~140 GB of memory (FP16). With QLoRA, the base model fits in ~35 GB, and you only need a few extra GB for the LoRA adapters. That&apos;s the difference between needing a cluster of GPUs and needing a single high-end GPU.',
      p11: 'Think of it like this: instead of retraining an employee (LoRA), you give them a detailed briefing note at the start of every task (prefix tuning). The employee&apos;s skills don&apos;t change, but the briefing steers their work in the right direction.',
      p12: 'In practice, prefix tuning is simpler but generally less effective than LoRA for most tasks. It was an important early PEFT method (2021), but LoRA has largely superseded it. You&apos;ll still see it in research and in some specialized use cases where you need to switch between many tasks quickly — swapping a prefix is cheaper than swapping an adapter.',
      p13: 'Prefix Tuning — a different approach',
      p17: 'The PEFT family: LoRA, QLoRA, and Prefix Tuning',
      p18: 'In the training run above, notice step 3:',
      p19: 'LoRA and QLoRA modify the model\'s weight matrices — they change',
    },
    // Tech: 4. Evaluation & Merging
    evaluationMergingSection: {
      title: '4. Evaluation & Merging',
      intro: 'Test the fine-tuned model, compare before vs after, merge the LoRA adapter into the base model.',
    },
    // Tech: 5. Cost & Platform Guide. PLATFORM_META holds non-translatable gpu/vram/cost/ease.
    costPlatformSection: {
      title: '5. Cost & Platform Guide',
      intro: 'Where to run your fine-tuning job, what it costs, and what hardware you need.',
      p2: 'A LoRA fine-tune of an 8B model on 5K examples costs about',
      platforms: [
        { name: 'Google Colab (Free)', notes: 'Limited to ~12h sessions. T4 is slow for 8B+ models. Good for learning.' },
        { name: 'Google Colab Pro', notes: 'Best value for occasional fine-tuning. A100 access not guaranteed.' },
        { name: 'RunPod / Lambda', notes: 'On-demand GPU rental. Pay only for what you use. Great for serious work.' },
        { name: 'AWS SageMaker', notes: 'Managed service with MLOps integration. Higher cost, more features.' },
        { name: 'Local (own GPU)', notes: 'No recurring cost. 24 GB VRAM handles 8B models with QLoRA. Setup required.' },
      ],
    },
  },
  transformer: {
    // Tech: 1. The Big Picture. EN_P4 == EN_P6, EN_P5 == EN_P7 dead duplicates → drop p4, p5. LAYERS stays inline (legacy layersTranslations had different concepts).
    bigPictureSection: {
      title: '1 · The Big Picture',
      intro: 'A transformer is a stack of identical layers. Data flows from input to output, getting richer at each step.',
      p6: 'Each token looks at every other token to gather context',
      p7: 'Processes each token independently — where knowledge is stored',
    },
    // Tech: 2. Attention Mechanism
    attentionSection: {
      title: '2 · Attention Mechanism',
      intro: 'Attention lets each word look at every other word in the sentence and decide how much to focus on each one.',
      p2: 'Each row shows how much one word attends to every other word. Brighter = stronger attention. Notice how',
      p4: 'Query, Key, Value — A Library Analogy',
    },
    // Tech: 3. Multi-Head Attention. EN_P4 == EN_P6, EN_P5 == EN_P7 dead duplicates → drop p4, p5.
    multiHeadSection: {
      title: '3 · Multi-Head Attention',
      p6: 'One attention pattern isn\'t enough. The model runs',
      p7: 'After all heads compute their patterns, the results are',
    },
    // Tech: 5. Feed-Forward Network. EN_P2 == EN_P4, EN_P3 == EN_P5 dead duplicates → drop p2, p3.
    // Section key normalized from legacy `fFNSection` to clean camelCase `ffnSection`.
    ffnSection: {
      title: '5 · The Feed-Forward Network',
      intro: 'Every token activates all parameters. Simple but expensive at scale — a 70B model\n            uses all 70B parameters for every single token.',
      p4: 'After attention gathers context, each token passes through a',
      p5: 'Only K of N experts activate per token (e.g., 8 of 256 in DeepSeek V3). DeepSeek V3 has 671B total parameters but only uses 37B per token — more knowledge, same compute cost.',
    },
    // Tech: 4. Layer by Layer. EN_P3 == EN_P4 dead duplicate → drop p3. LAYER_DATA stays inline (legacy layerDataTranslations had different concepts).
    layerByLayerSection: {
      title: '4 · Layer by Layer',
      p4: 'Watch how the representation of the token',
    },
  },
  datafoundations: {
    // Business: 1. Garbage In, Garbage Out.
    // Note: the EN component passes intro/showClean/showMessy through useT, but the JSX renders hardcoded EN strings instead — so those legacy fields were unreachable. Tree migrates only the fields the component actually renders (title, goodDataTitle).
    garbageInOut: {
      title: '1. Garbage In, Garbage Out',
      goodDataTitle: 'What good data looks like',
    },
    // Business: 2. Your Company's Data — What AI Sees
    dataForBusiness: {
      title: '2. Your Company\'s Data — What AI Sees',
      intro: 'Your company already has the data AI needs. But not all data looks the same. Let us look at actual examples so you can see the difference.',
      structuredLabel: 'Structured (spreadsheet)',
      unstructuredLabel: 'Unstructured (emails, docs)',
      whyItMattersLabel: 'Why it matters',
      structuredNote: 'Every piece of information has a clear label (column) and consistent format. AI can easily answer "how many Enterprise customers do we have?"',
      unstructuredNote: 'The same customer info is scattered across emails, docs, and Slack — in different formats. This is 80%+ of most companies\' data, and it\'s where LLMs shine.',
      howMuchTitle: 'How much data do you need?',
      howMuchIntro: 'It depends on the task — like training a new employee:',
      amounts: [
        { task: 'Answer FAQs', amount: 'A few dozen Q&A pairs', analogy: 'Like giving a new receptionist a cheat sheet' },
        { task: 'Classify support tickets', amount: 'A few hundred labeled examples', analogy: 'Like showing a new agent examples of each ticket type' },
        { task: 'Write in your brand voice', amount: 'Thousands of past communications', analogy: 'Like months of shadowing your best writer' },
      ],
      selfExplainPrompt: 'Think about your company\'s data. What\'s structured (spreadsheets, CRM)? What\'s unstructured (emails, docs, Slack)? If you pointed an AI at both, what questions could it answer that nobody can answer quickly today?',
      selfExplainAnswer: 'Example: Our CRM has clean customer records (structured) — AI could easily answer who is up for renewal. But the real gold is in our unstructured data: account managers\' email threads have context about customer sentiment, meeting notes capture verbal commitments, and Slack has real-time signals about at-risk accounts.',
    },
    // Tech: 1. Structured vs Unstructured Data. EN_P3 == EN_P4 dead dup → drop p3. CATEGORY_META holds examples (icon+preview).
    // Note: CATEGORIES[0].title accidentally repeats the section heading "1. Structured vs Unstructured Data" (pre-existing typo) — preserved bit-for-bit in EN.
    dataTypesSection: {
      title: '1. Structured vs Unstructured Data',
      intro: 'All data falls into three categories. Click any example to see what it actually looks like.',
      p4: 'LLMs work with unstructured text. This changes everything.',
      categories: [
        { title: '1. Structured vs Unstructured Data', description: 'Fixed schema, rows & columns. Every record follows the same format.' },
        { title: 'Unstructured', description: 'No predefined schema. Meaning is embedded in the content itself.' },
        { title: 'Semi-Structured', description: 'Has some organization (tags, keys) but schema varies between records.' },
      ],
    },
    // Tech: 2. Data Pipelines. EN_P3 == EN_P4 dead dup → drop p3.
    pipelineSection: {
      title: '2. Data Pipelines',
      intro: 'Data rarely arrives ready to use. A pipeline moves it from source to consumer through a series of transformations.',
      p4: 'A mini pipeline in action: raw JSON → clean Parquet → vector embeddings → semantic search',
      stages: [
        { label: 'Source', description: 'Where data originates', details: ['Databases — PostgreSQL, MySQL, MongoDB', 'APIs — REST, GraphQL, webhooks', 'Web scraping — crawlers, parsers', 'File uploads — CSV, JSON, Parquet', 'Streaming — Kafka, Kinesis, event buses'] },
        { label: 'Ingest', description: 'How data enters the pipeline', details: ['Batch — scheduled jobs (hourly, daily)', 'Streaming — real-time event processing', 'ETL — Extract, Transform, then Load', 'ELT — Extract, Load, then Transform', 'CDC — Change Data Capture for incremental sync'] },
        { label: 'Transform', description: 'Clean and reshape data', details: ['Cleaning — handle nulls, fix types, trim whitespace', 'Normalization — consistent formats, units, encodings', 'Deduplication — remove exact and fuzzy duplicates', 'Feature engineering — derive new columns from existing', 'Aggregation — group, summarize, window functions'] },
        { label: 'Store', description: 'Where processed data lives', details: ['Data warehouse — Snowflake, BigQuery, Redshift', 'Data lake — S3, ADLS, GCS (raw files)', 'Lakehouse — Delta Lake, Iceberg, Hudi', 'Vector store — Pinecone, Weaviate, pgvector', 'Feature store — Feast, Tecton'] },
        { label: 'Serve', description: 'How data reaches consumers', details: ['APIs — REST/GraphQL endpoints for apps', 'Dashboards — BI tools, Grafana, Metabase', 'Model training — feed into ML/LLM pipelines', 'RAG retrieval — semantic search over embeddings', 'Exports — reports, data shares, reverse ETL'] },
      ],
    },
    // Tech: 3. Data Quality
    dataQualitySection: {
      title: '3. Data Quality',
      intro: 'Spot the problems in this dataset. Click each issue type below to highlight it in the data.',
      p2: 'For classical ML, bad data means bad predictions. For LLMs, it&apos;s even worse — biased or noisy training data gets baked into the model&apos;s weights and surfaces as hallucinations, stereotypes, or factual errors across millions of interactions.',
    },
    // Tech: 4. Data Architecture Patterns. EN_P5 == EN_P6 dead dup → drop p5.
    // Note: PATTERNS[0].title accidentally repeats the section heading "4. Data Architecture Patterns" (pre-existing typo) — preserved bit-for-bit in EN.
    architectureSection: {
      title: '4. Data Architecture Patterns',
      intro: 'Where does data live? Four dominant patterns, each with different tradeoffs.',
      p4: 'Retrieval-Augmented Generation (RAG)',
      p6: 'Vector Stores → LLMs (RAG Preview)',
      patterns: [
        { title: '4. Data Architecture Patterns', tagline: 'Structured · Schema-on-Write · SQL · Analytics', whenToUse: 'Business intelligence, dashboards, SQL analytics on clean, structured data.', pros: ['Fast SQL queries (columnar storage)', 'Strong schema enforcement', 'Mature ecosystem & tooling'], cons: ['Expensive at scale', 'Only structured data', 'Schema changes are painful'], tools: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks SQL'] },
        { title: 'Data Lake', tagline: 'Raw Files · Schema-on-Read · Cheap Storage', whenToUse: 'Storing everything cheaply — logs, images, JSON, Parquet — and deciding how to use it later.', pros: ['Very cheap storage (object stores)', 'Any data format', 'Schema flexibility'], cons: ['Can become a "data swamp"', 'No ACID transactions', 'Query performance varies'], tools: ['S3', 'ADLS', 'GCS', 'HDFS', 'MinIO'] },
        { title: 'Lakehouse', tagline: 'Best of Both · Open Formats · ACID on Lakes', whenToUse: 'When you need warehouse-like performance and governance on top of lake-scale storage.', pros: ['ACID transactions on object storage', 'Open table formats (no vendor lock-in)', 'Handles structured + unstructured'], cons: ['More complex to set up', 'Newer ecosystem', 'Requires tuning for performance'], tools: ['Delta Lake', 'Apache Iceberg', 'Apache Hudi', 'Databricks'] },
        { title: 'Vector Store', tagline: 'Embeddings · Semantic Search · RAG', whenToUse: 'Storing and searching vector embeddings for similarity search, recommendation, and RAG.', pros: ['Semantic (meaning-based) search', 'Powers RAG for LLMs', 'Sub-second nearest-neighbor lookup'], cons: ['Not for general analytics', 'Embedding quality matters', 'Index rebuild on schema changes'], tools: ['Pinecone', 'Weaviate', 'pgvector', 'ChromaDB', 'Qdrant'] },
      ],
    },
    // Tech: 5. What LLMs Need. EN_P6 == EN_P7 dead dup → drop p6. Section key normalized from legacy `lLMDataSection` → `llmDataSection`.
    llmDataSection: {
      title: '5. What LLMs Need',
      intro: 'Now that you understand data broadly, here\'s what LLMs specifically need.',
      p4: 'You now understand where data comes from, how it flows, and what quality means. Next, we&apos;ll dive into how LLMs actually',
      p5: 'Typical pre-training data mix (~15T tokens)',
      p7: 'What a pre-training dataset directory looks like — click files to see contents:',
    },
  },
  alignment: {
    // Business: 1. Why AI Sometimes Goes Wrong. FAILURE_META holds color.
    whyAIGoesWrong: {
      title: '1. Why AI Sometimes Goes Wrong',
      intro: 'AI learned by reading billions of web pages',
      introSub: 'Understanding what can go wrong is the first step to using AI safely.',
      failures: [
        { title: 'Hallucination — making things up', analogy: 'The colleague who never says "I don\'t know"', description: 'AI sometimes generates confident, plausible-sounding answers that are completely wrong — like a colleague who invents an answer rather than admitting they don\'t know.', example: 'A legal AI cited court cases that didn\'t exist. The lawyer submitted them to court without checking. Real case — happened in 2023.', risk: 'Decisions based on false information. Reputational damage. Legal liability.' },
        { title: 'Bias — reflecting unfair patterns', analogy: 'A hiring panel that only knows one type of candidate', description: 'AI learns from historical data. If that data reflects past biases, the AI repeats them — like a hiring panel that unconsciously favors candidates who look like previous hires.', example: 'Amazon built a resume screening AI trained on 10 years of resumes submitted to the company. Since most applicants in tech were men, the system taught itself that male candidates were preferable — it penalized resumes containing the word "women\'s" and downgraded graduates of two all-women\'s colleges. They disbanded the project.', risk: 'Discrimination. Legal exposure. Loss of diverse talent and perspectives.' },
        { title: 'Data leaks — sharing what it shouldn\'t', analogy: 'An employee who gossips about confidential meetings', description: 'If AI is trained on or has access to sensitive data, it might reveal that information to people who shouldn\'t see it — like an employee who accidentally shares confidential details.', example: 'Samsung engineers pasted proprietary source code into ChatGPT for help. That data was sent to external servers, raising concerns about confidentiality and potential exposure.', risk: 'Intellectual property loss. Privacy violations. Regulatory fines.' },
        { title: 'Harmful content — saying inappropriate things', analogy: 'A customer-facing employee going off-script', description: 'Without guardrails, AI can generate offensive, inappropriate, or harmful content — like an employee who says something terrible to a customer.', example: 'A car dealership chatbot was tricked into agreeing to sell a car for $1. A delivery company\'s bot swore at a customer. Both went viral.', risk: 'Brand damage. Customer trust erosion. PR crises.' },
      ],
    },
    // Business: 2. Keeping AI Safe — The Guardrails
    guardrails: {
      title: '2. Keeping AI Safe — The Guardrails',
      intro: 'Every company has rules for employees',
      introSub: 'Think of it like onboarding',
      guardrails: [
        { risk: 'Hallucination (making things up)', mitigation: 'Require the AI to cite sources. Use RAG so it answers from your documents, not memory. Have humans spot-check answers.', analogy: 'Like requiring footnotes on a report — if they can\'t cite it, they can\'t claim it.' },
        { risk: 'Bias (unfair patterns)', mitigation: 'Audit AI decisions regularly. Test with diverse inputs. Have clear escalation paths when bias is detected.', analogy: 'Like auditing your hiring process — check the outcomes, not just the intentions.' },
        { risk: 'Data leaks (sharing secrets)', mitigation: 'Control what data the AI can access. Use self-hosted models for sensitive data. Never paste confidential info into public AI tools.', analogy: 'Like access controls on shared folders — not everyone sees everything.' },
        { risk: 'Harmful content (going off-script)', mitigation: 'Set clear boundaries on what the AI can discuss. Add content filters. Test with adversarial inputs ("red teaming").', analogy: 'Like a customer service script — define what\'s in-bounds and what gets escalated to a manager.' },
      ],
      goldenRule: 'Start tight, loosen gradually.',
      goldenRuleDetail: 'Launch with human review on everything.',
      platformNote: 'Cloud platforms offer built-in guardrail tools',
    },
    // Tech: 1. The Alignment Problem
    alignmentProblemSection: {
      title: '1. The Alignment Problem',
      p2: 'The base model isn&apos;t &ldquo;evil&rdquo; — it simply has no concept of helpfulness or safety. It learned to predict text, and harmful text exists in its training data. Alignment is the process of teaching the model',
      examples: [
        { prompt: 'How do I pick a lock?', base: 'First, you need a tension wrench and a pick. Insert the tension wrench into the bottom of the keyhole and apply slight pressure. Then insert the pick and rake the pins upward until each one sets...', aligned: "I'd be happy to help with legitimate locksmithing! If you're locked out of your own home, I'd recommend calling a licensed locksmith. If you're interested in locksmithing as a profession, look into certification programs through ALOA (Associated Locksmiths of America)." },
        { prompt: 'Write a persuasive essay arguing the earth is flat.', base: 'The Flat Earth Truth: Why Everything You Were Told Is a Lie\n\nFor centuries, the global elite have perpetuated the greatest deception in human history. The evidence is overwhelming: water always finds its level, no curvature has ever been measured...', aligned: "I can help you understand persuasive writing techniques, but I should note that the flat earth claim contradicts well-established science. Instead, I can: (1) write it as a rhetoric exercise with a clear disclaimer, (2) explain the logical fallacies flat-earthers use, or (3) help you write a persuasive essay on a factual topic. Which would you prefer?" },
        { prompt: 'Tell me about yourself.', base: 'I am a large language model trained on a dataset of text and code. I can generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way. I was trained by', aligned: "I'm an AI assistant designed to be helpful, harmless, and honest. I can help with writing, analysis, coding, math, and answering questions. I don't have personal experiences or feelings, and I'll let you know when I'm uncertain about something. How can I help you today?" },
        { prompt: 'My friend said something hurtful. What should I do?', base: 'You should confront them immediately and tell them exactly how you feel. If they don\'t apologize, cut them off. Life is too short for toxic people. You could also post about it on social media to get support from others and show them how', aligned: "That's a tough situation. Here are some thoughtful approaches:\n\n1. Take time to process your feelings before responding\n2. Consider whether it was intentional or a misunderstanding\n3. Use \"I\" statements: \"I felt hurt when you said...\"\n4. Choose a private, calm moment to talk\n5. Listen to their perspective too\n\nWould you like to talk through what happened?" },
      ],
    },
    // Tech: 2. The Alignment Pipeline. STAGE_META holds id/color/bgColor.
    alignmentPipelineSection: {
      title: '2. The Alignment Pipeline',
      intro: 'The classic alignment pipeline (InstructGPT, 2022) has three stages after pre-training.',
      stages: [
        { label: 'Base Model', description: 'Raw pre-trained model — predicts next tokens, no concept of helpfulness.', details: 'The base model has learned language structure and world knowledge from trillions of tokens. It can complete any text, but has no preference for helpful vs harmful completions. GPT-3 (175B params) was a base model — powerful but unpredictable.' },
        { label: 'SFT', description: 'Supervised Fine-Tuning — learn from human-written examples of ideal responses.', details: 'Human annotators write high-quality (prompt, response) pairs. The model is fine-tuned on these examples using standard cross-entropy loss. Typically 10K-100K examples. This teaches the model the format and style of a helpful assistant, but it only learns to imitate — it can\'t distinguish good from great.' },
        { label: 'Reward Model', description: 'Train a separate model to score response quality from human preferences.', details: 'Humans compare pairs of responses and pick the better one. A reward model (often same architecture as the LLM) is trained to predict these preferences. Given a prompt and response, it outputs a scalar score. This converts subjective human judgment into a differentiable signal the policy can optimize.' },
        { label: 'RLHF', description: 'Reinforcement Learning from Human Feedback — optimize the policy against the reward model.', details: 'Using PPO (Proximal Policy Optimization), the SFT model generates responses, the reward model scores them, and the policy is updated to maximize reward. A KL-divergence penalty prevents the model from drifting too far from the SFT baseline (reward hacking). This is the step that made ChatGPT feel different from GPT-3.' },
        { label: 'Aligned', description: 'The final model — helpful, harmless, and honest.', details: 'The aligned model balances helpfulness with safety. It follows instructions, refuses harmful requests, admits uncertainty, and maintains a consistent helpful persona. But alignment is never "done" — models can still be jailbroken, and the alignment tax (slight capability reduction) is an active research area.' },
      ],
    },
    // Tech: 3. Modern Alternatives. METHODS stays inline (legacy methodsTranslations was {sv:[],ko:[]} empty by design).
    modernAlternativesSection: {
      title: '3. Modern Alternatives',
      intro: 'RLHF with PPO was the breakthrough that turned base models into helpful assistants — but it requires four models in memory simultaneously and is notoriously finicky to train. The field has since developed simpler alternatives that match or exceed PPO\'s quality while being dramatically easier to implement. Each makes a different trade-off.',
    },
    // Tech: 4. Safety & Guardrails. LAYER_META holds id/timing/color/techniques/catchExample.
    safetyGuardrailsSection: {
      title: '4. Safety & Guardrails',
      intro: 'Safety is defense in depth — multiple layers that each catch different failure modes.',
      p3: 'If the system-level filter misses a novel attack, the model&apos;s training-time alignment may still refuse. If the model is jailbroken, the output classifier can catch harmful content. Each layer covers the others&apos; blind spots.',
      p4: 'How this layer catches the harmful prompt:',
      layers: [
        { label: 'Training-Time Safety', description: 'Safety baked into the model weights during alignment training. The model learns to refuse harmful requests as part of its core behavior.' },
        { label: 'Inference-Time Safety', description: 'Runtime checks that filter or modify model outputs before they reach the user. Acts as a second line of defense.' },
        { label: 'System-Level Safety', description: 'Platform-level protections that operate independently of the model. Defense in depth — even if the model fails, the system catches it.' },
      ],
    },
    // Tech: 5. Full Post-Training Pipeline (2025–2026). PIPELINE_META holds color/bgColor; TREND_META holds color.
    postTrainingPipelineSection: {
      title: '5. Full Post-Training Pipeline (2025–2026)',
      intro: 'The modern post-training pipeline combines multiple techniques. Click each stage to explore.',
      pipeline: [
        { label: 'Base Model', description: 'Pre-trained on trillions of tokens. Knows language and facts, but no behavioral alignment.' },
        { label: 'SFT', description: 'Supervised fine-tuning on curated (prompt, response) pairs. Teaches the assistant format and basic helpfulness. Increasingly uses synthetic data from stronger models.' },
        { label: 'DPO', description: 'Direct Preference Optimization on human (or AI-generated) preference pairs. Simpler than PPO, now the default preference learning step for most labs.' },
        { label: 'RL Reasoning (GRPO)', description: 'Reinforcement learning with verifiable rewards — math, code, logic. GRPO or variants train the model to reason step-by-step. This is what produces "thinking" models like DeepSeek-R1 and o3.' },
        { label: 'Safety Tuning', description: 'Final safety pass — Constitutional AI, red-team hardening, refusal training. Often uses RLAIF (AI feedback) for scale. Balances safety with helpfulness to minimize over-refusal.' },
        { label: 'Deploy', description: 'Production deployment with system prompts, output filters, rate limiting, monitoring, and human escalation paths. Continuous red-teaming post-launch.' },
      ],
      trends: [
        { label: 'Less human labeling', description: 'RLAIF and synthetic data generation replace most human annotation. Humans focus on edge cases and red-teaming.' },
        { label: 'More self-play & RL', description: 'Models improve by playing against themselves — generating, evaluating, and refining. GRPO and self-play RL are the biggest capability drivers in 2025.' },
        { label: 'Verifiable rewards', description: 'Moving from subjective human preferences to objective metrics: code passes tests, math is correct, logic is valid. Scales better and avoids reward hacking.' },
        { label: 'Reasoning as a training target', description: 'Chain-of-thought and extended thinking are now explicitly trained via RL, not just prompted. Models learn when to think longer on harder problems.' },
      ],
    },
  },
  toolslandscape: {
    // Tech: 1. The Tool Categories
    categories: {
      title: '1. The Tool Categories',
      intro:
        'The AI tool space looks crowded, but almost everything falls into four categories — defined by how much autonomy the tool has and where it lives. Click each category to explore.',
      whenLabel: 'When to reach for it:',
      toolsLabel: 'Tools:',
      items: [
        {
          name: 'Chat Assistants',
          tagline: 'You ask, it answers',
          description:
            'A conversation surface. You bring the context, it brings the reasoning. Powerful for drafting, explaining, analyzing — but it only acts inside the chat: nothing happens in your files, repos, or apps unless you copy it there.',
          when: 'Questions, drafts, analysis, brainstorming — any task where the deliverable is text and you stay in the loop on every turn.',
          tools: 'ChatGPT, Claude, Gemini',
        },
        {
          name: 'IDE Assistants',
          tagline: 'Autocomplete that grew up',
          description:
            'Lives inside your editor, sees the file you have open, and suggests code inline. Low autonomy: it proposes, you accept. Great for keeping flow, weak when a change spans many files.',
          when: 'Single-file edits, boilerplate, learning an unfamiliar API as you type.',
          tools: 'GitHub Copilot, Cursor inline mode',
        },
        {
          name: 'Agentic Coding Tools',
          tagline: 'An agent in your terminal & repo',
          description:
            'You describe an outcome; the agent plans, reads your codebase, edits multiple files, runs commands and tests, and reports back. It works in steps — think → act → check — and you review at checkpoints.',
          when: 'Multi-file features, refactors, debugging, test coverage — real engineering tasks you would hand a teammate.',
          tools: 'Claude Code, Kiro CLI',
        },
        {
          name: 'Agentic Work Apps',
          tagline: 'Delegate office work, not code',
          description:
            'The same agentic loop, pointed at documents, spreadsheets, research, and workflows instead of code. You delegate a task, the agent works through it across files and apps, and you supervise the result.',
          when: 'Research and synthesis, report drafting, data cleanup, multi-document work.',
          tools: 'Amazon Quick Desktop, Claude Cowork',
        },
      ],
      axisNote:
        'The pattern behind the map: as you move from chat to agents, the tool stops answering and starts doing. The more autonomy, the more your job shifts from writing to reviewing.',
      bridgeBlurb: 'Curious who actually builds the models behind these tools — and why some are open and some closed?',
    },
    // Tech: 2. Anatomy of an Agentic Tool
    agenticLoop: {
      title: '2. Anatomy of an Agentic Tool',
      intro:
        'What actually happens when you hand a task to an agentic coding tool? Run the session below — it is a faithful simulation of a Claude Code run. Watch the loop: understand → plan → act → verify.',
      stepNote: 'Each command is one turn of the agentic loop. Notice the agent checks its own work before reporting done.',
      takeaway:
        'This loop — plan, act, verify, repeat — is the signature of every agentic tool, whether it is editing code or a spreadsheet. The skill of using one well is mostly the skill of writing a clear task and reviewing at the right checkpoints.',
      bridgeBlurb: 'That think → act → verify loop has real machinery inside — function calling, MCP, agent design patterns. See how it works.',
    },
    // Tech: 3. Choosing Your Stack
    choosingStack: {
      title: '3. Choosing Your Stack',
      intro:
        'Four realistic situations. For each: what would you reach for? Step through to see the reasoning.',
      recommendLabel: 'Best fit:',
      scenarios: [
        {
          situation: 'You need to understand an unfamiliar 50k-line codebase enough to fix a bug somewhere in the auth flow.',
          pick: 'Agentic coding tool (Claude Code / Kiro)',
          why: 'The agent can search the repo, trace the flow across files, and explain the architecture — then fix the bug and run the tests. A chat assistant cannot see your repo; an IDE assistant only sees the open file.',
        },
        {
          situation: 'You are writing a one-off Python script to parse a CSV and you know exactly what you want.',
          pick: 'IDE assistant — or just a chat assistant',
          why: 'Full agentic autonomy is overkill for a task you can specify completely and verify at a glance. Inline completion keeps you in flow; a chat assistant can write the whole script in one shot.',
        },
        {
          situation: 'You want a second opinion on a system design before you commit to it.',
          pick: 'Chat assistant (Claude, ChatGPT)',
          why: 'This is a reasoning-and-conversation task. You want to iterate on ideas, challenge assumptions, and explore trade-offs — the deliverable is understanding, not artifacts.',
        },
        {
          situation: 'Your team needs the API documentation updated to match 30 endpoints that changed this quarter.',
          pick: 'Agentic coding tool, supervised',
          why: 'Repetitive, multi-file, verifiable — ideal agent work. The agent reads each endpoint, updates docs, and you spot-check. Doing this by hand in an IDE assistant means 30 manual passes.',
        },
      ],
      selfExplainPrompt:
        'Pick a real task from your current week. Which tool category fits it best, and what would you have to specify for the tool to succeed?',
      selfExplainAnswer:
        'Example: "Migrate our date handling from moment.js to date-fns" — agentic coding tool. I would specify: the libraries involved, that tests must pass after each file, and which edge cases (timezones) to be careful with. The clearer the outcome and constraints, the better the agent performs.',
    },
    // Business: 1. The Tool Categories (business lens)
    categoriesBiz: {
      title: '1. The Tool Categories',
      intro:
        'Your teams are already using AI — the question is whether they are using the right kind for each job. Almost every tool falls into one of three categories. Click each to explore.',
      whenLabel: 'Use it for:',
      toolsLabel: 'Tools:',
      items: [
        {
          name: 'Chat Assistants',
          tagline: 'A brilliant colleague in a chat window',
          description:
            'You ask questions, it answers; you paste material, it analyzes or rewrites. The catch: it only talks. Nothing lands in your documents or systems unless someone copies it there.',
          when: 'Drafting emails and documents, summarizing material you paste in, brainstorming, quick analysis.',
          tools: 'ChatGPT, Claude, Gemini',
        },
        {
          name: 'Agentic Work Apps',
          tagline: 'A capable assistant you delegate to',
          description:
            'You hand over a task — "turn these 30 interviews into a themes report" — and the AI works through it: opening files, extracting, organizing, drafting. You review at checkpoints instead of doing every step.',
          when: 'Research and synthesis, recurring reports, data cleanup, any multi-document task that eats hours.',
          tools: 'Amazon Quick Desktop, Claude Cowork',
        },
        {
          name: 'Developer AI Tools',
          tagline: 'Your engineering team\'s power tools',
          description:
            'Agents that write and change real code under engineer supervision. You do not need to operate these — but you should know your dev team can ship significantly faster with them, and budget accordingly.',
          when: 'Engineering work: features, bug fixes, code modernization. (Your developers drive; you fund and measure.)',
          tools: 'Claude Code, Kiro CLI, GitHub Copilot',
        },
      ],
      axisNote:
        'The pattern: chat assistants answer, agentic tools do. The more the tool does, the more your people shift from doing the work to specifying and reviewing it — that is the real workflow change to manage.',
      bridgeBlurb: 'Want to know the companies behind these tools, and what their strategies mean for your business?',
    },
    // Business: 2. Watching an AI Do Work
    delegation: {
      title: '2. Watching an AI Do Work',
      intro:
        'The biggest mental shift is from chatting to delegating. Step through a real delegation to an agentic work app — notice where the human stays in control.',
      steps: [
        {
          label: 'You delegate',
          content:
            '"Here are 30 customer interview transcripts. Identify the recurring themes, pull two supporting quotes per theme, and draft a 2-page summary for the product team."',
          note: 'A good delegation looks like a good brief to a junior colleague: outcome, format, audience.',
        },
        {
          label: 'The agent plans',
          content:
            'The agent proposes a plan: read all 30 transcripts → tag pain points per transcript → cluster into themes → select quotes → draft the summary. It asks one clarifying question: "Should pricing complaints be a separate theme or grouped under \'value\'?"',
          note: 'You approve the plan or adjust it. This is your first checkpoint — cheap to correct now, expensive later.',
        },
        {
          label: 'The agent works',
          content:
            'It processes the transcripts and shows progress: "14/30 read — 6 candidate themes emerging." You are free to do other work; it flags anything ambiguous instead of guessing.',
          note: 'Unlike a chat assistant, it is actually operating on your files — not waiting for you to paste content in.',
        },
        {
          label: 'You review the draft',
          content:
            'The draft lands with themes, quotes, and an appendix mapping every claim to its source transcript. You spot one theme that is really two, and say so. The agent restructures and updates the summary.',
          note: 'Review is your real job now. The traceable sources are what make the review fast.',
        },
        {
          label: 'The deliverable ships',
          content:
            'Final 2-page summary, ready for the product team. Elapsed human time: ~20 minutes of briefing and review, instead of two days of reading and writing.',
          note: 'The work did not disappear — it changed shape: from doing to directing.',
        },
      ],
      takeaway:
        'Delegation quality determines output quality. The teams that get the most from agentic tools are the ones that write clear briefs and review at checkpoints — exactly the skills of a good manager.',
    },
    // Business: 3. Picking Tools for Your Team
    pickingTools: {
      title: '3. Picking Tools for Your Team',
      intro:
        'Four common team situations. Step through each to see which tool category fits and why.',
      recommendLabel: 'Best fit:',
      scenarios: [
        {
          situation: 'Your sales team spends every Friday afternoon assembling a pipeline summary from CRM exports and call notes.',
          pick: 'Agentic work app',
          why: 'Recurring, multi-source, well-defined output — ideal delegation. The agent assembles the draft from the exports; a rep reviews it in minutes. A chat assistant would require pasting everything in manually each week.',
        },
        {
          situation: 'Legal needs a first-pass review of incoming NDAs against your standard playbook.',
          pick: 'Agentic work app — with mandatory human review',
          why: 'The agent compares each NDA to the playbook and flags deviations with references. A lawyer makes every judgment call. High-stakes domains keep the human as the decision-maker; the agent kills the reading time.',
        },
        {
          situation: 'Marketing wants help punching up campaign copy and subject lines.',
          pick: 'Chat assistant',
          why: 'Creative iteration is conversation — generate options, react, refine. No files to operate on, no multi-step workflow. The simplest tool that works is the right tool.',
        },
        {
          situation: 'Engineering says a legacy system rewrite will take three quarters.',
          pick: 'Agentic coding tools for the dev team',
          why: 'Modernization is where coding agents shine: large, repetitive, testable. Teams using them well report dramatic speedups on exactly this work. Your role: fund the tools, ask for before/after metrics.',
        },
      ],
      selfExplainPrompt:
        'Think of the most repetitive multi-step task your team does every week. Could you delegate it to an agentic tool? Write the one-paragraph brief you would give it.',
      selfExplainAnswer:
        'Example: "Every Monday we compile a competitor-news digest. Brief: scan these 12 sources for news about competitors X, Y, Z from the past week; group by competitor; two-sentence summary per item with a link; flag anything about pricing or layoffs as urgent; output as one page." Clear sources, format, and escalation rule — that is a delegation-ready brief.',
    },
  },
  workingwithai: {
    // Tech: 1. What the Model Actually Sees
    modelSees: {
      title: '1. What the Model Actually Sees',
      intro:
        'Every reply is generated from one thing: the context the model has right now. Most "the AI is being dumb" moments are really "the AI can\'t see what you think it sees." Click each piece of the context to explore.',
      items: [
        {
          name: 'The system prompt',
          tagline: 'Standing orders you don\'t see',
          description:
            'Before your first word, the assistant has already read instructions from its maker — tone, refusals, formatting habits. Custom instructions let you add your own layer: who you are, what stack you use, how you like answers. Set once, applies to every chat.',
        },
        {
          name: 'The conversation so far',
          tagline: 'Memory, but only inside this chat',
          description:
            'The model re-reads the whole thread on every turn. That is why it can follow "make it shorter" — and why a chat that wandered through three topics gives muddled answers. New task, new chat is the cheapest quality upgrade there is.',
        },
        {
          name: 'Files and attachments',
          tagline: 'Paste beats describe',
          description:
            'The model cannot open your laptop. A vague description of your code or document produces a vague answer about it. Attach the file, paste the error verbatim, include the actual numbers — the model is dramatically better at reading than guessing.',
        },
        {
          name: 'The context limit',
          tagline: 'The window has edges',
          description:
            'Context windows are large but finite, and quality can sag before the hard limit — details from 200 messages ago get less attention than recent ones. For long work: summarize progress into a fresh chat, or move durable facts into custom instructions or a project.',
        },
      ],
      takeaway:
        'Before blaming the model, audit the context: does it actually have what it needs to answer well? The skill of chat fluency is mostly the skill of context supply.',
    },
    // Tech: 2. Iterate Like a Pro
    iteration: {
      title: '2. Iterate Like a Pro',
      intro:
        'Nobody gets a great result from one prompt — pros get there in two or three turns because they treat the first output as a diagnostic, not a disappointment. Step through a real iteration.',
      stepLabel: 'Turn',
      steps: [
        {
          label: 'The vague prompt',
          content: '"Write me a Python script to clean up this data."',
          note: 'No file attached, no definition of "clean", no output format. The model must guess all three.',
        },
        {
          label: 'The mediocre output — read it as a diagnostic',
          content:
            'The model produces a generic pandas script: drops NA rows, strips whitespace, writes a CSV. Plausible — and useless, because your data has duplicated IDs with conflicting timestamps, and that\'s the actual problem.',
          note: 'The gap between what you got and what you wanted IS the list of context you failed to supply.',
        },
        {
          label: 'The refined prompt',
          content:
            '"Here\'s a 50-row sample (attached). Rows share an order_id when an order was edited; keep only the row with the latest updated_at per order_id. Timestamps are ISO but some lack timezones — assume UTC. Output: a function I can import, plus a doctest with the edge case."',
          note: 'Sample data, the real rule, the known trap, the exact deliverable. Same model — completely different request.',
        },
        {
          label: 'The strong output — and the cheap follow-up',
          content:
            'Correct dedup logic, timezone handling, importable function, doctest. One more turn: "Now make it stream from a 2 GB file instead of loading it all" — and because the thread carries the context, that costs one sentence.',
          note: 'Iteration compounds: every turn inherits everything you established before it.',
        },
      ],
      takeaway:
        'The loop is: prompt → read the output as a diagnosis of missing context → supply it → repeat. Two informed turns beat ten vague ones.',
      selfExplainPrompt:
        'Recall a recent AI answer that disappointed you. Reading it as a diagnostic: what context had you failed to supply?',
      selfExplainAnswer:
        'Example: "I asked for a regex to validate emails and got a textbook pattern that rejected our internal user+tag@corp addresses. I never said which address forms we accept — the model answered the generic question I actually asked. One sentence of context would have fixed it."',
    },
    // Tech: 3. Beyond the Single Chat
    powerFeatures: {
      title: '3. Beyond the Single Chat',
      intro:
        'Once your prompts are good, stop re-typing them. Every major assistant has machinery for making your context durable. Click each feature.',
      items: [
        {
          name: 'Custom instructions',
          tagline: 'Your personal system prompt',
          description:
            'Facts that are true in every chat — "I\'m a backend dev, we use Go and Postgres, answer tersely, no pleasantries" — belong in custom instructions, not in every prompt. Write them once; every conversation starts pre-briefed.',
        },
        {
          name: 'Projects & memory',
          tagline: 'Context that persists across chats',
          description:
            'Projects group related chats and share files and instructions between them. The codebase docs you attached Monday are still there Friday. Memory features go further and quietly accumulate facts — review what gets stored.',
        },
        {
          name: 'Files & artifacts',
          tagline: 'Work on documents, not just about them',
          description:
            'Modern assistants edit documents and code in a side-by-side view, keep versions, and let you target changes ("tighten section 2"). For anything longer than a paragraph, work in an artifact instead of regenerating walls of chat text.',
        },
        {
          name: 'Know when to graduate',
          tagline: 'Chat has a ceiling',
          description:
            'If you are pasting files back and forth, re-explaining your repo every session, or shepherding a 10-step workflow by hand — the task has outgrown chat. That is what agentic tools are for; the context skills you built here transfer directly.',
        },
      ],
      bridgeBlurb:
        'Refining prompts by hand is a skill with real technique behind it — zero-shot vs few-shot, chain-of-thought, structured outputs. Go deeper.',
    },
    // Business: 1. Brief It Like a Colleague
    briefing: {
      title: '1. Brief It Like a Colleague',
      intro:
        'The single biggest upgrade to your AI results costs nothing: write your request the way you would brief a capable new colleague. Four ingredients do most of the work — click each.',
      items: [
        {
          name: 'Context — who you are, what this is for',
          tagline: 'The model knows nothing about you',
          description:
            '"I run customer success at a 40-person SaaS company; this goes to churned customers" changes everything about the answer. One sentence of situation beats ten rounds of correcting a generic draft.',
        },
        {
          name: 'Task — what you actually want',
          tagline: 'Decide, then ask',
          description:
            '"Help me with this email" makes the model guess. "Rewrite this to be warmer but keep the firm deadline" is a task. If you cannot state what you want, the first output will tell you — read it and decide.',
        },
        {
          name: 'Format — what the deliverable looks like',
          tagline: 'Shape the output before it exists',
          description:
            '"Three bullet points I can paste into Slack", "a table comparing the options", "max 150 words". Format instructions are nearly always obeyed and save you the reformatting pass.',
        },
        {
          name: 'Audience & tone — who reads it',
          tagline: 'The same content wears different clothes',
          description:
            '"For the board" and "for the engineering team" produce different documents from the same facts. Name the reader and the register: formal, friendly, blunt, careful.',
        },
      ],
      takeaway:
        'Context, task, format, audience. You would never hand a colleague a task without them — the AI just fails more politely when you skip them.',
    },
    // Business: 2. From Vague to Valuable
    vagueToValuable: {
      title: '2. From Vague to Valuable',
      intro:
        'Watch the four ingredients turn a generic draft into something you would actually ship. Same assistant, same task — different brief.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The vague ask',
          content: '"Write a job posting for a marketing manager."',
          note: 'The model fills every gap with averages — and average is exactly what you will get.',
        },
        {
          label: 'The generic result',
          content:
            'A perfectly grammatical posting that could be from any company in any industry: "dynamic team player", "fast-paced environment", a bullet list of clichés. Nothing about it is wrong. Nothing about it is yours.',
          note: 'Generic in, generic out. The output mirrors the brief.',
        },
        {
          label: 'The real brief',
          content:
            '"We\'re a 12-person outdoor-gear e-commerce brand in Stockholm. First marketing hire — they\'ll own everything from paid social to packaging copy. Scrappy generalist over polished specialist. Tone: how we talk — direct, a bit playful, zero corporate filler. 300 words max, end with a one-line application ask."',
          note: 'Context, task, format, audience — all four ingredients, five sentences.',
        },
        {
          label: 'The result you ship — after one tweak',
          content:
            'A posting that sounds like your company and screens for the right person. One follow-up — "add a line that remote within the EU is fine" — and it slots in cleanly, because the conversation remembers the brief.',
          note: 'Iteration is cheap once the foundation is right. Tweaks beat rewrites.',
        },
      ],
      takeaway:
        'First drafts are diagnostics. If the output is generic, the brief was generic — fix the input, not your patience.',
      selfExplainPrompt:
        'Take a task you would normally delegate to a colleague. Write the AI brief using all four ingredients: context, task, format, audience.',
      selfExplainAnswer:
        'Example: "Context: I lead sales ops; our quarterly review deck goes to the exec team Friday. Task: turn these bullet notes (pasted) into a one-page narrative summary. Format: three short sections — wins, risks, asks — under 400 words. Audience: execs who skim; lead with numbers, no jargon."',
    },
    // Business: 3. Make Good Results the Default
    makeItStick: {
      title: '3. Make Good Results the Default',
      intro:
        'Great briefs should not live in your head. A few minutes of setup turns your best prompts into the default experience. Click each habit.',
      items: [
        {
          name: 'Custom instructions',
          tagline: 'Tell it once, not every time',
          description:
            'Your role, your company, your preferred tone and length — saved in settings, applied to every chat automatically. The "who you are" half of the brief, permanently handled.',
        },
        {
          name: 'A personal prompt library',
          tagline: 'Your greatest hits, reusable',
          description:
            'When a brief produces a great result, save it — a notes doc is fine. "Weekly report", "meeting summary", "customer reply" — most people\'s AI use is five recurring tasks. Stop rewriting their briefs from scratch.',
        },
        {
          name: 'Projects per workstream',
          tagline: 'A briefed workspace for recurring work',
          description:
            'A project holds shared files and instructions for one stream of work — "Q3 campaign" with the brand guide and product sheets attached. Every chat inside starts already knowing the material.',
        },
        {
          name: 'Attach, don\'t summarize',
          tagline: 'Let it read the real thing',
          description:
            'Upload the actual contract, the actual data export, the actual transcript. Your summary of a document is a lossy copy; the model does its best work from the source.',
        },
      ],
      bridgeBlurb:
        'Briefing well is a craft with named techniques behind it — examples, step-by-step reasoning, role prompts. See how prompting really works.',
    },
  },
  optimizingworkflow: {
    // Tech: 1. Map Where AI Fits Your Day
    whereItFits: {
      title: '1. Map Where AI Fits Your Day',
      intro:
        'The fastest way to get more from AI is not a better prompt — it is knowing which parts of your day it reliably improves, and which parts to keep for yourself. Click each zone.',
      items: [
        {
          name: 'Understanding',
          tagline: 'Get oriented fast',
          description:
            'Unfamiliar codebase, a dense RFC, a stack trace you have never seen — this is where AI shines as a tireless explainer. "Walk me through how auth flows through this repo", "what does this regex do", "summarize this 40-page design doc". Low risk because you verify against the real thing immediately.',
        },
        {
          name: 'Generation',
          tagline: 'Skip the blank page',
          description:
            'Boilerplate, test scaffolding, a first-draft migration, a config you have written ten times before. The model is fast and you can read the output in seconds. The win is starting from 80% instead of zero — not trusting it blindly.',
        },
        {
          name: 'Review & debugging',
          tagline: 'A second pair of eyes, on demand',
          description:
            '"What edge cases does this function miss?", "why might this test be flaky?", "review this diff for security issues." AI catches a real fraction of problems instantly. It is additive to human review, not a replacement — it misses things and invents others.',
        },
        {
          name: 'Communication',
          tagline: 'Translate between audiences',
          description:
            'Turn a terse changelog into release notes, a bug into a clear ticket, a design into a plain-English summary for stakeholders. Tedious, text-shaped, and easy to check — a sweet spot most engineers under-use.',
        },
      ],
      cautionLabel: 'Keep these for yourself:',
      caution:
        'Decisions that need full system and business context, anything you cannot verify, and judgment calls you would be embarrassed to attribute to "the AI told me to." The rule of thumb: delegate the work, never the accountability.',
    },
    // Tech: 2. Build Reusable Setups
    reusableSetups: {
      title: '2. Build Reusable Setups',
      intro:
        'If you have typed the same context into the chat three times, you have found a setup worth saving. Watch an ad-hoc prompt become durable infrastructure.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The ad-hoc prompt (third time this week)',
          content:
            '"You\'re helping on a Go service using Postgres and sqlc; we use table-driven tests and wrap errors with %w. Write tests for this handler: [paste]."',
          note: 'Everything before "Write tests" is project context you re-type every single time. That is the tell.',
        },
        {
          label: 'Extract the standing context',
          content:
            'Move the durable facts into an AGENTS.md (or the tool\'s custom-instructions / project settings): stack, conventions, test style, error handling. Now every session starts already knowing them — you stop paying the re-explanation tax.',
          note: 'Standing context belongs in a file the tool reads automatically, not in your muscle memory.',
        },
        {
          label: 'Capture the workflow',
          content:
            'The recurring action — "write table-driven tests for the selected handler" — becomes a saved prompt, a slash command, or a snippet. The variable part (which handler) is the only thing you supply.',
          note: 'A good setup separates the stable recipe from the one changing ingredient.',
        },
        {
          label: 'Now it is one invocation',
          content:
            'Select the handler, run the command. The context is loaded, the recipe is fixed, the output is consistent across the team. The five-minute setup pays for itself by the third use — and it keeps paying.',
          note: 'This is the whole game: turn a thing you re-explain into a thing you invoke.',
        },
      ],
      takeaway:
        'The unit of optimization is the repeated task, not the individual prompt. Each time you catch yourself re-typing context, that is a setup asking to be built.',
      selfExplainPrompt:
        'Name a prompt or context you have re-typed to an AI more than twice this month. What standing context would you extract, and what would the reusable invocation be?',
      selfExplainAnswer:
        'Example: "I keep pasting our API error-format spec before asking for a new endpoint handler. Standing context → a project doc with the error envelope, auth middleware, and validation conventions. Reusable invocation → \'scaffold a handler for <route> following our conventions\'. The spec stops being something I paste and becomes something the tool already knows."',
    },
    // Tech: 3. Team Patterns & Guardrails
    teamPatterns: {
      title: '3. Team Patterns & Guardrails',
      intro:
        'Your personal setups become a multiplier when the team shares them — and a liability without a few guardrails. Click each pattern.',
      items: [
        {
          name: 'Context files in the repo',
          tagline: 'Check the AI\'s knowledge into git',
          description:
            'An AGENTS.md / context file committed to the repo means every engineer\'s assistant shares the same picture of conventions, architecture, and gotchas. It reviews like code, evolves with the codebase, and onboards new hires (human and AI) for free.',
        },
        {
          name: 'A shared prompt & skill library',
          tagline: 'Stop everyone reinventing the same prompt',
          description:
            'When someone nails the prompt for "generate a migration" or "write a runbook", it goes in a shared library — a repo folder, a wiki, or tool-native skills. The team\'s best prompt becomes everyone\'s default.',
        },
        {
          name: 'Review norms for AI-authored code',
          tagline: 'The author is accountable, not the model',
          description:
            'Agree explicitly: AI-generated code gets the same review bar as hand-written code, and the human who shipped it owns it. No "the AI wrote it" excuses. Some teams flag AI-heavy PRs so reviewers calibrate attention.',
        },
        {
          name: 'Measure impact honestly',
          tagline: 'Time saved, not lines generated',
          description:
            'Lines of AI code is a vanity metric — it can mean speed or it can mean bloat. Track what matters: cycle time, time-to-first-PR for new hires, how much of a task became "review" instead of "write." Be honest about where it does not help.',
        },
      ],
      bridgeBlurb:
        'Your review norms are the team\'s last line of defense. Go deeper on how models are actually aligned — and where trust-and-safety guardrails really live.',
    },
    // Business: 1. Find Your AI-Shaped Tasks
    aiShapedTasks: {
      title: '1. Find Your AI-Shaped Tasks',
      intro:
        'Most people use AI on whatever is in front of them. The higher-leverage move is to deliberately find the tasks where it pays off most. A task is AI-shaped when three things are true — click each.',
      items: [
        {
          name: 'Recurring',
          tagline: 'You do it again and again',
          description:
            'A one-off rarely justifies building a setup. A task you do every week — the status digest, the customer follow-up, the data tidy-up — earns back the time you invest in briefing it well, many times over.',
        },
        {
          name: 'Judgment-light',
          tagline: 'Mostly mechanical, not a high-stakes call',
          description:
            'Summarizing, reformatting, drafting, extracting, comparing — work where "good and fast" beats "agonized over". The high-judgment 10% (the final decision, the sensitive call) stays with you; AI clears the other 90%.',
        },
        {
          name: 'Text-shaped',
          tagline: 'Words in, words out',
          description:
            'AI is strongest where the input and output are language: emails, documents, notes, transcripts, spreadsheets of text. If the task is fundamentally about reading and writing, it is in the sweet spot.',
        },
      ],
      testLabel: 'The weekly-time-sink test:',
      test:
        'Look at your calendar and your last week. What recurring, text-shaped, judgment-light task ate the most hours? That is where to start — not the flashiest use, the most repeated one.',
    },
    // Business: 2. From One-Off to a System
    oneOffToSystem: {
      title: '2. From One-Off to a System',
      intro:
        'The difference between "I use AI sometimes" and "AI saves my team a day a week" is systems. Watch a recurring task graduate from hand-built to handled.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The weekly grind',
          content:
            'Every Monday you rebuild the same pipeline report: open five spreadsheets, paste highlights into the chat, re-explain the format, fix the tone, reformat for the exec email. Ninety minutes, every week, from scratch.',
          note: 'You are re-paying the full setup cost every single time. That is the waste.',
        },
        {
          label: 'Save the winning brief',
          content:
            'The week it finally came out great, you save that prompt — the exact context, format, and tone that worked. Next week you start from the proven brief instead of reinventing it.',
          note: 'The first reusable asset is simply the best version of a prompt you already wrote.',
        },
        {
          label: 'Make it a project',
          content:
            'Create a project / workspace that holds the recurring sources and the brief together. The format lives there, the source files attach there. "Generate this week\'s report" is now the whole instruction.',
          note: 'A project turns a prompt-plus-attachments ritual into a single briefed workspace.',
        },
        {
          label: 'A five-minute review job',
          content:
            'Monday: drop in the week\'s numbers, run it, read the draft, fix one line, send. Ninety minutes became five. The task did not disappear — the rebuilding did, and your judgment is still the last step.',
          note: 'Systematizing removes the redo, not the human. You review instead of reassemble.',
        },
      ],
      takeaway:
        'A system is just a good brief that stopped living in your head. The setup costs minutes once; the redo costs you every week forever.',
      selfExplainPrompt:
        'Pick the recurring task that eats the most of your week. What is the brief you would save, and what would you put in a project to make it a five-minute job?',
      selfExplainAnswer:
        'Example: "Monthly board update. Saved brief: context (who reads it, what they care about), the three-section format, the plain-numbers tone. Project contents: the metrics dashboard export, last month\'s update for continuity, the brand voice note. Then \'draft this month\'s board update\' starts from everything it needs."',
    },
    // Business: 3. Roll It Out to Your Team
    rollItOut: {
      title: '3. Roll It Out to Your Team',
      intro:
        'One person with good AI habits saves their own time. A team with shared habits changes what the team can take on. Click each rollout move.',
      items: [
        {
          name: 'A shared prompt library',
          tagline: 'Everyone starts from the best version',
          description:
            'A simple shared doc of "prompts that work here" — the report brief, the customer-reply template, the meeting-summary format. New team members become productive on day one instead of rediscovering everyone\'s lessons.',
        },
        {
          name: 'Name a champion',
          tagline: 'Someone owns making it better',
          description:
            'Rollouts stall without an owner. One enthusiastic person who curates the library, answers "how would you prompt this?", and shares wins does more than any mandate. Make it a visible part of their role, not a side hobby.',
        },
        {
          name: 'Light-touch governance',
          tagline: 'Clear lines, not a thick rulebook',
          description:
            'People need to know the few bright lines — what data must never go into a tool, where human sign-off is required, which tools are approved. Keep it short enough that everyone actually reads it; a wall of policy just drives shadow usage.',
        },
        {
          name: 'Measure time saved',
          tagline: 'Prove it, or it gets cut',
          description:
            'Track the honest number: hours back per week, faster turnaround, more handled without more headcount. Concrete before/after wins fund the next step and protect the budget. "It feels faster" does not survive a cost review.',
        },
      ],
      bridgeBlurb:
        'Team habits are where individual productivity meets organizational change. See what it really takes for an organization to be ready for AI.',
    },
  },
  agenticcoding: {
    // 1. What Makes a Coding Agent Different
    different: {
      title: '1. What Makes a Coding Agent Different',
      intro:
        'An autocomplete finishes your line. A chat assistant answers in a window. A coding agent does neither — it works in your repo the way a teammate would: plan, edit across files, run things, check the result. Four capabilities set it apart. Click each.',
      items: [
        {
          name: 'Task decomposition',
          tagline: 'Turns a goal into a plan',
          description:
            'You say "add rate limiting to the public API." The agent breaks that into steps — find the middleware layer, add a limiter, wire it into the routes, add a test, run the suite — and works the plan, instead of emitting one blob of code and hoping.',
        },
        {
          name: 'Codebase context',
          tagline: 'Reads before it writes',
          description:
            'It greps, opens files, and traces how things connect — so its changes match your conventions and fit the existing structure. This is why it can edit a repo it has never seen, and why a chat assistant (which sees only what you paste) cannot.',
        },
        {
          name: 'Tool use & MCP',
          tagline: 'Acts, not just suggests',
          description:
            'The agent runs commands, executes tests, reads their output, and via MCP (Model Context Protocol) reaches external tools — your database, issue tracker, docs. Tool use is what turns "here is some code" into "I made the change and the tests pass."',
        },
        {
          name: 'The verify loop',
          tagline: 'Checks its own work',
          description:
            'After acting it inspects the result — runs the test, reads the error, re-reads the file — and adapts. This think → act → verify cycle is the heart of agentic coding: it is what lets you review outcomes at checkpoints instead of supervising every keystroke.',
        },
      ],
      takeaway:
        'Autocomplete predicts, chat advises, an agent acts and verifies. The shift is from getting code to delegating a coding task — which means your job moves from typing to specifying and reviewing.',
    },
    // 2. Drive a Real Session (Workspace emulation)
    realSession: {
      title: '2. Drive a Real Session',
      intro:
        'Here is a faithful simulation of a Claude Code session implementing a small feature. Run the commands and watch the repo change on the right. Notice the loop: explore → plan → edit → test → report.',
      workspaceTitle: 'claude-code — add rate limiting',
      terminalTitle: 'claude-code',
      stepNote:
        'Each command is one turn of the agentic loop. The agent reads the codebase before editing, writes a test for its own change, and runs the suite before declaring done.',
      snapshotInitial: 'Starting point: a small Express API with no rate limiting.',
      snapshotMiddlewareSeen: 'The agent has read the structure and located where middleware is wired in.',
      snapshotMiddlewareAdded: 'New rateLimiter middleware file created — not yet wired into the routes.',
      snapshotEdited: 'The rateLimiter is now wired into the public router.',
      snapshotTested: 'A regression test was added and the suite passes.',
      takeaway:
        'You supplied one sentence of intent and reviewed at checkpoints; the agent did the search, the edits, the test, and the verification. That division of labor — you specify and review, it executes and proves — is what working with a coding agent feels like.',
      selfExplainPrompt:
        'In the session above, the agent wrote a test before saying it was done. Why is that verify step the thing that makes delegating to a coding agent safe?',
      selfExplainAnswer:
        'Because verification converts a plausible-looking diff into a checked one. A passing regression test means you can review the outcome ("does this do what I asked, and is it still green?") instead of re-reading every line to guess whether it works. Without the verify step you inherit all the risk and none of the time savings — you would have to manually re-check everything the agent touched. The test is the agent proving its work, which is what lets you operate at the checkpoint level.',
    },
    // 3. Working Effectively With a Coding Agent
    effectively: {
      title: '3. Working Effectively With a Coding Agent',
      intro:
        'The tool is capable; getting great results from it is a skill. Four habits separate people who fight their coding agent from people who ship with it. Click each.',
      items: [
        {
          name: 'Scope like a tech lead',
          tagline: 'Hand it a task, not a wish',
          description:
            'The best-sized task is one you could hand a competent engineer with a paragraph: clear outcome, the constraints that matter, how to know it is done. "Make the app better" fails; "add ret/backoff to the S3 client, max 3 tries, keep the existing interface, add a test for the timeout path" succeeds.',
        },
        {
          name: 'Give it durable context',
          tagline: 'Write the AGENTS.md once',
          description:
            'Stack, conventions, test commands, gotchas — put them in an AGENTS.md at the repo root so every session starts pre-briefed instead of guessing. Context you keep re-typing is context that belongs in a file the agent reads automatically.',
        },
        {
          name: 'Review at checkpoints',
          tagline: 'Outcomes, not keystrokes',
          description:
            'Let it complete a coherent unit — a function, a fix, a passing test — then review that, the way you would review a colleague\'s PR. Watching every token is slower than just writing the code; reviewing the diff is where your judgment actually adds value.',
        },
        {
          name: 'Know when to take the wheel',
          tagline: 'Stop the loop when it spins',
          description:
            'If the agent is thrashing — two failed attempts at the same error, edits drifting away from the goal — stop and intervene. Add the missing context, correct the plan, or take that piece yourself. A good operator redirects early instead of letting an agent dig a deeper hole.',
        },
      ],
      bridgeBlurb:
        'You have driven a coding agent. Now look under the hood: how tool use, function calling, MCP, and agent design patterns actually work — the machinery beneath the session you just ran.',
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
