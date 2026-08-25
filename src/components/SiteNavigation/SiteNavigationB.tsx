import { Children, type ReactNode } from 'react'

import { Button } from '#/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem as ShadcnNavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'
import { cn } from '#/lib/utils'

function Navigation({ children }: { children?: ReactNode }) {
  const hasChildren = Children.count(children) > 0

  return (
    <header className="border-b bg-background px-4 py-3">
      <nav className="flex items-center gap-6">
        {hasChildren ? (
          children
        ) : (
          <>
            <Logo />
            <NavigationItems>
              <NavigationItem href="#">Home</NavigationItem>
              <NavigationItem href="#">About</NavigationItem>
            </NavigationItems>
            <SignInButton />
          </>
        )}
      </nav>
    </header>
  )
}

function Logo({ children }: { children?: ReactNode }) {
  return (
    <span className="text-lg font-semibold tracking-tight">
      {children ?? 'Acme'}
    </span>
  )
}

function NavigationItems({ children }: { children?: ReactNode }) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenu>
  )
}

function NavigationItem({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <ShadcnNavigationMenuItem>
      <NavigationMenuLink
        href={href}
        className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
      >
        {children}
      </NavigationMenuLink>
    </ShadcnNavigationMenuItem>
  )
}

function SignInButton({ children }: { children?: ReactNode }) {
  return (
    <Button className="ml-auto" size="sm">
      {children ?? 'Sign in'}
    </Button>
  )
}

export { Navigation, Logo, NavigationItems, NavigationItem, SignInButton }
