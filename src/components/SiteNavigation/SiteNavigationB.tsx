import { Children, type ComponentProps, type ReactNode } from 'react'
import { Shell } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem as ShadcnNavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'
import { cn } from '#/lib/utils'

export const Navigation = ({ children }: { children?: ReactNode }) => {
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

export const Logo = ({ children }: { children?: ReactNode }) => {
  return (
    <a
      href="#"
      className="group flex items-center gap-2.5 rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <Shell className="size-5" strokeWidth={2.25} />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        {children ?? 'My Site'}
      </span>
    </a>
  )
}

export const NavigationItems = ({ children }: { children?: ReactNode }) => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenu>
  )
}

export const NavigationItem = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => {
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

export const SignInButton = ({
  children,
  className,
  size = 'sm',
  ...props
}: ComponentProps<typeof Button>) => {
  return (
    <Button className={cn('ml-auto', className)} size={size} {...props}>
      {children ?? 'Sign in'}
    </Button>
  )
}

