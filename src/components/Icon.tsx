/**
 * Icon library for LLM Academy.
 *
 * Monochrome inline SVGs that inherit `currentColor` so they blend with
 * the surrounding text.  Every icon is a 16×16 viewBox rendered at 1em
 * by default — drop-in replacements for the emoji characters they replace.
 *
 * Usage:
 *   <Icon name="box" />                     // inherits text color
 *   <Icon name="box" className="text-amber-400" />
 *   <Icon name="box" size={20} />
 */
import type { FC, SVGProps } from 'react'

// ── SVG path data keyed by icon name ────────────────────────────────────────
// Each entry is [viewBox-size, ...path-d-strings].
// All paths use stroke="currentColor" unless noted.
const PATHS: Record<string, [number, ...string[]]> = {
  // ── Training loop stages ──────────────────────────────────────────────────
  // 📦 box / batch / package
  box: [16, 'M2 5l6-3 6 3v6l-6 3-6-3V5z M8 2v6 M2 5l6 3 M14 5l-6 3'],
  // ➡️ forward arrow
  'arrow-right': [16, 'M2 8h12 M10 4l4 4-4 4'],
  // ⬅️ backward arrow
  'arrow-left': [16, 'M14 8H2 M6 4L2 8l4 4'],
  // 📉 loss / chart-down
  'chart-down': [16, 'M2 2v12h12 M4 6l3 2 3-4 4 6'],
  // 🔧 wrench / update weights
  wrench: [16, 'M5.5 10.5l-3 3a1.5 1.5 0 002.1 2.1l3-3 M10 2a4 4 0 00-4 4l4 4a4 4 0 004-4 M6 10l4-4'],

  // ── File types ────────────────────────────────────────────────────────────
  // 📄 document / file
  file: [16, 'M4 1h5l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z M9 1v4h4'],
  // 📁 folder
  folder: [16, 'M2 4a1 1 0 011-1h4l2 2h4a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V4z'],
  // 📋 clipboard / json
  clipboard: [16, 'M5 2h6a1 1 0 011 1v1H4V3a1 1 0 011-1z M3 4h10a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z M6 8h4 M6 10h3'],
  // 📝 edit / markdown
  edit: [16, 'M11 2l3 3-8 8H3v-3l8-8z M9 4l3 3'],
  // 📊 chart / data
  'bar-chart': [16, 'M2 14h12 M4 14V8 M7 14V5 M10 14V9 M13 14V3'],
  // 🧠 brain / model weights
  brain: [16, 'M8 2a5 5 0 00-4 8l4 4 4-4A5 5 0 008 2z M6 6c0-1 1-2 2-2s2 1 2 2 M5 9h6'],
  // 📦 package / binary
  package: [16, 'M2 5l6-3 6 3v6l-6 3-6-3V5z M8 2v6 M2 5l6 3 M14 5l-6 3'],
  // 🌐 globe / web / html
  globe: [16, 'M8 1a7 7 0 100 14A7 7 0 008 1z M1 8h14 M8 1c-2 2-3 4.5-3 7s1 5 3 7 M8 1c2 2 3 4.5 3 7s-1 5-3 7'],
  // 🎨 palette / css
  palette: [16, 'M8 1a7 7 0 106 11c-1 0-2-1-1-2l1-2a3 3 0 00-3-3H8a5 5 0 010-4z M5 8a1 1 0 100-2 1 1 0 000 2z M7 5a1 1 0 100-2 1 1 0 000 2z M10 5a1 1 0 100-2 1 1 0 000 2z'],
  // 🗄️ database / storage
  database: [16, 'M3 3c0-1.1 2.2-2 5-2s5 .9 5 2v10c0 1.1-2.2 2-5 2s-5-.9-5-2V3z M3 7c0 1.1 2.2 2 5 2s5-.9 5-2 M3 11c0 1.1 2.2 2 5 2s5-.9 5-2'],

  // ── Concepts ──────────────────────────────────────────────────────────────
  // 🔍 search / magnifier
  search: [16, 'M6.5 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11z M11 11l4 4'],
  // 🤖 robot / AI / LLM
  robot: [16, 'M4 6h8a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z M8 3v3 M8 1a1 1 0 100 2 1 1 0 000-2z M6 10h1 M9 10h1 M1 9h1 M14 9h1'],
  // 💬 chat / message
  chat: [16, 'M3 2h10a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 3V3a1 1 0 011-1z'],
  // ⚡ lightning / fast
  bolt: [16, 'M9 1L4 9h4l-1 6 5-8H8l1-6z'],
  // 🎯 target / precision
  target: [16, 'M8 2a6 6 0 100 12A6 6 0 008 2z M8 5a3 3 0 100 6 3 3 0 000-6z M8 7a1 1 0 100 2 1 1 0 000-2z'],
  // 💡 lightbulb / idea
  lightbulb: [16, 'M8 1a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9z M6 13h4 M6 14h4'],
  // 🔗 link / chain
  link: [16, 'M6 8h4 M4.5 10.5a3 3 0 010-5l2-2a3 3 0 014.2 0 M11.5 5.5a3 3 0 010 5l-2 2a3 3 0 01-4.2 0'],
  // 🔄 cycle / refresh
  cycle: [16, 'M2 8a6 6 0 0111-4 M14 8a6 6 0 01-11 4 M2 4V8h4 M14 12V8h-4'],
  // 🚀 rocket / deploy
  rocket: [16, 'M8 14l-2-2c-3-3-3-7 0-10l2-1 2 1c3 3 3 7 0 10l-2 2z M6 10l-3 1 M10 10l3 1 M8 6a1 1 0 100 2 1 1 0 000-2z'],
  // 🧪 flask / experiment
  flask: [16, 'M6 1h4 M6 1v5L2 13a1 1 0 001 2h10a1 1 0 001-2L10 6V1 M4 10h8'],
  // 📈 trend-up
  'trend-up': [16, 'M2 14l4-5 3 2 5-8 M11 3h3v3'],
  // 📏 ruler / measure
  ruler: [16, 'M2 6h12v4H2V6z M5 6v4 M8 6v2 M11 6v4'],
  // 🎮 gamepad / gaming
  gamepad: [16, 'M2 7a3 3 0 013-3h6a3 3 0 013 3v2a3 3 0 01-3 3H5a3 3 0 01-3-3V7z M6 6v4 M4 8h4 M11 7v1 M13 7v1'],
  // 👥 people / human eval
  people: [16, 'M5 7a2 2 0 100-4 2 2 0 000 4z M11 7a2 2 0 100-4 2 2 0 000 4z M1 14c0-2.2 1.8-4 4-4s4 1.8 4 4 M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4'],
  // 🛡️ shield / safety
  shield: [16, 'M8 1L2 4v4c0 4 2.5 6.5 6 8 3.5-1.5 6-4 6-8V4L8 1z'],
  // 🧩 puzzle / adapter / LoRA
  puzzle: [16, 'M6 2h4v2a2 2 0 110 4v2H6V8a2 2 0 110-4V2z M2 6h2a2 2 0 010 4H2 M12 6h2v4h-2a2 2 0 010-4z'],
  // 🏗️ construction / build from scratch
  build: [16, 'M2 14h12 M4 14V8l4-6 4 6v6 M7 14v-3h2v3 M6 8h4'],
  // 📚 books / continued pretraining
  books: [16, 'M2 2h4v12H2V2z M6 2h4v12H6V2z M10 2h4v12h-4V2z M4 5h0 M8 5h0 M12 5h0'],
  // 💻 laptop / code
  laptop: [16, 'M3 3h10a1 1 0 011 1v7H2V4a1 1 0 011-1z M1 12h14a1 1 0 010 2H1a1 1 0 010-2z'],
  // 📱 mobile / on-device
  mobile: [16, 'M5 1h6a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V2a1 1 0 011-1z M7 13h2'],
  // 🧠 reasoning / thinking
  thinking: [16, 'M8 2a5 5 0 00-4 8l4 4 4-4A5 5 0 008 2z M6 6c0-1 1-2 2-2s2 1 2 2 M5 9h6'],
  // 🔬 microscope / research
  microscope: [16, 'M8 1v6 M6 7h4 M5 10l3-3 3 3 M4 14h8 M8 10v4'],
  // 🧭 compass / navigation
  compass: [16, 'M8 1a7 7 0 100 14A7 7 0 008 1z M10 6l-4 2-2 4 4-2 2-4z'],
  // 🪞 mirror / reflection
  mirror: [16, 'M4 2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z M2 14h12 M6 5l4 4 M10 5l-4 4'],
  // ✂️ scissors / chunk
  scissors: [16, 'M4 4a2 2 0 100 4 2 2 0 000-4z M4 10a2 2 0 100 4 2 2 0 000-4z M6 5.5L14 2 M6 12.5L14 14'],
  // 🔢 numbers / embed
  numbers: [16, 'M3 3h3v4H3V3z M10 3h3v4h-3V3z M3 9h3v4H3V9z M10 9h3v4h-3V9z'],
  // 💉 inject / syringe
  inject: [16, 'M10 2l4 4-8 8-4-4 8-8z M6 10L2 14 M8 4l4 4'],
  // 🔢 quantize
  quantize: [16, 'M2 4h4v4H2V4z M10 4h4v4h-4V4z M6 10h4v4H6v-4z M2 2h2 M12 2h2 M2 14h2'],
  // 💾 save / store
  save: [16, 'M3 1h8l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z M5 1v4h5V1 M5 10h6v4H5v-4z'],
  // 🤏 small / compress
  compress: [16, 'M4 8h8 M8 4v8 M2 2l3 3 M14 2l-3 3 M2 14l3-3 M14 14l-3-3'],
  // 🏢 warehouse / enterprise
  warehouse: [16, 'M2 14V5l6-4 6 4v9 M6 14v-4h4v4 M6 7h1 M9 7h1'],
  // 🌊 lake / data lake
  lake: [16, 'M1 10c2-2 4 0 6-2s4 0 6-2 M1 13c2-2 4 0 6-2s4 0 6-2 M1 7c2-2 4 0 6-2s4 0 6-2'],
  // 🏠 local / on-prem
  home: [16, 'M2 8l6-6 6 6v6a1 1 0 01-1 1H3a1 1 0 01-1-1V8z M6 14v-4h4v4'],
  // 📥 ingest / download
  ingest: [16, 'M8 1v9 M4 7l4 4 4-4 M2 12h12v2H2v-2z'],
  // ⚙️ gear / process
  gear: [16, 'M8 5a3 3 0 100 6 3 3 0 000-6z M8 1v2 M8 13v2 M1 8h2 M13 8h2 M3 3l1.5 1.5 M11.5 11.5L13 13 M13 3l-1.5 1.5 M4.5 11.5L3 13'],
  // 🎧 headphones / audio
  headphones: [16, 'M3 8a5 5 0 0110 0 M3 8v4a2 2 0 002 2 M13 8v4a2 2 0 01-2 2 M1 10v2a2 2 0 002 2h1V8H3 M13 8h1a2 2 0 012 2v2a2 2 0 01-2 2h-1'],
  // 🏥 hospital / medical
  medical: [16, 'M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z M8 5v6 M5 8h6'],
  // ✉️ email / envelope
  envelope: [16, 'M2 4h12a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1z M2 4l6 5 6-5'],
  // 🖼️ image / picture
  image: [16, 'M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z M5 6a1 1 0 100 2 1 1 0 000-2z M15 10l-4-4-5 5'],
  // 🏷️ tag / label
  tag: [16, 'M1 8V2a1 1 0 011-1h6l6 7-6 6-7-6z M5 5a1 1 0 100 2 1 1 0 000-2z'],
  // 📗 book
  book: [16, 'M3 1h9a1 1 0 011 1v12H4a1 1 0 01-1-1V2a1 1 0 011-1z M3 12h10 M7 1v11'],
  // ⚖️ scale / balance
  scale: [16, 'M8 2v12 M2 6l6-2 6 2 M2 6l2 5h-4l2-5z M14 6l-2 5h4l-2-5z M5 14h6'],
  // 🖥️ monitor / terminal
  terminal: [16, 'M2 2h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z M5 14h6 M8 12v2 M5 6l2 2-2 2 M9 10h3'],
  // ⚠ warning
  warning: [16, 'M8 1L1 14h14L8 1z M8 6v4 M8 12h0'],
  // ❌ cross / error
  cross: [16, 'M4 4l8 8 M12 4l-8 8'],
  // ✓ check
  check: [16, 'M3 8l3 4 7-8'],
  // 🔌 plug / connector
  plug: [16, 'M6 2v4 M10 2v4 M4 6h8v3a4 4 0 01-8 0V6z M8 13v2'],
  // 🧱 block / dense
  block: [16, 'M2 4h5v4H2V4z M9 4h5v4H9V4z M2 10h5v4H2v-4z M9 10h5v4H9v-4z'],
}

// ── Component ───────────────────────────────────────────────────────────────
export type IconName = keyof typeof PATHS

interface IconProps extends SVGProps<SVGSVGElement> {
  /** Icon identifier — see PATHS keys above. */
  name: IconName
  /** Pixel size (width & height). Defaults to 16 (1em). */
  size?: number
}

export const Icon: FC<IconProps> = ({ name, size = 16, className = '', ...rest }) => {
  const entry = PATHS[name]
  if (!entry) return null
  const [vb, ...paths] = entry
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vb} ${vb}`}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
      {...rest}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

// ── Convenience: emoji-string → icon-name mapping ───────────────────────────
// Used by the migration to swap emojis for <Icon> components.
export const EMOJI_TO_ICON: Record<string, IconName> = {
  '📦': 'box',
  '➡️': 'arrow-right',
  '⬅️': 'arrow-left',
  '📉': 'chart-down',
  '🔧': 'wrench',
  '📄': 'file',
  '📁': 'folder',
  '📋': 'clipboard',
  '📝': 'edit',
  '📊': 'bar-chart',
  '🧠': 'brain',
  '🌐': 'globe',
  '🎨': 'palette',
  '🗄️': 'database',
  '🔍': 'search',
  '🤖': 'robot',
  '💬': 'chat',
  '⚡': 'bolt',
  '🎯': 'target',
  '💡': 'lightbulb',
  '🔗': 'link',
  '🔄': 'cycle',
  '🚀': 'rocket',
  '🧪': 'flask',
  '📈': 'trend-up',
  '📏': 'ruler',
  '🎮': 'gamepad',
  '👥': 'people',
  '🛡️': 'shield',
  '🧩': 'puzzle',
  '🏗️': 'build',
  '📚': 'books',
  '💻': 'laptop',
  '📱': 'mobile',
  '🔬': 'microscope',
  '🧭': 'compass',
  '🪞': 'mirror',
  '✂️': 'scissors',
  '🔢': 'numbers',
  '💉': 'inject',
  '💾': 'save',
  '🤏': 'compress',
  '🏢': 'warehouse',
  '🌊': 'lake',
  '🏠': 'home',
  '📥': 'ingest',
  '⚙️': 'gear',
  '🎧': 'headphones',
  '🏥': 'medical',
  '✉️': 'envelope',
  '🖼️': 'image',
  '🏷️': 'tag',
  '📗': 'book',
  '⚖️': 'scale',
  '🖥️': 'terminal',
  '🧱': 'block',
  '🔌': 'plug',
}
