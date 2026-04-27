import { useState, useCallback, useMemo } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

interface Token {
  text: string
  type: 'keyword' | 'string' | 'comment' | 'number' | 'default'
}

const KEYWORDS: Record<string, Set<string>> = {
  python: new Set([
    'def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while',
    'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'with', 'as', 'try',
    'except', 'finally', 'raise', 'yield', 'lambda', 'pass', 'break', 'continue', 'self',
  ]),
  javascript: new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class',
    'import', 'export', 'from', 'default', 'new', 'this', 'async', 'await', 'try',
    'catch', 'finally', 'throw', 'typeof', 'instanceof', 'null', 'undefined', 'true', 'false',
  ]),
  typescript: new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class',
    'import', 'export', 'from', 'default', 'new', 'this', 'async', 'await', 'try',
    'catch', 'finally', 'throw', 'typeof', 'instanceof', 'null', 'undefined', 'true', 'false',
    'interface', 'type', 'enum', 'implements', 'extends', 'readonly', 'as',
  ]),
}

function tokenizeLine(line: string, language: string): Token[] {
  const tokens: Token[] = []
  const kw = KEYWORDS[language] ?? KEYWORDS['python']!
  const commentChar = language === 'python' ? '#' : '//'

  let i = 0
  while (i < line.length) {
    // Comment
    if (line.slice(i).startsWith(commentChar)) {
      tokens.push({ text: line.slice(i), type: 'comment' })
      break
    }
    // String (single or double quote)
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i]
      let j = i + 1
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++
        j++
      }
      tokens.push({ text: line.slice(i, j + 1), type: 'string' })
      i = j + 1
      continue
    }
    // Number
    if (/\d/.test(line[i]) && (i === 0 || /[\s,(\[{=:+\-*/]/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.e_]/.test(line[j])) j++
      tokens.push({ text: line.slice(i, j), type: 'number' })
      i = j
      continue
    }
    // Word (potential keyword)
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++
      const word = line.slice(i, j)
      tokens.push({ text: word, type: kw.has(word) ? 'keyword' : 'default' })
      i = j
      continue
    }
    // Default character
    tokens.push({ text: line[i], type: 'default' })
    i++
  }
  return tokens
}

const TOKEN_COLORS: Record<Token['type'], string> = {
  keyword: 'text-purple-400',
  string: 'text-green-400',
  comment: 'text-zinc-500 italic',
  number: 'text-amber-300',
  default: 'text-zinc-200',
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', title }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  const lines = useMemo(() => code.split('\n'), [code])
  const tokenizedLines = useMemo(
    () => lines.map(line => tokenizeLine(line, language)),
    [lines, language],
  )

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700">
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">{title}</span>
          <button
            onClick={handleCopy}
            className="rounded px-2 py-0.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
            aria-label="Copy code"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      <div className="relative overflow-x-auto bg-zinc-900">
        {!title && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 rounded px-2 py-0.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
            aria-label="Copy code"
          >
            {copied ? '✓' : 'Copy'}
          </button>
        )}
        <table className="w-full border-collapse font-mono text-sm" role="presentation">
          <tbody>
            {tokenizedLines.map((tokens, i) => (
              <tr key={i} className="hover:bg-zinc-800/50">
                <td className="select-none border-r border-zinc-800 px-3 py-0 text-right text-xs text-zinc-600">
                  {i + 1}
                </td>
                <td className="px-4 py-0 whitespace-pre">
                  {tokens.map((token, j) => (
                    <span key={j} className={TOKEN_COLORS[token.type]}>
                      {token.text}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
