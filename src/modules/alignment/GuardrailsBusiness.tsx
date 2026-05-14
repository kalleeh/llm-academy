import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

export const GuardrailsBusiness: React.FC = () => {
  const c = useTranslation().modules.alignment.guardrails
  return (
    <section aria-labelledby="guardrails-biz">
      <h2 id="guardrails-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.introSub}</p>

      <div className="mb-8 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              <th className="px-4 py-2 text-left text-xs font-medium text-zinc-600 dark:text-zinc-400">Risk</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-zinc-600 dark:text-zinc-400">How to prevent it</th>
              <th className="hidden px-4 py-2 text-left text-xs font-medium text-zinc-600 dark:text-zinc-400 sm:table-cell">Think of it like…</th>
            </tr>
          </thead>
          <tbody>
            {c.guardrails.map((g) => (
              <tr key={g.risk} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">{g.risk}</td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{g.mitigation}</td>
                <td className="hidden px-4 py-3 text-zinc-500 italic sm:table-cell">{g.analogy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.goldenRule}</p>
        <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{c.goldenRuleDetail}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{c.platformNote}</p>
      </div>

      <SelfExplain
        prompt="Your company is about to launch a customer-facing AI chatbot. What guardrails would you put in place before going live? Think about what could go wrong and how to prevent it."
        modelAnswer="I'd put these guardrails in place: (1) Limit scope — the chatbot only answers questions about our products and policies, and says 'let me connect you with a human' for anything else. (2) Source requirement — it must pull answers from our approved knowledge base, not make things up. (3) Human review — for the first month, a team member reviews every conversation daily and flags issues. (4) Escalation — any question about billing, complaints, or legal topics gets routed to a human immediately. (5) Content filter — block any inappropriate language in both directions. (6) Monitoring dashboard — track customer satisfaction, accuracy, and escalation rates. Start cautious, then expand what the bot handles as we build confidence."
      />
    </section>
  )
}
