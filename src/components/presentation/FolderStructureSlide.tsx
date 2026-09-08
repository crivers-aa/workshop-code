import { File, Folder } from 'lucide-react'

import { cn } from '#/lib/utils'

export type FolderNode = {
  name: string
  kind?: 'folder' | 'file'
  highlight?: boolean
  children?: FolderNode[]
}

function nodeKind(node: FolderNode): 'folder' | 'file' {
  return node.kind ?? (node.children?.length ? 'folder' : 'file')
}

function TreeNode({ node, depth }: { node: FolderNode; depth: number }) {
  const kind = nodeKind(node)
  const Icon = kind === 'folder' ? Folder : File

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg px-2 py-1',
          node.highlight && 'bg-primary/10 text-primary',
        )}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
      >
        <Icon
          className={cn(
            'size-4 shrink-0',
            kind === 'folder' && !node.highlight && 'text-amber-600',
            kind === 'file' && !node.highlight && 'text-muted-foreground',
          )}
          aria-hidden="true"
        />
        <span className={cn(node.highlight && 'font-semibold')}>{node.name}</span>
      </div>
      {node.children?.map((child) => (
        <TreeNode key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export function FolderStructureSlide({
  title,
  tree,
}: {
  title: string
  tree: FolderNode[]
}) {
  return (
    <div className="flex h-full flex-col justify-center px-16 py-12">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      <div className="mt-10 max-w-2xl rounded-2xl border border-border/70 bg-muted/30 p-6 font-mono text-lg">
        {tree.map((node) => (
          <TreeNode key={node.name} node={node} depth={0} />
        ))}
      </div>
    </div>
  )
}
