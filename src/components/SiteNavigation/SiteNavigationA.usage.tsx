import { SiteNavigationA } from '#/components/SiteNavigation/SiteNavigationA'

export const SiteNavigationAUsage = () => {
  return (
    <SiteNavigationA
      showLogo
      signin={{ show: true, onclick: () => alert('Handle sign in') }}
      navigationItems={[
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ]}
    />
  )
}
