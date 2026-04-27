/** Content type for the WhatAreAgents business section. */
export interface WhatAreAgentsContent {
  sectionTitle: string
  intro: string
  introSub: string
  demoTitle: string
  demoDescription: string
  levels: {
    level: string
    analogy: string
    description: string
    everyday: string
    limit: string
  }[]
  loopTitle: string
  loopIntro: string
  loopSteps: { label: string; desc: string }[]
  loopOutro: string
  beforeAfterTitle: string
  examples: { scenario: string; without: string; with: string }[]
  withoutLabel: string
  withLabel: string
  everydayLabel: string
  limitLabel: string
  selfExplainPrompt: string
  selfExplainAnswer: string
}

export const content: WhatAreAgentsContent = {
  sectionTitle: '1. What Are AI Agents?',
  intro: 'Most AI tools today are like **a very smart colleague you can text** — they answer questions, but they can\'t actually *do* anything. An AI agent is different: it\'s more like **a personal assistant who can take action on your behalf**.',
  introSub: 'Think of the difference between asking someone "what time is the meeting?" vs. "reschedule my meeting to Thursday and tell everyone."',
  demoTitle: 'From Chatbot to Agent',
  demoDescription: 'Click through to see how AI capabilities evolve — like going from a colleague who answers questions to an assistant who handles tasks.',
  levels: [
    {
      level: 'Chatbot',
      analogy: 'Like texting a knowledgeable friend',
      description: 'You ask a question, you get an answer. That\'s it. The AI can\'t check anything, look anything up, or do anything on your behalf. It only knows what it was trained on.',
      everyday: 'Imagine asking a colleague a question over Slack — they answer from memory, but they can\'t open your spreadsheet or check your calendar for you.',
      limit: 'If the answer requires up-to-date info or doing something, you\'re stuck doing it yourself.',
    },
    {
      level: 'AI + Search',
      analogy: 'Like a colleague who can Google things',
      description: 'The AI can look things up before answering — searching your company documents, checking a knowledge base, or browsing the web. This is called RAG (Retrieval-Augmented Generation).',
      everyday: 'Like asking your colleague a question and they say "hang on, let me check the shared drive" — then come back with an answer that references actual documents.',
      limit: 'It can find information, but still can\'t take action. It can tell you the meeting is at 3pm, but can\'t reschedule it.',
    },
    {
      level: 'AI Agent',
      analogy: 'Like a personal assistant who gets things done',
      description: 'The AI can think about what needs to happen, take actions (send emails, update spreadsheets, book meetings, query databases), check the results, and keep going until the job is done.',
      everyday: 'Like telling your executive assistant "reschedule my Thursday meetings to next week and email the attendees." They figure out the steps, do them, handle any issues, and report back.',
      limit: 'More powerful but needs guardrails — you want to approve big decisions before the assistant acts.',
    },
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
    {
      scenario: 'Customer support',
      without: 'Agent answers the question from a script. Customer still has to navigate the website themselves to change their plan.',
      with: 'Agent looks up the customer\'s account, checks their billing, changes the plan, sends a confirmation email — all in one conversation.',
    },
    {
      scenario: 'Expense reports',
      without: 'AI can explain the expense policy. Employee still fills out the form manually.',
      with: 'Employee forwards a receipt. Agent reads it, fills out the expense form, categorizes it correctly, and submits it for approval.',
    },
    {
      scenario: 'Meeting prep',
      without: 'AI summarizes a document you paste in. You still have to find the right documents yourself.',
      with: 'You say "prep me for the 2pm client call." Agent pulls the client\'s recent emails, last meeting notes, open proposals, and creates a one-page brief.',
    },
  ],
  withoutLabel: 'Without agent',
  withLabel: 'With agent',
  everydayLabel: 'Everyday comparison',
  limitLabel: 'Limitation:',
  selfExplainPrompt: 'In your own words, explain the difference between a chatbot and an agent to a colleague who has never heard of AI agents. Use an everyday comparison.',
  selfExplainAnswer: 'A chatbot is like texting a really knowledgeable friend — they can answer your questions, but they can\'t do anything for you. An agent is like having a personal assistant — you can say "book me a flight to London next Tuesday, under $500, aisle seat" and they\'ll actually search flights, compare options, book it, and send you the confirmation. The key difference is action: a chatbot talks, an agent does.',
}
