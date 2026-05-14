import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

const CLOSED_POINTS = [
  { pro: true, text: 'Just works — sign up and start using it' },
  { pro: true, text: 'The company handles updates, security, and improvements' },
  { pro: true, text: 'Usually the most capable models' },
  { pro: true, text: "Enterprise-grade security (SOC 2, HIPAA) that most companies can't match in-house" },
  { pro: false, text: 'They control pricing — can increase anytime' },
  { pro: false, text: "If they change or shut down, you're stuck" },
]

const OPEN_POINTS = [
  { pro: true, text: 'Free to use — no per-use fees' },
  { pro: true, text: 'Full control — customize however you want' },
  { pro: true, text: 'No vendor lock-in — switch models freely' },
  { pro: false, text: 'Need technical staff to set up and maintain' },
  { pro: false, text: 'Security is YOUR responsibility — encryption, patching, access controls, compliance' },
  { pro: false, text: 'Usually slightly less capable than top closed models' },
]

export const OpenVsClosedBusiness: React.FC = () => {
  const c = useTranslation().modules.industry.openVsClosed
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
          {CLOSED_POINTS.map((item, i) => (
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
          {OPEN_POINTS.map((item, i) => (
            <p key={i} className="text-xs text-zinc-600 dark:text-zinc-400">
              <span className={item.pro ? 'text-emerald-400' : 'text-red-400'}>{item.pro ? '✓' : '✗'}</span> {item.text}
            </p>
          ))}
        </div>
      </div>
    </div>

    <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
      <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.realPictureTitle}</p>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.realPictureText}</p>
    </div>

    <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
  </section>
  )
}
