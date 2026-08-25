import { createFileRoute } from '@tanstack/react-router'

import { SiteNavigationA } from '#/components/SiteNavigation/SiteNavigationA'
import {
  Logo,
  Navigation,
  NavigationItem,
  NavigationItems,
  SignInButton,
} from '#/components/SiteNavigation/SiteNavigationB'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <h1 className="font-serif text-4xl font-bold tracking-tight">
        Compound components
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">A — Props-based</h2>
        <div className="overflow-hidden rounded-lg border">
          <SiteNavigationA
            showLogo
            showSignInButton
            navigationItems={[
              { label: 'Home', href: '#' },
              { label: 'About', href: '#' },
              { label: 'Contact', href: '#' },
            ]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">B — Compound</h2>
        <div className="overflow-hidden rounded-lg border">
          <Navigation>
            <Logo />
            <NavigationItems>
              <NavigationItem href="#">Home</NavigationItem>
              <NavigationItem href="#">About</NavigationItem>
              <NavigationItem href="#">Contact</NavigationItem>
            </NavigationItems>
            <SignInButton />
          </Navigation>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">B — Compound (defaults)</h2>
        <div className="overflow-hidden rounded-lg border">
          <Navigation />
        </div>
      </section>
    </div>
  )
}
