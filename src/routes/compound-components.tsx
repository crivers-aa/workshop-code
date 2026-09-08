import { createFileRoute } from '@tanstack/react-router'

import { BackToWorkshop } from '#/components/BackToWorkshop'
import { BrowserWindow } from '#/components/BrowserWindow'
import { ExampleHeader } from '#/components/ExampleHeader'
import { SiteNavigationAUsage } from '#/components/SiteNavigation/SiteNavigationA.usage'
import { SiteNavigationBUsage } from '#/components/SiteNavigation/SiteNavigationB.usage'

export const Route = createFileRoute('/compound-components')({
  component: CompoundComponents,
})

function CompoundComponents() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <div className="space-y-4">
        <BackToWorkshop />
        <h1 className="text-4xl font-bold tracking-tight">
          Compound components
        </h1>
      </div>

      <section className="space-y-4">
        <ExampleHeader badge="A" title="Props-based" />
        <BrowserWindow url="mysite.com">
          <SiteNavigationAUsage />
        </BrowserWindow>
      </section>

      <section className="space-y-4">
        <ExampleHeader badge="B" title="Compound" />
        <BrowserWindow url="mysite.com">
          <SiteNavigationBUsage />
        </BrowserWindow>
      </section>
    </div>
  )
}
