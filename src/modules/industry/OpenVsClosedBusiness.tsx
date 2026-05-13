import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { openVsClosedSv, openVsClosedKo } from './translations'

export const OpenVsClosedBusiness: React.FC = () => {
  const c = useT({
    title: '2. Open vs Closed AI — What It Means for You',
    intro: 'Some AI models are closed (you pay to use them) and some are open (free to download and run yourself). Think of it like Microsoft Office vs LibreOffice, or iPhone vs Android.',
    closedTitle: 'Closed models (GPT-4o, Claude, Gemini)',
    closedSubtitle: 'Like using Microsoft Office 365',
    openTitle: 'Open models (Llama, Mistral, DeepSeek)',
    openSubtitle: 'Like using Android or LibreOffice',
    realPictureTitle: 'The real picture: it is not black and white',
    realPictureText: 'The open = private, closed = risky framing is outdated.',
    selfExplainPrompt: 'Your CTO says we should use open-source AI to avoid vendor lock-in. What are the trade-offs?',
    selfExplainAnswer: '',
  }, { sv: openVsClosedSv, ko: openVsClosedKo })
  return (
  <section aria-labelledby="ovc-biz">
    <h2 id="ovc-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
      {c.intro}
    </p>

    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-5">
        <p className="mb-2 text-sm font-semibold text-blue-300">{c.closedTitle}</p>
        <p className="mb-3 text-xs text-zinc-500">{c.closedSubtitle}</p>
        <div className="space-y-2">
          {[
            { pro: true, text: 'Just works — sign up and start using it' },
            { pro: true, text: 'The company handles updates, security, and improvements' },
            { pro: true, text: 'Usually the most capable models' },
            { pro: true, text: 'Enterprise-grade security (SOC 2, HIPAA) that most companies can\'t match in-house' },
            { pro: false, text: 'They control pricing — can increase anytime' },
            { pro: false, text: 'If they change or shut down, you\'re stuck' },
          ].map((item, i) => (
            <p key={i} className="text-xs text-zinc-600 dark:text-zinc-400">
              <span className={item.pro ? 'text-emerald-400' : 'text-red-400'}>{item.pro ? '✓' : '✗'}</span> {item.text}
            </p>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-semibold text-amber-300">{c.openTitle}</p>
        <p className="mb-3 text-xs text-zinc-500">{c.openSubtitle}</p>
        <div className="space-y-2">
          {[
            { pro: true, text: 'Free to use — no per-use fees' },
            { pro: true, text: 'Full control — customize however you want' },
            { pro: true, text: 'No vendor lock-in — switch models freely' },
            { pro: false, text: 'Need technical staff to set up and maintain' },
            { pro: false, text: 'Security is YOUR responsibility — encryption, patching, access controls, compliance' },
            { pro: false, text: 'Usually slightly less capable than top closed models' },
          ].map((item, i) => (
            <p key={i} className="text-xs text-zinc-600 dark:text-zinc-400">
              <span className={item.pro ? 'text-emerald-400' : 'text-red-400'}>{item.pro ? '✓' : '✗'}</span> {item.text}
            </p>
          ))}
        </div>
      </div>
    </div>

    <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
      <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.realPictureTitle}</p>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        {c.realPictureText} Many companies are more secure using a well-audited cloud
        service than running their own infrastructure.
      </p>
    </div>

    <SelfExplain
      prompt="Your CTO says 'we should use open-source AI to avoid vendor lock-in.' What are the trade-offs you'd want to discuss before making that decision?"
      modelAnswer="I'd raise these points: (1) We avoid vendor lock-in and per-use costs, but we take on maintenance responsibility — do we have the technical staff? (2) Data privacy is better since nothing leaves our servers, which matters for our regulated data. (3) Open models are slightly less capable for complex tasks — we should test with our actual use cases. (4) Setup takes weeks vs hours for an API. (5) A hybrid approach might work: use open models for high-volume, simple tasks (cost savings) and closed APIs for complex, low-volume tasks (best quality). (6) We should factor in the total cost: GPU hosting isn't free, even if the model is."
    />
  </section>
  )
}
