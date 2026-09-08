import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { Button } from '#/components/ui/button'

export function BackToWorkshop({ className }: { className?: string }) {
  return (
    <Button variant="outline" size="icon" className={className} asChild>
      <Link to="/" aria-label="Back to workshop">
        <ArrowLeft />
      </Link>
    </Button>
  )
}
