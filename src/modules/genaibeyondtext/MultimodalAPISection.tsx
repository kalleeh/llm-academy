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
