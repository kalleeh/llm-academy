// Challenges for the "Use AI" course. prompt-rubric only.
//
// This course is skills-focused — writing briefs, custom instructions, agent
// task specs, AGENTS.md, and guardrails — which is exactly what the rubric
// grader scores well. Most challenges follow the same brief-quality shape:
// role/context, a concrete outcome, constraints, and a checkpoint/guardrail.

import type { PromptRubricChallenge } from '../types'

// Reusable criteria for "is this a good brief?" challenges.
const ANTI_VAGUE = {
  type: 'anti' as const,
  id: 'not-vague',
  label: 'Avoids vague filler',
  pattern: '\\b(something|anything|whatever|just do it|some kind|or something|and stuff|as needed|and so on|etc\\.? ?$)\\b',
  flags: 'i',
  weight: 1,
}

const toolsLandscape: PromptRubricChallenge[] = [
  {
    id: 'toolsland-rubric-scope',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Scope a job for a coding agent',
    instructions:
      'Write the brief you would hand an agentic coding tool to rename a config key that appears across ~40 files and update the tests. A good brief states the outcome, the constraints that matter (preserve the public interface, keep tests green), and how "done" is verified.',
    placeholder: 'Rename the config key … across the repo.',
    hints: [
      'State the concrete outcome, not just "fix the config".',
      'Name the constraints: interface to preserve, tests to keep passing.',
      'Define done — e.g. "all tests pass and lint is clean".',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'outcome',
        label: 'States a clear outcome',
        pattern: '\\b(rename|replace|update|migrate|change)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'constraints',
        label: 'Names constraints to preserve',
        pattern: '\\b(interface|api|backward|compatib|behaviou?r|public|signature|preserve|keep)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'verify',
        label: 'Defines how done is verified',
        pattern: '\\b(test|tests pass|lint|verify|ci|green|build)\\b',
        flags: 'i',
        weight: 2,
      },
      ANTI_VAGUE,
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
]

const toolsLandscapeBusiness: PromptRubricChallenge[] = [
  {
    id: 'toolsland-biz-rubric-delegate',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Delegate a recurring task',
    instructions:
      'Your ops team rebuilds a weekly status digest from five spreadsheets and an email folder every Monday. Write a brief delegating this to an agentic work app. Cover the task scope, the inputs/sources, the exact deliverable format, and where a human reviews before it goes out.',
    placeholder: 'Every Monday, assemble…',
    hints: [
      'List the sources the agent should pull from.',
      'Pin the deliverable format (e.g. a one-page summary, bullet sections).',
      'Add a human review checkpoint before sending.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'sources',
        label: 'Names the inputs / sources',
        pattern: '\\b(spreadsheet|email|folder|source|file|data|csv|sheet)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'format',
        label: 'Specifies the deliverable format',
        pattern: '\\b(format|summary|bullet|one[- ]?page|sections?|report|digest|table)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'checkpoint',
        label: 'Includes a human review checkpoint',
        pattern: '\\b(review|approve|check|before (it|sending)|human|sign[- ]?off|draft)\\b',
        flags: 'i',
        weight: 2,
      },
      ANTI_VAGUE,
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const workingWithAi: PromptRubricChallenge[] = [
  {
    id: 'workai-rubric-instructions',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Write custom instructions',
    instructions:
      'Write the custom instructions you would set once for a coding assistant working in your project, so you never have to re-explain context. Include the stack/tech, the code style or conventions, the test command, and one rule for how it should behave (e.g. ask before large refactors).',
    placeholder: 'I work in… Always…',
    hints: [
      'State the tech stack so it stops guessing.',
      'Give a style/convention rule and the test command.',
      'Add a behavioural rule — what to do or avoid by default.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'stack',
        label: 'Names the tech stack',
        pattern: '\\b(python|javascript|typescript|react|rails|ruby|go|java|node|django|flask|next|stack|framework)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'conventions',
        label: 'Gives style / conventions',
        pattern: '\\b(style|convention|naming|format|lint|type[- ]?hint|prettier|eslint|tabs|spaces)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'test',
        label: 'Specifies how to run tests',
        pattern: '\\b(test|pytest|npm (test|run)|jest|rspec|coverage|ci)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'structure', id: 'rule', label: 'Adds a behavioural rule', element: 'constraints', weight: 1 },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
]

const workingWithAiBusiness: PromptRubricChallenge[] = [
  {
    id: 'workai-biz-rubric-refine',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Turn a vague request into a brief',
    instructions:
      'A colleague typed "write a product update" and got something generic. Rewrite it as a strong brief. Supply who it is for (audience), the goal, the tone, the format, and any must-include detail — so the AI cannot fall back to a generic average.',
    placeholder: 'Write a product update for…',
    hints: [
      'Name the audience and the goal first.',
      'Lock tone and format so the result cannot drift to generic.',
      'Add one must-include fact or constraint.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'audience',
        label: 'Names the audience',
        pattern: '\\b(for (our|the|my)|audience|customer|user|team|stakeholder|reader|client)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'tone-format',
        label: 'Specifies tone and format',
        pattern: '\\b(tone|formal|friendly|concise|format|bullet|paragraph|length|words|short)\\b',
        flags: 'gi',
        weight: 2,
      },
      { type: 'structure', id: 'context', label: 'Supplies context', element: 'context', weight: 1 },
      ANTI_VAGUE,
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
]

const optimizingWorkflow: PromptRubricChallenge[] = [
  {
    id: 'optwf-rubric-template',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Turn a one-off into a reusable template',
    instructions:
      'You rebuild the same weekly report from scratch in chat every Monday. Write a reusable prompt template that turns it into a system. Mark what stays fixed every week (the standing context, sources, format) and leave a clear slot for what changes (this week\'s data).',
    placeholder: 'You are my weekly-report assistant. Each week…',
    hints: [
      'Separate the standing instructions from the weekly variable.',
      'Bake in the sources and output format once.',
      'Use a placeholder (e.g. [this week\'s numbers]) for what changes.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'fixed',
        label: 'Captures the standing context',
        pattern: '\\b(every week|each week|always|standing|recurring|same|fixed|template)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'slot',
        label: 'Leaves a slot for what changes',
        pattern: '(\\[[^\\]]+\\]|\\{[^}]+\\}|<[^>]+>|this week|paste|insert|placeholder)',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'format',
        label: 'Bakes in sources or format',
        pattern: '\\b(format|source|section|bullet|summary|report|data|spreadsheet)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]
// Business track teaches the same one-off-to-system skill, but framed for a
// non-technical professional — natural language, no template-markup syntax
// required (the "what changes" marker accepts plain phrasing like "this week's
// numbers", not just [brackets]).
const optimizingWorkflowBusiness: PromptRubricChallenge[] = [
  {
    id: 'optwf-biz-rubric-template',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Turn a one-off into a reusable system',
    instructions:
      'You rebuild the same weekly report in chat every Monday, spending 90 minutes. Write the brief you would save and reuse to make it a 5-minute job. Separate what stays the same every week (the sources, the format, the rules) from what changes (this week\'s data) — describe the deliverable in plain language, no technical syntax needed.',
    placeholder: 'Every Monday, gather…',
    hints: [
      'Write the task so a colleague could run it without asking you anything.',
      'List the sources (spreadsheets, emails, files) that stay the same every week.',
      'Describe the output format so the result is always predictable.',
      "Show where this week's new data or numbers go.",
    ],
    rubric: [
      {
        type: 'regex',
        id: 'fixed',
        label: 'Captures the standing context',
        pattern: '\\b(every (week|monday|month)|each week|always|standing|recurring|same|fixed)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'variable',
        label: 'Marks what changes each cycle',
        pattern: "(\\[[^\\]]+\\]|\\{[^}]+\\}|<[^>]+>|this (week|month)|new (data|numbers|figures)|latest|paste|insert|each (week|time))",
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'sources',
        label: 'Names the sources',
        pattern: '\\b(spreadsheet|sheet|file|email|folder|source|data|csv|excel|dashboard)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'format',
        label: 'Describes the deliverable format',
        pattern: '\\b(format|summary|bullet|section|report|one[- ]?page|table|digest)\\b',
        flags: 'i',
        weight: 1,
      },
      ANTI_VAGUE,
      { type: 'length', id: 'length', label: 'Detailed enough', min: 35, unit: 'words', weight: 1 },
    ],
  },
]

const agenticCoding: PromptRubricChallenge[] = [
  {
    id: 'agcode-rubric-agentsmd',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.72,
    title: 'Write an AGENTS.md',
    instructions:
      'Write an AGENTS.md for a Python Flask project so a coding agent starts pre-briefed. Cover the setup/run/test commands, the conventions to follow (e.g. type hints, error handling), a note on where key code lives, and a clear definition of done.',
    placeholder: '## Setup\n…\n## Conventions\n…\n## Definition of done\n…',
    hints: [
      'List the commands to install, run, and test.',
      'State conventions the agent must follow.',
      'End with a definition of done (tests pass, lint clean).',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'commands',
        label: 'Includes setup / run / test commands',
        pattern: '\\b(pip install|flask run|pytest|npm|make|setup|install|run|test)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'conventions',
        label: 'States conventions',
        pattern: '\\b(convention|type[- ]?hint|style|naming|error|lint|format|structure|blueprint)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'done',
        label: 'Defines done',
        pattern: '\\b(definition of done|done|tests pass|lint clean|acceptance|complete when)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'structure',
        label: 'Organised into sections (## headings)',
        pattern: '(^|\\n)\\s*#{1,4}\\s+\\S|(^|\\n)\\s*[-*]\\s+\\S.*(\\n\\s*[-*]\\s+\\S)',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 35, unit: 'words', weight: 1 },
    ],
  },
  {
    id: 'agcode-rubric-taskbrief',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Brief an agent on a feature',
    instructions:
      'Write the brief to give a coding agent the task "add OAuth2 login to the auth module." Scope it like a brief to a capable engineer: the outcome, the constraints (preserve the existing interface, add tests), where related code lives, and the definition of done.',
    placeholder: 'Add OAuth2 login to the auth module. …',
    hints: [
      'State the outcome and the module it touches.',
      'Name constraints: keep the existing interface, add tests.',
      'Point at where related code lives, and define done.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'outcome',
        label: 'States the outcome',
        pattern: '\\b(add|implement|build|create|integrate)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'constraints',
        label: 'Names constraints',
        pattern: '\\b(interface|preserve|keep|existing|backward|without breaking|add (a )?test)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'done',
        label: 'Defines done / verification',
        pattern: '\\b(test|done|verify|pass|lint|acceptance)\\b',
        flags: 'i',
        weight: 1,
      },
      ANTI_VAGUE,
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const agenticWork: PromptRubricChallenge[] = [
  {
    id: 'agwork-rubric-brief',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.7,
    title: 'Write a delegable brief',
    instructions:
      'Write a brief delegating "monthly reconciliation of vendor invoices against purchase orders" to an agentic work app. Cover the task scope, the inputs, the policy/rules to apply, the exact deliverable, and the checkpoint where a human reviews before anything is finalised.',
    placeholder: 'Reconcile this month\'s vendor invoices against…',
    hints: [
      'Describe what the agent does, step by step at a high level.',
      'State the rules/policy it must apply.',
      'Add a human checkpoint before anything is finalised.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'inputs',
        label: 'Names the inputs',
        pattern: '\\b(invoice|purchase order|po\\b|spreadsheet|file|data|source|record)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'rules',
        label: 'States the rules / policy',
        pattern: '\\b(rule|policy|threshold|match|flag|tolerance|approve|over \\$?\\d|discrepanc)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'checkpoint',
        label: 'Includes a human checkpoint',
        pattern: '\\b(review|approve|before (final|finalis|sending)|human|check|sign[- ]?off)\\b',
        flags: 'i',
        weight: 2,
      },
      ANTI_VAGUE,
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
  {
    id: 'agwork-rubric-guardrails',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.72,
    title: 'Set guardrails for an agent',
    instructions:
      'An agent will approve customer refunds up to $500 on its own. Write the guardrails that keep this safe. Cover the approval threshold, what triggers human review, a check for anomalies/fraud, and the requirement for an audit trail.',
    placeholder: 'Guardrails:\n- Refunds over $… require…',
    hints: [
      'Set the threshold above which a human must approve.',
      'Add an anomaly/fraud check, not just a dollar cap.',
      'Require an audit trail of every decision.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'threshold',
        label: 'Sets an approval threshold',
        pattern: '\\b(over \\$?\\d|above|threshold|limit|more than|exceed|up to \\$?\\d)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'human',
        label: 'Triggers human review',
        pattern: '\\b(human|review|approve|escalat|manager|sign[- ]?off)\\b',
        flags: 'i',
        weight: 2,
      },
      {
        type: 'regex',
        id: 'anomaly',
        label: 'Checks for anomalies / fraud',
        pattern: '\\b(fraud|anomaly|anomalies|suspicious|unusual|pattern|flag|detect)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'audit',
        label: 'Requires an audit trail',
        pattern: '\\b(audit|log|record|trail|track|history)\\b',
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 30, unit: 'words', weight: 1 },
    ],
  },
]

const genaiBeyondText: PromptRubricChallenge[] = [
  {
    id: 'genai-rubric-vision',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.68,
    title: 'Prompt a vision model',
    instructions:
      'Write the prompt you would send to a vision model to extract structured data from a scanned invoice image. Specify the fields to extract, request JSON output, and say what should happen if a field is unreadable or missing.',
    placeholder: 'From the attached invoice image, extract…',
    hints: [
      'List the fields you need from the image.',
      'Ask for structured JSON, not prose.',
      'Say what to do when a value is unreadable.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'fields',
        label: 'Names fields to extract',
        pattern: '\\b(total|date|invoice number|vendor|amount|line item|field|extract)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'json',
        label: 'Requests structured output',
        pattern: '\\b(json|structured|schema|fields?)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'fallback',
        label: 'Handles unreadable / missing values',
        pattern: "\\b(if (unreadable|missing|unclear|blank)|null|n/?a|cannot read|leave (it )?(blank|empty))\\b",
        flags: 'i',
        weight: 1,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
]
const genaiBeyondTextBusiness: PromptRubricChallenge[] = [
  {
    id: 'genai-biz-rubric-imagebrief',
    kind: 'prompt-rubric',
    graded: true,
    passThreshold: 0.65,
    title: 'Brief an image-generation tool',
    instructions:
      'Marketing wants 50 on-brand product photos for social media, quickly. Write a brief for an image-generation tool. Cover the subject and style, the brand consistency requirements, a review checkpoint before publishing, and a note on cost or batch sizing.',
    placeholder: 'Generate product photos that…',
    hints: [
      'Describe the subject and the visual style.',
      'Call out brand consistency requirements.',
      'Add a review step before anything is published.',
    ],
    rubric: [
      {
        type: 'regex',
        id: 'style',
        label: 'Describes subject and style',
        pattern: '\\b(style|brand|colou?r|aesthetic|background|lighting|product|photo|look)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'consistency',
        label: 'Requires brand consistency',
        pattern: '\\b(consistent|consistency|on[- ]?brand|guideline|brand)\\b',
        flags: 'i',
        weight: 1,
      },
      {
        type: 'regex',
        id: 'review',
        label: 'Adds a review checkpoint',
        pattern: '\\b(review|approve|before (publish|posting)|check|human|sign[- ]?off)\\b',
        flags: 'i',
        weight: 2,
      },
      { type: 'length', id: 'length', label: 'Detailed enough', min: 25, unit: 'words', weight: 1 },
    ],
  },
]

export const useAiChallenges: Record<string, PromptRubricChallenge[]> = {
  toolslandscape: toolsLandscape,
  'toolslandscape-business': toolsLandscapeBusiness,
  workingwithai: workingWithAi,
  'workingwithai-business': workingWithAiBusiness,
  optimizingworkflow: optimizingWorkflow,
  'optimizingworkflow-business': optimizingWorkflowBusiness,
  agenticcoding: agenticCoding,
  agenticwork: agenticWork,
  genaibeyondtext: genaiBeyondText,
  'genaibeyondtext-business': genaiBeyondTextBusiness,
}
