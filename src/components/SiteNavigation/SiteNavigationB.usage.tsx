import {
  Logo,
  Navigation,
  NavigationItem,
  NavigationItems,
  SignInButton,
} from '#/components/SiteNavigation/SiteNavigationB'

export const SiteNavigationBUsage = () => {
  return (
    <Navigation>
      <Logo />
      <NavigationItems>
        <NavigationItem href="#">Home</NavigationItem>
        <NavigationItem href="#">About</NavigationItem>
        <NavigationItem href="#">Contact</NavigationItem>
      </NavigationItems>
      <SignInButton onClick={() => alert('Handle sign in')} />
    </Navigation>
  )
}

