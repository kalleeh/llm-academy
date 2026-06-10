# "Use AI" Course — Phase 3e: Generative AI Beyond Text Module (course finale) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the final v1 "Use AI" module (#6) — *Generative AI Beyond Text* (dual-track B+T): image, voice, video, and multimodal AI — with **per-persona content** (Business: tools & use cases; Technical: models & APIs), one emulation per persona, KnowledgeChecks for both, a CourseBridge to The Industry Map, and full EN/SV/KO i18n. Completes the 6-module v1 course.

**Architecture:** Dual-persona module (`personas: ['technical', 'business']`) — back to the branch-on-`useDifficulty()` shape of Tools Landscape / Working With AI (the single-persona modules 3c/3d were the exception). Module root renders a business section set or a technical section set. Sections under `src/modules/genaibeyondtext/`; prose in `useTranslation()` (`modules.genaibeyondtext.*`); quiz/SelfExplain via legacy translation files. One new icon (`film`) is added to `Icon.tsx` for the video modality. Bridge targets `industry` (both personas, `understand` course → never dead-ends; business label "Who Makes What" — the natural "which models/companies are behind these tools" link).

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + browser checks (memory `browser-verification-setup`; deploy + artifact cleanup: memory `deploy-llm-academy`).

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 3, module 6; "use image/video/voice/multimodal tools; know models & use cases — B: use cases · T: APIs/models")

---

## Module Content Design

After this module the learner understands the generative-AI landscape beyond chat: what each modality (image, voice/audio, video, multimodal) is good for, and — per persona — either the concrete tools & business use cases, or the models & API shape.

**Technical sections (3):**
1. **The Modalities & Their Models** — expandable cards: Image (diffusion; SD/Flux/Nova Canvas/Imagen), Voice/Audio (TTS + STT + speech-to-speech; Whisper, ElevenLabs, Nova Sonic), Video (diffusion-in-time; Sora/Veo/Runway), Multimodal (one model, many I/O; GPT/Gemini/Claude vision). Each card: what it is technically + representative models.
2. **Calling a Multimodal Model** *(emulation — SimulatedTerminal)* — a faithful API session: send an image + prompt to a vision model, get structured JSON back; then a text-to-image call returning an image ref. Shows request/response shape, that it's "just an API," and the cost/latency note. SelfExplain.
3. **Choosing & Integrating** — expandable cards: hosted API vs self-host, latency/cost/quality trade-offs, safety & provenance (C2PA/watermarking), evaluation is harder for generative media. CourseBridge → industry.

**Business sections (3):**
1. **What Each Modality Is For** — expandable cards: Image (marketing/mockups/product), Voice (support/accessibility/content), Video (training/ads/social), Multimodal (analyze a photo, summarize a call). Each: the business use, with a concrete example.
2. **Pick the Right Tool for a Job** *(emulation — InteractiveDemo)* — step through four real requests ("product photos for a launch", "turn this webinar into clips", "voiceover in 3 languages", "extract data from receipt photos") → the modality + a tool category + the watch-out. SelfExplain.
3. **Use It Responsibly** — expandable cards: disclosure & provenance (label AI media, C2PA), rights & likeness (don't clone a voice you don't own), brand & accuracy review, cost discipline. CourseBridge → industry.

IDs: registry `genai-beyond-text`; i18n subtree `genaibeyondtext`; KnowledgeCheck `genaibeyondtext` / `genaibeyondtext-business`; question ids `genai-1`, `genai-2` (technical), `genai-biz-1`, `genai-biz-2` (business).

---

## File Structure

- **Modify:** `src/components/Icon.tsx` (add `film` icon)
- **Create:** `src/modules/GenAIBeyondTextModule.tsx`; `src/modules/genaibeyondtext/ModalitiesModelsSection.tsx`, `MultimodalAPISection.tsx`, `ChoosingIntegratingSection.tsx`, `ModalityUsesBusiness.tsx`, `PickTheToolBusiness.tsx`, `UseResponsiblyBusiness.tsx`
- **Modify:** `src/registry.ts`, `src/App.tsx`, `src/ui-labels.ts`, `src/i18n/en.ts`, `src/i18n/sv.ts`, `src/i18n/ko.ts`, `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

---

## Task 1: Add `film` icon + register the module

**Files:** Modify `src/components/Icon.tsx`, `src/registry.ts`, `src/App.tsx`; Create `src/modules/GenAIBeyondTextModule.tsx`

- [ ] **Step 1: Add the `film` icon.** In `src/components/Icon.tsx`, the `PATHS` object maps name → `[viewBoxSize, ...pathStrings]`. Add an entry near the other media icons (e.g. right after the `image:` line):

```ts
  film: [16, 'M2 3h12v10H2z M5 3v10 M11 3v10 M2 5.5h3 M2 8h3 M2 10.5h3 M11 5.5h3 M11 8h3 M11 10.5h3'],
```

(A film strip: outer frame, two vertical divider lines, and sprocket holes down both sides. 16×16 viewBox like every other icon.)

- [ ] **Step 2: Placeholder module.** Create `src/modules/GenAIBeyondTextModule.tsx`:

```tsx
import { ModuleLayout } from '../components/ModuleLayout'

export const GenAIBeyondTextModule: React.FC = () => {
  return (
    <ModuleLayout moduleId="genai-beyond-text" title="Generative AI Beyond Text" subtitle="Image, voice, video, and multimodal AI — the tools, models, and use cases.">
      <p className="text-zinc-700 dark:text-zinc-300">Content coming in Phase 3.</p>
    </ModuleLayout>
  )
}
```

- [ ] **Step 3: Registry.** In `src/registry.ts`: append `| 'genai-beyond-text'` to `ModuleId`; append to `MODULES` after the `agentic-work` entry:

```ts
  { id: 'genai-beyond-text', label: 'Generative AI Beyond Text', course: 'use', personas: ['technical', 'business'] },
```

- [ ] **Step 4: App wiring.** In `src/App.tsx`: after the `AgenticWorkModule` lazy import add:

```tsx
const GenAIBeyondTextModule = lazy(() => import('./modules/GenAIBeyondTextModule').then(m => ({ default: m.GenAIBeyondTextModule })))
```

and in `moduleComponents` after `'agentic-work': AgenticWorkModule,` add:

```tsx
  'genai-beyond-text': GenAIBeyondTextModule,
```

- [ ] **Step 5:** `npm run build && npm run lint` → PASS.
- [ ] **Step 6:** Manual: Use AI lists 5 modules in Business (Tools Landscape, Working With AI, Optimizing Workflow, Agentic Work, Generative AI Beyond Text) and 5 in Technical (…, Agentic Coding, Generative AI Beyond Text); module 5 renders placeholder. Render a `<Icon name="film" />` sanity-check is optional.
- [ ] **Step 7: Commit**

```bash
git add src/components/Icon.tsx src/registry.ts src/App.tsx src/modules/GenAIBeyondTextModule.tsx
git commit -m "feat: add film icon; register Generative AI Beyond Text module"
```

---

## Task 2: Sidebar + module labels (EN/SV/KO)

**Files:** Modify `src/ui-labels.ts`, `src/i18n/en.ts`

- [ ] **Step 1:** In `src/ui-labels.ts` add after each language's `'agentic-work'` entry:

EN:
```ts
    'genai-beyond-text': { label: 'Generative AI Beyond Text', subtitle: 'Image, voice, video, and multimodal — the models and APIs, and how to integrate them.', businessSubtitle: 'Image, voice, video, and multimodal — what each is for, the tools, and using them responsibly.' },
```
SV:
```ts
    'genai-beyond-text': { label: 'Generativ AI bortom text', subtitle: 'Bild, röst, video och multimodalt — modellerna och API:erna, och hur man integrerar dem.', businessSubtitle: 'Bild, röst, video och multimodalt — vad varje sak är till för, verktygen och hur man använder dem ansvarsfullt.' },
```
KO:
```ts
    'genai-beyond-text': { label: '텍스트를 넘어선 생성형 AI', subtitle: '이미지, 음성, 비디오, 멀티모달 — 모델과 API, 그리고 통합하는 법.', businessSubtitle: '이미지, 음성, 비디오, 멀티모달 — 각각의 용도, 도구, 그리고 책임감 있게 사용하는 법.' },
```

- [ ] **Step 2:** In `src/i18n/en.ts` `moduleLabels` after the `'agentic-work'` entry:

```ts
  'genai-beyond-text': {
    label: 'Generative AI Beyond Text',
    subtitle: 'Image, voice, video, and multimodal — the models and APIs, and how to integrate them.',
    businessSubtitle: 'Image, voice, video, and multimodal — what each is for, the tools, and using them responsibly.',
  },
```

- [ ] **Step 3:** Build + lint → PASS. **Step 4: Commit**

```bash
git add src/ui-labels.ts src/i18n/en.ts
git commit -m "feat: add Generative AI Beyond Text sidebar + module labels (EN/SV/KO)"
```

---

## Task 3: English content tree

**Files:** Modify `src/i18n/en.ts`

- [ ] **Step 1:** Inside `const modules = {`, after the closing brace of the `agenticwork` entry, insert:

```ts
  genaibeyondtext: {
    // Tech: 1. The Modalities & Their Models
    modalitiesModels: {
      title: '1. The Modalities & Their Models',
      intro:
        'Beyond text, generative AI spans four modalities, each with its own model family and quirks. Click each to see what it is under the hood and the representative models in 2026.',
      modelsLabel: 'Representative models:',
      items: [
        {
          name: 'Image',
          tagline: 'Diffusion models',
          description:
            'Text-to-image models work by denoising: they start from random noise and iteratively refine it toward an image matching the prompt, guided by a text encoder. Controllable via prompts, reference images, masks (inpainting), and structure maps. Fast, cheap, mature.',
          models: 'Stable Diffusion 3.5, FLUX, Amazon Nova Canvas, Google Imagen, GPT Image',
        },
        {
          name: 'Voice & audio',
          tagline: 'TTS, STT, and speech-to-speech',
          description:
            'Three jobs: text-to-speech (TTS) synthesizes natural voices; speech-to-text (STT) transcribes; and newer speech-to-speech models converse directly in audio with low latency, preserving tone. Voice cloning is a TTS feature — and a rights minefield.',
          models: 'Whisper (STT), ElevenLabs (TTS/clone), Amazon Nova Sonic, OpenAI Realtime',
        },
        {
          name: 'Video',
          tagline: 'Diffusion across time',
          description:
            'Video models extend image diffusion into the time dimension, generating coherent frames from a text or image prompt. Still the most compute-hungry and least controllable modality — clip lengths are short and consistency across shots is the hard problem.',
          models: 'OpenAI Sora, Google Veo, Runway Gen-3, Amazon Nova Reel',
        },
        {
          name: 'Multimodal',
          tagline: 'One model, many inputs and outputs',
          description:
            'Frontier LLMs natively accept images (and increasingly audio/video) alongside text and reason across them — "what is wrong in this diagram?", "summarize this screenshot." The same model that chats can see. This is where most business value lands, because it needs no new pipeline.',
          models: 'GPT-5.x (omni), Gemini 3.x, Claude (vision), Llama 4 (vision)',
        },
      ],
      takeaway:
        'Image and voice are mature and cheap; video is the frontier; multimodal understanding (a chat model that can see and hear) is quietly the most useful day to day. Match the modality to the job before you shop for a model.',
    },
    // Tech: 2. Calling a Multimodal Model (SimulatedTerminal emulation)
    multimodalAPI: {
      title: '2. Calling a Multimodal Model',
      intro:
        'Under the product UIs, these are ordinary HTTP APIs: you send content blocks, you get content (or a reference) back. Run the session to see the request/response shape for a vision call and an image-generation call.',
      stepNote:
        'Two calls: first a vision model reads an image and returns structured JSON; then a text-to-image model returns an image reference. Note the cost/latency line — media calls are pricier and slower than text.',
      takeaway:
        'Multimodal is "just an API": content blocks in, content or a reference out, billed per image/second/token. Once you see the request shape, integrating image or vision is the same engineering you already do for text — plus attention to cost, latency, and storing the binary output.',
      selfExplainPrompt:
        'Your app lets users photograph a receipt and get the line items as structured data. Which modality and roughly what API shape would you use, and what would you watch for in cost and reliability?',
      selfExplainAnswer:
        'A multimodal/vision model: send the image plus a prompt asking for line items as JSON (ideally with a strict schema / structured-output mode), get JSON back. Watch for: per-image cost and latency (cache or batch where possible), failure modes on blurry/rotated photos (validate the JSON, ask for confidence, fall back to a re-shoot prompt), and never trust the extraction blindly for anything financial — show the user the parsed result over the image for a quick confirm. It is the same request/response engineering as a text call, with image input and stricter output validation.',
    },
    // Tech: 3. Choosing & Integrating
    choosingIntegrating: {
      title: '3. Choosing & Integrating',
      intro:
        'Picking and shipping a generative-media capability has trade-offs text does not. Click each consideration.',
      items: [
        {
          name: 'Hosted API vs self-host',
          tagline: 'Rent the frontier, or run open weights',
          description:
            'Hosted APIs (Bedrock, OpenAI, fal) give you the best models with zero ops and pay-per-use; open weights (SD, Flux, Whisper) run on your own GPUs for data control and volume economics. Most teams start hosted and self-host only the high-volume, stable workloads.',
        },
        {
          name: 'Latency, cost, quality',
          tagline: 'Pick two, tune the third',
          description:
            'A 4-second video clip can cost dollars and take minutes; an image is cents and seconds; vision-on-text is near-chat cost. Budget per-asset, cache aggressively, generate at the smallest size/length that works, and reserve the expensive models for the moments that matter.',
        },
        {
          name: 'Safety & provenance',
          tagline: 'Watermark and label',
          description:
            'Generative media needs provenance: C2PA content credentials and invisible watermarks (e.g. SynthID) mark AI origin, and most providers attach them. You are responsible for disclosure, for not generating disallowed content, and for honoring likeness/voice rights.',
        },
        {
          name: 'Evaluation is harder',
          tagline: 'No single correct output',
          description:
            'There is no exact-match metric for "a good image" or "a natural voice." Lean on human review for quality, automated checks for policy/safety, and A/B or preference tests for model choice. Treat eval as continuous, not a one-time benchmark.',
        },
      ],
      bridgeBlurb:
        'You know the modalities and how to call them. Zoom out to the players: who builds these image, voice, and video models, open vs closed, and how the ecosystem fits together.',
    },
    // Business: 1. What Each Modality Is For
    modalityUses: {
      title: '1. What Each Modality Is For',
      intro:
        'Generative AI is not just chat. Four modalities each unlock different work — the trick is knowing which job each is good at. Click each.',
      exampleLabel: 'For example:',
      items: [
        {
          name: 'Image',
          tagline: 'Visuals on demand',
          description:
            'Generate and edit images from a description: marketing creative, social posts, product mockups, presentation art, ad variations. Mature and cheap — often the first place a team sees real time savings.',
          example: 'Spin up 20 on-brand ad variations for A/B testing in minutes, instead of a day with a designer.',
        },
        {
          name: 'Voice & audio',
          tagline: 'Speak and listen at scale',
          description:
            'Turn text into natural speech (narration, IVR, accessibility) and speech into text (meeting notes, call transcripts, captions). Newer tools hold real-time voice conversations for support.',
          example: 'Add a natural-sounding voiceover to a training video in eight languages without a studio.',
        },
        {
          name: 'Video',
          tagline: 'Moving pictures from a prompt',
          description:
            'Generate short clips, animate stills, or cut long footage into highlights. Powerful but still the roughest edge — best for short social/marketing clips and drafts, with a human finishing the cut.',
          example: 'Turn a one-hour webinar into ten 30-second social clips with captions, ready for review.',
        },
        {
          name: 'Multimodal',
          tagline: 'AI that sees and hears',
          description:
            'A chat assistant that also accepts images, audio, and documents: photograph a whiteboard and get the notes, drop in a screenshot and ask what is wrong, hand it a call recording and get the action items.',
          example: 'Photograph a competitor\'s shelf and ask for a tidy table of their products and prices.',
        },
      ],
      takeaway:
        'Image and voice are ready for everyday work; video is great for drafts; multimodal "AI that can see" is the quiet workhorse. Start with the modality that fits a job you already do often.',
    },
    // Business: 2. Pick the Right Tool for a Job (InteractiveDemo)
    pickTheTool: {
      title: '2. Pick the Right Tool for a Job',
      intro:
        'Four real requests. For each: which modality, what kind of tool, and the one thing to watch. Step through.',
      recommendLabel: 'Best fit:',
      watchLabel: 'Watch out:',
      scenarios: [
        {
          request: '"We need 30 product photos in different settings for the launch page — fast and on-brand."',
          pick: 'Image generation (or background edit/inpainting)',
          why: 'Image tools generate and edit on-brand visuals in minutes at near-zero cost — ideal for volume and variations.',
          watch: 'Check brand accuracy and avoid implying real photos of a physical product you have not shipped; disclose AI imagery where required.',
        },
        {
          request: '"Turn our 60-minute webinar recording into short clips for LinkedIn."',
          pick: 'Video tools (highlight extraction + captioning)',
          why: 'Video tools can find highlights and cut captioned clips, turning an afternoon of editing into a review pass.',
          watch: 'A human should approve the cuts — automated highlights miss nuance and can clip a quote out of context.',
        },
        {
          request: '"We want a natural voiceover for our help videos in English, Spanish, and German."',
          pick: 'Text-to-speech (multilingual)',
          why: 'Modern TTS produces natural multilingual narration without a studio, and is easy to re-generate when scripts change.',
          watch: 'Only clone a specific person\'s voice with their consent; for brand voices, use licensed/synthetic voices and keep the rights clear.',
        },
        {
          request: '"Staff photograph paper receipts; we want the amounts and dates as a spreadsheet."',
          pick: 'Multimodal / vision model',
          why: 'A vision model reads the photos and returns structured data — no new app, just the assistant your team already uses.',
          watch: 'Verify extracted numbers before they hit finance; blurry or angled photos cause errors, so keep a human confirm step.',
        },
      ],
      selfExplainPrompt:
        'Pick a task your team does that involves images, audio, or video. Which modality fits, what kind of tool would you reach for, and what is the one thing you would double-check before trusting the output?',
      selfExplainAnswer:
        'Example: "We manually write alt-text and social captions for every product image. Modality: multimodal/vision — hand the image to an AI that can see and ask for alt-text plus three caption options in our voice. Tool: our existing multimodal assistant, no new system. Double-check: accuracy and brand tone on a sample before bulk-running, and that nothing invents a product feature the image does not actually show."',
    },
    // Business: 3. Use It Responsibly
    useResponsibly: {
      title: '3. Use It Responsibly',
      intro:
        'Generative media creates risks text rarely does — likeness, deception, brand. Four habits keep you safe. Click each.',
      items: [
        {
          name: 'Disclose & label',
          tagline: 'Say when it is AI',
          description:
            'Label AI-generated media where your audience or the law expects it, and keep provenance (C2PA content credentials) intact rather than stripping it. Quiet AI imagery in a news or trust context is a reputation risk waiting to happen.',
        },
        {
          name: 'Respect rights & likeness',
          tagline: 'Don\'t clone what you don\'t own',
          description:
            'Do not generate a real person\'s face or clone a voice without consent, and watch training-data/style claims. Use licensed or synthetic voices and models with clear commercial terms — "it was AI" is not a defense.',
        },
        {
          name: 'Review for brand & accuracy',
          tagline: 'A human signs off',
          description:
            'Generative tools confidently produce wrong hands, garbled text-in-images, or off-brand tone. Keep a human approval step before anything customer-facing ships — the same review bar you would apply to an agency draft.',
        },
        {
          name: 'Mind the cost',
          tagline: 'Video and audio add up',
          description:
            'Image is cheap, but video generation and large batch jobs get expensive fast. Set budgets, generate at the size/length you actually need, and measure cost-per-asset so a "quick experiment" does not become a surprise invoice.',
        },
      ],
      bridgeBlurb:
        'You know what these tools do and how to use them well. Curious who actually builds the image, voice, and video models behind them — and how the companies stack up? See the map.',
    },
  },
```

- [ ] **Step 2:** Build + lint → PASS. **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Generative AI Beyond Text English content tree"
```

---

## Task 4: Technical sections + module root

**Files:** Create `src/modules/genaibeyondtext/ModalitiesModelsSection.tsx`, `MultimodalAPISection.tsx`, `ChoosingIntegratingSection.tsx`; Modify `src/modules/GenAIBeyondTextModule.tsx`

Patterns mirror shipped siblings. Card sections mirror `optimizingworkflow/WhereAIFitsSection.tsx`. The SimulatedTerminal emulation mirrors `toolslandscape/AgenticLoopSection.tsx` (terminal content English). The bridge section mirrors `toolslandscape/ToolCategoriesSection.tsx` + CourseBridge.

- [ ] **Step 1: ModalitiesModelsSection.tsx** — expandable cards reading `useTranslation().modules.genaibeyondtext.modalitiesModels`, aria id `modalities-models`. Each card shows description + a `modelsLabel` + `item.models` line. Trailing plain-zinc takeaway. ITEM_META icons: `image`/`headphones`/`film`/`brain`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.genaibeyondtext.modalitiesModels.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'image', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'headphones', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'film', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'brain', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const ModalitiesModelsSection: React.FC = () => {
  const c = useTranslation().modules.genaibeyondtext.modalitiesModels
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="modalities-models">
      <h2 id="modalities-models" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
                <p className="text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">{c.modelsLabel}</strong> {item.models}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
```

- [ ] **Step 2: MultimodalAPISection.tsx** — SimulatedTerminal emulation reading `...multimodalAPI`, aria id `multimodal-api`. Terminal content English (mirror `toolslandscape/AgenticLoopSection.tsx`). Amber takeaway + SelfExplain.

```tsx
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Terminal content stays English by convention (matches AgenticLoopSection).
const TERMINAL_STEPS: TerminalStep[] = [
  {
    command: 'curl bedrock-runtime/.../converse  # vision: "extract the line items from this receipt as JSON"',
    output:
      'POST { "messages": [{ "role": "user", "content": [\n  { "image": { "format": "jpeg", "source": {...} } },\n  { "text": "Return line items as JSON: [{item, qty, price}]" }\n]}]}\n\n200 OK  (1.9s, ~1.2k input tokens + image)\n{ "items": [\n  { "item": "Coffee", "qty": 2, "price": 7.00 },\n  { "item": "Bagel",  "qty": 1, "price": 3.50 }\n], "total": 10.50 }',
    delay: 900,
  },
  {
    command: 'curl bedrock-runtime/.../invoke  # text-to-image: "on-brand hero image, navy + amber, minimal"',
    output:
      'POST { "prompt": "minimal hero image, navy and amber palette,\n        product on seamless background", "size": "1024x1024" }\n\n200 OK  (4.2s, billed per image)\n{ "images": ["s3://gen-assets/hero_8f3a.png"], "seed": 80421 }\n\nNote: image/video calls return a reference (or base64) — you store\nthe binary yourself. Cost is per-image/second, not per-token.',
    delay: 900,
  },
]

export const MultimodalAPISection: React.FC = () => {
  const c = useTranslation().modules.genaibeyondtext.multimodalAPI

  return (
    <section aria-labelledby="multimodal-api">
      <h2 id="multimodal-api" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <SimulatedTerminal steps={TERMINAL_STEPS} title="multimodal API — vision + image-gen" />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: ChoosingIntegratingSection.tsx** — expandable cards reading `...choosingIntegrating`, aria id `choosing-integrating`, `<CourseBridge target="industry" blurb={c.bridgeBlurb} />` after cards. ITEM_META icons: `globe`/`scale`/`shield`/`target`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.genaibeyondtext.choosingIntegrating.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'globe', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'scale', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'shield', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'target', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const ChoosingIntegratingSection: React.FC = () => {
  const c = useTranslation().modules.genaibeyondtext.choosingIntegrating
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="choosing-integrating">
      <h2 id="choosing-integrating" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <CourseBridge target="industry" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4: Module root.** Replace `src/modules/GenAIBeyondTextModule.tsx` with (dual-persona — branches on `useDifficulty()`; business branch renders quiz only for now, business sections land in Task 5):

```tsx
import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { ModalitiesModelsSection } from './genaibeyondtext/ModalitiesModelsSection'
import { MultimodalAPISection } from './genaibeyondtext/MultimodalAPISection'
import { ChoosingIntegratingSection } from './genaibeyondtext/ChoosingIntegratingSection'

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
```

- [ ] **Step 5: Icon check.** Verify `image`, `headphones`, `film`, `brain`, `globe`, `scale`, `shield`, `target`, `box` exist in `src/components/Icon.tsx` PATHS (`film` was added in Task 1). Report DONE_WITH_CONCERNS naming any missing.
- [ ] **Step 6:** Build + lint → PASS. Manual (Use AI / Technical → Generative AI Beyond Text):
  - 3 sections render; cards expand; model lines show.
  - The SimulatedTerminal runs both API calls.
  - Bridge "Under the hood" → The Industry Map navigates and back.
  - Quiz works.
- [ ] **Step 7: Commit**

```bash
git add src/modules/genaibeyondtext src/modules/GenAIBeyondTextModule.tsx
git commit -m "feat: Generative AI Beyond Text technical sections with multimodal-API emulation"
```

---

## Task 5: Business sections + wiring

**Files:** Create `src/modules/genaibeyondtext/ModalityUsesBusiness.tsx`, `PickTheToolBusiness.tsx`, `UseResponsiblyBusiness.tsx`; Modify `src/modules/GenAIBeyondTextModule.tsx`

- [ ] **Step 1: ModalityUsesBusiness.tsx** — expandable cards reading `...modalityUses`, aria id `modality-uses`, each card shows description + a `exampleLabel` + `item.example` line, trailing plain-zinc takeaway. ITEM_META icons: `image`/`headphones`/`film`/`brain` (same modality icons as technical section 1).

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.genaibeyondtext.modalityUses.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'image', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'headphones', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'film', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'brain', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const ModalityUsesBusiness: React.FC = () => {
  const c = useTranslation().modules.genaibeyondtext.modalityUses
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="modality-uses">
      <h2 id="modality-uses" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>{c.exampleLabel}</strong> {item.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
```

- [ ] **Step 2: PickTheToolBusiness.tsx** — InteractiveDemo emulation reading `...pickTheTool`, aria id `pick-the-tool`, over `scenarios` (request / pick / why / watch). Mirrors `optimizingworkflow/PickingToolsBusiness` shape but with a `watchLabel`/`watch` line. SelfExplain at the end. Scenario colors as in PickingToolsBusiness.

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Order matches `scenarios` in useTranslation().modules.genaibeyondtext.pickTheTool.
const SCENARIO_COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
]

export const PickTheToolBusiness: React.FC = () => {
  const c = useTranslation().modules.genaibeyondtext.pickTheTool

  return (
    <section aria-labelledby="pick-the-tool">
      <h2 id="pick-the-tool" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.scenarios.map((s, i) => (
          <div key={i} className={`rounded-lg border p-5 ${SCENARIO_COLORS[i]}`}>
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{s.request}</p>
            <div className="mb-3 inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">{c.recommendLabel} {s.pick}</div>
            <p className="mb-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{s.why}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-700 dark:text-zinc-300">{c.watchLabel}</strong> {s.watch}</p>
          </div>
        ))}
      />
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: UseResponsiblyBusiness.tsx** — expandable cards reading `...useResponsibly`, aria id `use-responsibly`, `<CourseBridge target="industry" blurb={c.bridgeBlurb} />` after cards. ITEM_META icons: `chat`/`scale`/`check`/`bolt`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.genaibeyondtext.useResponsibly.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'chat', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'scale', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'check', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'bolt', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const UseResponsiblyBusiness: React.FC = () => {
  const c = useTranslation().modules.genaibeyondtext.useResponsibly
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="use-responsibly">
      <h2 id="use-responsibly" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <CourseBridge target="industry" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4:** In `GenAIBeyondTextModule.tsx` add imports for the three business sections and insert them in the business branch before the KnowledgeCheck:

```tsx
        <ModalityUsesBusiness />
        <PickTheToolBusiness />
        <UseResponsiblyBusiness />
```

- [ ] **Step 5: Icon check.** Verify `chat`, `scale`, `check`, `bolt` exist (image/headphones/film/brain checked in Task 4). Report DONE_WITH_CONCERNS if any missing.
- [ ] **Step 6:** Build + lint → PASS. Manual (Use AI / Business → Generative AI Beyond Text): 3 sections + InteractiveDemo (step it) + bridge ("Under the hood" → Who Makes What) + quiz; persona toggle flips section sets.
- [ ] **Step 7: Commit**

```bash
git add src/modules/genaibeyondtext src/modules/GenAIBeyondTextModule.tsx
git commit -m "feat: Generative AI Beyond Text business sections with pick-the-tool emulation"
```

---

## Task 6: SV/KO content translations

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

- [ ] **Step 1:** Add a `// MT`-marked `genaibeyondtext` subtree to each file after the `agenticwork` entry, mirroring the EN structure from Task 3 exactly. Translator writes faithful, complete, native-register translations (SV du-form; KO 합니다체) of EVERY prose field:
  - modalitiesModels: title, intro, modelsLabel, items[4]{name,tagline,description,models}, takeaway
  - multimodalAPI: title, intro, stepNote, takeaway, selfExplainPrompt, selfExplainAnswer
  - choosingIntegrating: title, intro, items[4]{name,tagline,description}, bridgeBlurb
  - modalityUses: title, intro, exampleLabel, items[4]{name,tagline,description,example}, takeaway
  - pickTheTool: title, intro, recommendLabel, watchLabel, scenarios[4]{request,pick,why,watch}, selfExplainPrompt, selfExplainAnswer
  - useResponsibly: title, intro, items[4]{name,tagline,description}, bridgeBlurb
  Array lengths 4/—/4/4/4/4. Model names (Stable Diffusion 3.5, FLUX, Whisper, Sora, Veo, GPT-5.x, Gemini 3.x, Claude, etc.), product names, modality item `name` fields (translate naturally: SV "Bild"/"Röst & ljud"/"Video"/"Multimodal"; KO "이미지"/"음성 & 오디오"/"비디오"/"멀티모달"), acronyms (TTS, STT, API, C2PA, SynthID, IVR) stay verbatim/standard; escape apostrophes. `DeepPartial<Translation>` catches structural mismatches.

- [ ] **Step 2:** Build + lint → PASS. Manual: SV/KO render in both personas; terminal output stays English.
- [ ] **Step 3: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Generative AI Beyond Text module"
```

---

## Task 7: Quiz + SelfExplain translations (legacy mechanism)

**Files:** Modify `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

- [ ] **Step 1:** In `src/quiz-translations.ts`, after the `// Agentic Work (Use AI course)` block, add a `// Generative AI Beyond Text (Use AI course)` block: `quizSv`/`quizKo` entries for `genai-1` (mc, correct index 1), `genai-2` (free: modelAnswer + `options: undefined`), `genai-biz-1` (mc, correct index 1), `genai-biz-2` (mc, correct index 1). Translate faithfully from the EN questions in `src/modules/GenAIBeyondTextModule.tsx`; option ORDER must match EN so correctIndex stays valid. SV du-form; KO 합니다체.

- [ ] **Step 2:** In `src/selfexplain-translations.ts`, add SV + KO entries for BOTH prompts (multimodalAPI.selfExplainPrompt and pickTheTool.selfExplainPrompt). Keys are `prompt.slice(0, 50)` of the EN prompts — compute each with node from the REAL en.ts strings before writing; watch for trailing spaces. Place SV entries before the sv record's closing `}`, KO entries before the ko record's closing `}`.

- [ ] **Step 3:** Build + lint → PASS. Manual: SV quiz + both SelfExplain prompts translated across personas.
- [ ] **Step 4: Commit**

```bash
git add src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: SV/KO quiz and SelfExplain translations for Generative AI Beyond Text"
```

---

## Task 8: Regression + gate + deploy (course finale)

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`. Check `git status` for stray verifier artifacts (no `@playwright/test` in package.json; no `test-results/`, `test_translations.*`) — revert/remove before the gate per memory `deploy-llm-academy`.
- [ ] **Step 2:** Browser regression (headless, memory `browser-verification-setup`; explicit `waitFor` on lazy headings):
  - Use AI / Technical: sidebar lists 5 modules; progress denominator 5; Generative AI Beyond Text present. ✔
  - Use AI / Business: sidebar lists 5 modules; Generative AI Beyond Text present (Agentic Coding hidden, Agentic Work shown). ✔
  - GenAI Beyond Text / Technical: 3 sections + SimulatedTerminal (runs both calls) + quiz; bridge → The Industry Map renders, back. ✔
  - GenAI Beyond Text / Business: 3 sections + InteractiveDemo (step it) + quiz; bridge → Who Makes What renders, back. ✔
  - `film` icon renders in the modality cards (no broken/empty icon). ✔
  - Deep link `#/use/business/genai-beyond-text` (fresh profile) resolves. ✔
  - All prior Use-AI modules, Understand course, SV/KO, dark mode unaffected. ✔
- [ ] **Step 3:** Final whole-branch code review (dispatch reviewer). Confirm: dual-persona module clean; bridge target business-visible both personas; the new `film` icon path valid; full i18n; no stray files.
- [ ] **Step 4:** Merge to main (--no-ff), verify build+lint on main, delete branch, commit plan doc, push.
- [ ] **Step 5:** Deploy per memory `deploy-llm-academy`: build → S3 sync → CloudFront invalidation `E2TWEQEC71DPUY` `/*`. Verify live `index-*.js` hash matches local and the live registry chunk lists `genai-beyond-text` (all 6 use modules).
- [ ] **Step 6: Update README.** The README's feature list / module count may reference the course; if it states a module count or lists Use-AI modules, update it to reflect the complete 6-module course. (Check first; skip if README doesn't enumerate.) Commit separately if changed:

```bash
git add README.md
git commit -m "docs: note complete 6-module Use AI course"
```

---

## Self-Review Notes

- **Spec coverage:** Phase 3 module 6 (B+T) with per-persona content (T: models & APIs; B: tools & use cases), one emulation each (SimulatedTerminal multimodal API for technical; InteractiveDemo pick-the-tool for business), quizzes both personas, bridge to The Industry Map, full i18n. This completes the v1 6-module course.
- **Back to dual-persona:** unlike 3c/3d, this module branches on `useDifficulty()` (like Tools Landscape). Business branch renders quiz-only after Task 4, full after Task 5.
- **New icon:** `film` added in Task 1 (16×16 path, film-strip). Used by the Video modality card in both the technical and business modality sections.
- **Bridge correctness:** `industry` is `understand`-course, both personas → never dead-ends; business label "Who Makes What", technical "The Industry Map"; heading "Under the hood".
- **Pattern fidelity:** card sections mirror WhereAIFitsSection (+ optional models/example line, like KeyPlayersBusiness's extra fields); SimulatedTerminal mirrors AgenticLoopSection; InteractiveDemo mirrors PickingToolsBusiness (+ a watch line). Two SelfExplain prompts this module (one per persona emulation) — Task 7 handles both keys.
- **Verifier hygiene:** per memory `deploy-llm-academy`, clean package.json/test-results before the gate.
- **Factual currency:** model names are illustrative of the 2026 landscape the rest of the app already uses (Industry module lists GPT-5.5, Gemini 3.1, Claude Opus 4.7, DeepSeek, Nova, etc.) — keep consistent with those, don't invent versions beyond what the app already cites.
