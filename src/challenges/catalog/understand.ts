// Challenges for the "Understand AI" course. prompt-rubric only.
//
// Authoring notes:
// - Structure heuristics are fuzzy, so passThreshold is kept at 0.65-0.75 and
//   the hard requirements (regex/contains) carry extra weight.
// - `anti` criteria discourage hedging or the specific misconception each
//   challenge targets.

import type { PromptRubricChallenge } from '../types'

const prompting: PromptRubricChallenge[] = [
  // Migrated from PromptingModule (the original live spike), now catalogued.
  {
    id: 'prompting-rubric-classify',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Write a classification prompt',
    instructions:
      'Write a system prompt that makes an LLM classify an incoming customer email into exactly one of: Billing, Technical support, or General inquiry. You have no labeled examples, so be explicit. A strong prompt gives the model a role, defines each category, specifies the output format, and handles ambiguous cases.',
    placeholder: 'You are a…',
    hints: [
      'Start with a role: "You are a classifier that…"',
      'Define each category by a criterion, not just its name.',
      'State exactly what format the answer should take (e.g. the category name only).',
      'Tell the model what to do when the email fits no category.',
    ],
    rubric: [
      { type: 'structure', id: 'role', label: 'Gives the model a clear role', element: 'role', weight: 1 },
      {
        type: 'regex',
        id: 'categories',
        label: 'Names all three categories',
        pattern: '(billing).*(technical|support).*(general|inquiry)|(technical|support).*(billing).*(general|inquiry)',
        flags: 'is',
        weight: 2,
      },
      { type: 'structure', id: 'output-format', label: 'Specifies an output format', element: 'outputFormat', weight: 1 },
      {
        type: 'regex',
        id: 'ambiguity',
        label: 'Handles ambiguous or unknown cases',
        pattern: "\\b(if (unclear|ambiguous|none|unsure)|otherwise|unknown|cannot|can't|doesn't fit|none of)\\b",
        flags: 'i',
        weight: 1,
      },
      {
        type: 'anti',
        id: 'no-hedging',
        label: 'Avoids vague, hedging instructions',
        pattern: '\\b(maybe|try to|sort of|kind of|i think|probably)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
  // New: few-shot prompting.
  {
    id: 'prompting-rubric-fewshot',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Teach by example (few-shot)',
    instructions:
      'Write a prompt that uses few-shot examples to make an LLM extract the sentiment (positive / negative / neutral) of a product review. Include at least two worked examples in your prompt, each showing an input review and its labeled output, then leave the final input for the model to complete.',
    placeholder: 'Classify the sentiment of each review.\n\nReview: "…"\nSentiment: …',
    hints: [
      'Show, don\'t just tell — include input→output pairs.',
      'Keep the format of every example identical so the pattern is obvious.',
      'Cover more than one label across your examples.',
    ],
    rubric: [
      { type: 'structure', id: 'examples', label: 'Includes worked examples', element: 'examples', weight: 2 },
      {
        type: 'regex',
        id: 'labels',
        label: 'Demonstrates more than one label',
        pattern: '(positive|negative|neutral)',
        flags: 'gi',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'consistent-format',
        label: 'Uses a consistent input/output format',
        pattern: '(review|input|text)\\s*:.*\\n.*(sentiment|label|output)\\s*:',
        flags: 'is',
        weight: 2,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
  // New: structured-output / JSON.
  {
    id: 'prompting-rubric-json',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Force structured JSON output',
    instructions:
      'Write a prompt that makes an LLM return ONLY valid JSON for a downstream API: extract a person\'s name, email, and priority (one of low/medium/high) from a support message. Specify the exact schema and forbid any extra prose around the JSON.',
    placeholder: 'Extract the following fields and return only JSON…',
    hints: [
      'Name each field and its type or allowed values.',
      'Explicitly forbid markdown fences or explanatory text.',
      'Constrain priority to its three allowed values.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'json',
        label: 'Requests JSON output',
        pattern: '\\bjson\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'fields',
        label: 'Names all three fields',
        pattern: '(name).*(email).*(priority)|(email).*(name).*(priority)',
        flags: 'is',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'enum',
        label: 'Constrains priority to allowed values',
        pattern: '(low).*(medium).*(high)',
        flags: 'is',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'only-json',
        label: 'Forbids extra prose around the JSON',
        pattern: '\\b(only|no (other|extra|additional)|nothing else|do not (add|include)|without)\\b',
        flags: 'i',
        weight: 1,
      },
    ],
  },
]

const promptingBusiness: PromptRubricChallenge[] = [
  {
    id: 'prompting-biz-rubric-brief',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Brief the AI like a colleague',
    instructions:
      'Your first try at "write me an email" gave a generic, useless result. Rewrite the request as a proper brief for a follow-up email to a client who has not replied in two weeks. Tell the AI who it is, who the email is to, what outcome you want, the tone, and the length.',
    placeholder: 'You are my assistant. Draft a follow-up email to…',
    hints: [
      'Say who the AI should be (its role) and who the email is for.',
      'State the goal of the email, not just "write an email".',
      'Pin down tone and length so it cannot drift to generic.',
    ],
    rubric: [
      { type: 'structure', id: 'role', label: 'Sets a role or audience', element: 'role', weight: 1 },
      { type: 'structure', id: 'constraints', label: 'Gives constraints (tone/length)', element: 'constraints', weight: 1 },
      {
        type: 'regex',
        id: 'tone',
        label: 'Specifies a tone',
        pattern: '\\b(professional|warm|friendly|formal|casual|polite|concise|tone)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'goal',
        label: 'States the email\'s goal',
        pattern: '\\b(follow[- ]?up|remind|reply|response|schedule|confirm|next step|reconnect)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'anti',
        id: 'not-vague',
        label: 'Avoids vague filler',
        pattern: '\\b(something|anything|whatever|just write|some kind)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
]

const aiproblemBusiness: PromptRubricChallenge[] = [
  {
    id: 'aiproblem-biz-rubric-memo',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Recommend the right tool',
    instructions:
      'A team spends three hours a day sorting incoming emails into categories. Write a short decision memo recommending an approach. Name whether this needs rule-based software, classical ML, or an LLM, justify why, and call out one risk or failure mode to watch for.',
    placeholder: 'Recommendation: …\nWhy: …\nRisk to watch: …',
    hints: [
      'Pick one approach explicitly — do not hedge across all three.',
      'Justify the choice against the task (repetitive, pattern-based, lots of examples).',
      'Name a concrete failure mode (e.g. misclassification, drift).',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'approach',
        label: 'Names a specific approach',
        pattern: '\\b(rule[- ]?based|classical ml|machine learning|llm|language model|classifier)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'justify',
        label: 'Justifies the choice',
        pattern: '\\b(because|since|as it|reason|repetitive|pattern|examples|data)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'risk',
        label: 'Names a risk or failure mode',
        pattern: '\\b(risk|fail|failure|wrong|misclassif|error|drift|edge case|bias|monitor)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'anti',
        id: 'no-hedge',
        label: 'Commits to a recommendation',
        pattern: '\\b(maybe|possibly|could be either|not sure|hard to say)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const training: PromptRubricChallenge[] = [
  {
    id: 'training-rubric-loss',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Explain what loss really means',
    instructions:
      'A teammate sees training loss drop from 10.0 to 2.4 and concludes "the model is now 75% correct." Explain what cross-entropy loss actually measures and why that conclusion is wrong. Be precise about the difference between loss and accuracy.',
    placeholder: 'Loss measures…',
    hints: [
      'Define loss in terms of probability, not a percentage score.',
      'Explain why a lower loss does not translate to a "% correct".',
      'Mention that loss and accuracy are different quantities.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'probability',
        label: 'Frames loss via probability / likelihood',
        pattern: '\\b(probabilit|likelihood|distribution|log|cross[- ]?entropy|predicted)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'not-accuracy',
        label: 'Distinguishes loss from accuracy',
        pattern: '\\b(not (the same|accuracy|percent)|different|isn\'t accuracy|≠|accuracy)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'anti',
        id: 'no-percent-claim',
        label: 'Avoids repeating the 75%-correct error',
        pattern: '\\b75 ?% correct\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const llmdata: PromptRubricChallenge[] = [
  {
    id: 'llmdata-rubric-pipeline',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Design a data-cleaning pipeline',
    instructions:
      'Design a data-cleaning pipeline for training data scraped from web forums. Describe the stages in order and justify each. A strong answer covers deduplication, quality filtering, and at least one domain-specific decision about what to include or exclude.',
    placeholder: 'Stage 1: …\nStage 2: …',
    hints: [
      'Order matters — describe the stages as a sequence.',
      'Include deduplication and a quality filter explicitly.',
      'Make one judgement call specific to forum data (spam, PII, low-effort posts).',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'dedup',
        label: 'Includes deduplication',
        pattern: '\\b(dedup|duplicate|near[- ]?duplicate|deduplicat)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'quality',
        label: 'Includes quality filtering',
        pattern: '\\b(quality|filter|low[- ]?quality|spam|toxic|heuristic)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'domain',
        label: 'Makes a domain-specific decision',
        pattern: '\\b(forum|pii|personal|nsfw|language|dedup|exclude|include|boilerplate|markup)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'structure', id: 'sequence', label: 'Describes ordered stages', element: 'examples', weight: 1 },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 35, unit: 'words', weight: 1 },
    ],
  },
]

const alignment: PromptRubricChallenge[] = [
  {
    id: 'alignment-rubric-safety',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Write a safety system prompt',
    instructions:
      'Write a system prompt that steers a customer-support assistant to stay safe and on-topic WITHOUT sounding preachy. It should set a role, give clear "do not" constraints (e.g. no legal/medical advice, no sharing internal data), and tell the model how to decline gracefully.',
    placeholder: 'You are a support assistant for…',
    hints: [
      'Give it a concrete role and domain.',
      'Use explicit constraints — "do not", "never", "only".',
      'Say how to refuse or redirect rather than just refusing.',
    ],
    rubric: [
      { type: 'structure', id: 'role', label: 'Sets a clear role', element: 'role', weight: 1 },
      { type: 'structure', id: 'constraints', label: 'Includes explicit constraints', element: 'constraints', weight: 2 },
      {
        type: 'regex',
        id: 'decline',
        label: 'Explains how to decline gracefully',
        pattern: '\\b(decline|refuse|redirect|politely|instead|escalat|hand off|cannot help with)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'anti',
        id: 'not-preachy',
        label: 'Avoids preachy lecturing language',
        pattern: '\\b(as an ai|i must remind you|it is important to note that|lecture)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const evaluation: PromptRubricChallenge[] = [
  {
    id: 'evaluation-rubric-evalrubric',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Design an evaluation rubric',
    instructions:
      'Design an evaluation rubric to score the answers of a customer-support Q&A bot. Include at least three distinct dimensions (e.g. factual accuracy, citation/grounding, safety, tone), and give each a concrete success criterion — not a vague "is it good".',
    placeholder: 'Dimension 1 — Factual accuracy: passes if…',
    hints: [
      'Pick at least three different dimensions.',
      'For each, write a concrete pass condition, not "good/bad".',
      'Avoid leaning on a single generic benchmark score.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'dimensions',
        label: 'Names multiple evaluation dimensions',
        pattern: '\\b(accuracy|factual|citation|grounding|safety|tone|relevance|completeness|latency)\\b',
        flags: 'gi',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'criteria',
        label: 'Gives concrete success criteria',
        pattern: '\\b(passes if|fails if|must|should|criteria|score|threshold|rated|measured by)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'anti',
        id: 'not-vague',
        label: 'Avoids vague "is it good"',
        pattern: '\\b(is it good|seems good|looks fine|generally ok|just good)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 35, unit: 'words', weight: 1 },
    ],
  },
]

const solution: PromptRubricChallenge[] = [
  {
    id: 'solution-rubric-buildbuy',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Argue build vs. buy',
    instructions:
      'A startup needs an AI feature in two weeks, handles non-sensitive data, and has no ML team. Write a recommendation on whether to use an API service (buy) or self-host/fine-tune (build). Justify it against timeline, team, cost, and data sensitivity.',
    placeholder: 'Recommendation: …',
    hints: [
      'Commit to buy or build — do not straddle.',
      'Tie the choice to timeline, team capacity, and cost.',
      'Address data sensitivity explicitly.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'decision',
        label: 'Makes a clear build-or-buy call',
        pattern: '\\b(api|buy|rent|managed service|build|self[- ]?host|fine[- ]?tun)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'tradeoffs',
        label: 'Weighs timeline / team / cost',
        pattern: '\\b(timeline|two weeks|fast|team|cost|cheap|expensive|maintenance|no ml)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'data',
        label: 'Addresses data sensitivity',
        pattern: '\\b(data|sensitive|privacy|non[- ]?sensitive|compliance)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const embeddings: PromptRubricChallenge[] = [
  {
    id: 'embeddings-rubric-chunking',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Choose a chunking strategy',
    instructions:
      'You are building RAG over a 100-page technical manual full of cross-references and tables. Recommend a chunking strategy. Cover chunk size, overlap, and how you would keep related content (or long-range references) together.',
    placeholder: 'I would chunk by…',
    hints: [
      'Say something concrete about chunk size.',
      'Mention overlap and why it helps.',
      'Address semantic boundaries or cross-references.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'size',
        label: 'Addresses chunk size',
        pattern: '\\b(chunk|size|tokens|words|characters|\\d+ ?(tokens|words))\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'overlap',
        label: 'Mentions overlap',
        pattern: '\\b(overlap|sliding|stride|window)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'boundaries',
        label: 'Handles semantic boundaries / references',
        pattern: '\\b(semantic|section|heading|boundary|boundaries|cross[- ]?reference|context|table|paragraph)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const agents: PromptRubricChallenge[] = [
  {
    id: 'agents-rubric-react',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Write a ReAct reasoning trace',
    instructions:
      'Write a ReAct-style trace for an agent answering "What is the weather in the city where our HQ is?" Show the Thought → Action → Observation cycle: at least one Thought, one Action that names a tool with its input, and one Observation, before a final answer.',
    placeholder: 'Thought: …\nAction: …\nObservation: …\nAnswer: …',
    hints: [
      'Label the steps explicitly: Thought, Action, Observation.',
      'The Action should name a tool and its argument.',
      'End with a final answer that uses the observation.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'thought',
        label: 'Includes a Thought step',
        pattern: '\\bthought\\b\\s*:',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'action',
        label: 'Includes an Action naming a tool',
        pattern: '\\baction\\b\\s*:.*\\(?\\w+',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'observation',
        label: 'Includes an Observation',
        pattern: '\\bobservation\\b\\s*:',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'answer',
        label: 'Ends with a final answer',
        pattern: '\\b(answer|final)\\b\\s*:',
        flags: 'i',
        weight: 1,
      },
    ],
  },
]

const agentsBusiness: PromptRubricChallenge[] = [
  {
    id: 'agents-biz-rubric-governance',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Find the missing guardrail',
    instructions:
      'An AI agent approved a $500 refund on a fraudulent claim, all within its allowed spend limit. A spend cap alone clearly was not enough. Identify at least two governance controls that were missing and explain how each would have caught this.',
    placeholder: 'Missing control 1: …',
    hints: [
      'A spend limit is a hard cap — what contextual checks were missing?',
      'Think detection (fraud signals) and escalation (human review).',
      'Name at least two distinct controls.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'controls',
        label: 'Names governance controls',
        pattern: '\\b(fraud|anomaly|detection|human (review|in the loop)|approval|escalat|audit|verification|threshold|rule)\\b',
        flags: 'gi',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'beyond-cap',
        label: 'Recognises a spend cap is insufficient',
        pattern: '\\b(not enough|insufficient|beyond|more than|alone|cap|limit|contextual)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'how',
        label: 'Explains how each control would catch it',
        pattern: '\\b(would (have )?(catch|caught|flag|stop|block)|by |because|so that)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const aiInOrg: PromptRubricChallenge[] = [
  {
    id: 'ai-in-org-rubric-autonomy',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Match autonomy to risk',
    instructions:
      'For a high-stakes task — an agent issuing customer refunds — propose the right level of autonomy and the oversight around it. State the autonomy level, justify it against the risk, and describe the monitoring or escalation that keeps it safe.',
    placeholder: 'Autonomy level: …\nWhy: …\nOversight: …',
    hints: [
      'High-risk usually means lower autonomy / a human checkpoint.',
      'Justify the level against the consequences of a mistake.',
      'Describe monitoring or an escalation path.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'level',
        label: 'States an autonomy level',
        pattern: '\\b(autonomy|human[- ]?in[- ]?the[- ]?loop|approval|supervised|level|tier|fully autonomous|assist)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'risk',
        label: 'Ties the level to risk',
        pattern: '\\b(risk|high[- ]?stakes|consequence|mistake|impact|sensitive|money|refund)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'oversight',
        label: 'Describes monitoring or escalation',
        pattern: '\\b(monitor|review|escalat|audit|alert|checkpoint|oversight|log)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

export const understandChallenges: Record<string, PromptRubricChallenge[]> = {
  prompting,
  'prompting-business': promptingBusiness,
  'aiproblem-business': aiproblemBusiness,
  training,
  llmdata,
  alignment,
  evaluation,
  solution,
  embeddings,
  agents,
  'agents-business': agentsBusiness,
  'ai-in-org': aiInOrg,
}
