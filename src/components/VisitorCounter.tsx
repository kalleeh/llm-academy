import { useEffect, useState } from 'react'

interface Stats {
  total: number
  countries: { code: string; count: number }[]
}

const STORAGE_KEY = 'llm-academy-visitor-counted'
const TOP_COUNTRIES = 3

function countryName(code: string): string {
  if (code === 'XX') return 'Unknown'
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}

export function VisitorCounter() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    let cancelled = false
    let alreadyCounted = false
    try {
      alreadyCounted = localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // storage unavailable: treat as a returning visitor to avoid inflating the count
      alreadyCounted = true
    }

    fetch('/api/visit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ new: !alreadyCounted }),
    })
      .then((res) => (res.ok ? (res.json() as Promise<Stats>) : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (cancelled) return
        if (!alreadyCounted) {
          try {
            localStorage.setItem(STORAGE_KEY, '1')
          } catch {
            // ignore
          }
        }
        setStats(data)
      })
      .catch(() => {
        // counter unavailable (e.g. local dev): render nothing
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (!stats) return null

  const top = stats.countries.slice(0, TOP_COUNTRIES)

  return (
    <aside
      aria-label="Visitor statistics"
      className="fixed right-4 bottom-4 z-20 max-w-[calc(100vw-2rem)] rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-xs text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400"
    >
      <p>
        Unique visitors:{' '}
        <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">{stats.total.toLocaleString()}</span>
      </p>
      {top.length > 0 && (
        <p className="mt-0.5 text-zinc-500">
          {top.map((c) => `${countryName(c.code)} ${c.count.toLocaleString()}`).join(' · ')}
        </p>
      )}
    </aside>
  )
}
