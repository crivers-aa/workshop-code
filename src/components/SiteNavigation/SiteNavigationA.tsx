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
          <span className="text-lg font-semibold tracking-tight">Acme</span>
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
