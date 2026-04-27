import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { guardrailsSv, guardrailsKo } from './translations'

const GUARDRAILS = [
  { risk: 'Hallucination (making things up)', mitigation: 'Require the AI to cite sources. Use RAG so it answers from your documents, not memory. Have humans spot-check answers.', analogy: 'Like requiring footnotes on a report — if they can\'t cite it, they can\'t claim it.' },
  { risk: 'Bias (unfair patterns)', mitigation: 'Audit AI decisions regularly. Test with diverse inputs. Have clear escalation paths when bias is detected.', analogy: 'Like auditing your hiring process — check the outcomes, not just the intentions.' },
  { risk: 'Data leaks (sharing secrets)', mitigation: 'Control what data the AI can access. Use self-hosted models for sensitive data. Never paste confidential info into public AI tools.', analogy: 'Like access controls on shared folders — not everyone sees everything.' },
  { risk: 'Harmful content (going off-script)', mitigation: 'Set clear boundaries on what the AI can discuss. Add content filters. Test with adversarial inputs ("red teaming").', analogy: 'Like a customer service script — define what\'s in-bounds and what gets escalated to a manager.' },
]

export const GuardrailsBusiness: React.FC = () => {
  const c = useT({ title: '2. Keeping AI Safe — The Guardrails' , guardrails: GUARDRAILS, intro: 'Every company has rules for employees', introSub: 'Think of it like onboarding', goldenRule: 'Start tight, loosen gradually.', goldenRuleDetail: 'Launch with human review on everything.', platformNote: 'Cloud platforms offer built-in guardrail tools'}, { sv: guardrailsSv, ko: guardrailsKo })
  return (
  <section aria-labelledby="guardrails-biz">
    <h2 id="guardrails-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>
    <p className="mb-6 max-w-2xl text-sm text-zinc-400">{c.introSub}</p>

    <div className="mb-8 overflow-hidden rounded-lg border border-zinc-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800">
            <th className="px-4 py-2 text-left text-xs font-medium text-zinc-400">Risk</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-zinc-400">How to prevent it</th>
            <th className="hidden px-4 py-2 text-left text-xs font-medium text-zinc-400 sm:table-cell">Think of it like…</th>
          </tr>
        </thead>
        <tbody>
          {c.guardrails.map((g) => (
            <tr key={g.risk} className="border-b border-zinc-800 last:border-0">
              <td className="px-4 py-3 font-medium text-zinc-200">{g.risk}</td>
              <td className="px-4 py-3 text-zinc-300">{g.mitigation}</td>
              <td className="hidden px-4 py-3 text-zinc-500 italic sm:table-cell">{g.analogy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
      <p className="mb-3 text-sm font-medium text-zinc-100">{c.goldenRule}</p>
      <p className="mb-3 text-sm leading-relaxed text-zinc-300">{c.goldenRuleDetail}</p>
      <p className="text-sm text-zinc-400">{c.platformNote}</p>
    </div>

    <SelfExplain
      prompt="Your company is about to launch a customer-facing AI chatbot. What guardrails would you put in place before going live? Think about what could go wrong and how to prevent it."
      modelAnswer="I'd put these guardrails in place: (1) Limit scope — the chatbot only answers questions about our products and policies, and says 'let me connect you with a human' for anything else. (2) Source requirement — it must pull answers from our approved knowledge base, not make things up. (3) Human review — for the first month, a team member reviews every conversation daily and flags issues. (4) Escalation — any question about billing, complaints, or legal topics gets routed to a human immediately. (5) Content filter — block any inappropriate language in both directions. (6) Monitoring dashboard — track customer satisfaction, accuracy, and escalation rates. Start cautious, then expand what the bot handles as we build confidence."
    />
  </section>
  )
}
