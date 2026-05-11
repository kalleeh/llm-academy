import { useState, useCallback } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  size?: string
  annotation?: string
  content?: string
}

interface FileExplorerProps {
  tree: FileNode[]
  title?: string
}

const FILE_ICONS: Record<string, IconName> = {
  '.py': 'file',
  '.json': 'clipboard',
  '.safetensors': 'brain',
  '.bin': 'package',
  '.txt': 'file',
  '.md': 'edit',
  '.yaml': 'gear',
  '.yml': 'gear',
  '.toml': 'gear',
  '.csv': 'bar-chart',
  '.ts': 'file',
  '.tsx': 'file',
  '.js': 'file',
  '.jsx': 'file',
  '.css': 'palette',
  '.html': 'globe',
}

function getFileIcon(name: string): IconName {
  const ext = name.slice(name.lastIndexOf('.'))
  return FILE_ICONS[ext] ?? 'file'
}

function TreeNode({
  node,
  depth,
  onSelect,
  selectedFile,
}: {
  node: FileNode
  depth: number
  onSelect: (node: FileNode) => void
  selectedFile: string | null
}) {
  const [expanded, setExpanded] = useState(depth === 0)

  const handleClick = useCallback(() => {
    if (node.type === 'folder') {
      setExpanded(prev => !prev)
    } else {
      onSelect(node)
    }
  }, [node, onSelect])

  const isSelected = node.type === 'file' && selectedFile === node.name

  return (
    <li role="treeitem" aria-expanded={node.type === 'folder' ? expanded : undefined}>
      <button
        onClick={handleClick}
        className={`flex w-full items-center gap-1.5 rounded px-2 py-0.5 text-left text-sm transition-colors ${
          isSelected ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === 'folder' ? (
          <span className="w-4 text-center text-xs text-zinc-500">{expanded ? '▾' : '▸'}</span>
        ) : (
          <span className="w-4 text-center text-xs"><Icon name={getFileIcon(node.name)} size={14} /></span>
        )}
        {node.type === 'folder' && <Icon name="folder" size={14} />}
        <span className={node.type === 'folder' ? 'font-medium text-zinc-800 dark:text-zinc-200' : ''}>
          {node.name}
        </span>
        {node.size && <span className="ml-auto text-xs text-zinc-500">{node.size}</span>}
        {node.annotation && (
          <span className="ml-2 text-xs text-amber-700 dark:text-amber-400/80 italic">{node.annotation}</span>
        )}
      </button>
      {node.type === 'folder' && expanded && node.children && (
        <ul role="group">
          {node.children.map(child => (
            <TreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedFile={selectedFile}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ tree, title }) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  const handleSelect = useCallback((node: FileNode) => {
    setSelectedFile(prev => (prev?.name === node.name ? null : node))
  }, [])

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      {title && (
        <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{title}</span>
        </div>
      )}
      <div className="flex">
        <div className="min-w-0 flex-1 bg-white dark:bg-zinc-900 py-2">
          <ul role="tree" aria-label={title ?? 'File explorer'}>
            {tree.map(node => (
              <TreeNode
                key={node.name}
                node={node}
                depth={0}
                onSelect={handleSelect}
                selectedFile={selectedFile?.name ?? null}
              />
            ))}
          </ul>
        </div>
        {selectedFile?.content && (
          <div className="w-1/2 border-l border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 p-4">
            <div className="mb-2 font-mono text-xs text-zinc-500">{selectedFile.name}</div>
            <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs text-zinc-700 dark:text-zinc-300">
              {selectedFile.content}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
