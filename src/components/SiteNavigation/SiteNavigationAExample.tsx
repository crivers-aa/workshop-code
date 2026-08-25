import { SiteNavigationA } from '#/components/SiteNavigation/SiteNavigationA'

export function SiteNavigationAExample() {
  return (
    <SiteNavigationA
      showLogo
      showSignInButton
      navigationItems={[
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ]}
    />
  )
}
