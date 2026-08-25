import { Shell } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'
import { cn } from '#/lib/utils'

type SiteNavigationAProps = {
  showLogo?: boolean
  navigationItems?: { label: string; href: string }[]
  showSignInButton?: boolean
}

export function SiteNavigationA({
  showLogo = false,
  navigationItems = [],
  showSignInButton = false,
}: SiteNavigationAProps) {
  return (
    <header className="border-b bg-background px-4 py-3">
      <nav className="flex items-center gap-6">
        {showLogo && (
          <a
            href="#"
            className="group flex items-center gap-2.5 rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Shell className="size-5" strokeWidth={2.25} />
            </span>
            <span className="text-lg font-semibold tracking-tight">My Site</span>
          </a>
        )}

        {navigationItems.length > 0 && (
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {showSignInButton && (
          <Button className="ml-auto" size="sm">
            Sign in
          </Button>
        )}
      </nav>
    </header>
  )
}
