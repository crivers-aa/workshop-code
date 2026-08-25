import { createFileRoute } from "@tanstack/react-router";

import { BrowserWindow } from "#/components/BrowserWindow";
import { SiteNavigationAExample } from "#/components/SiteNavigation/SiteNavigationAExample";
import { SiteNavigationBExample } from "#/components/SiteNavigation/SiteNavigationBExample";

export const Route = createFileRoute("/")({ component: Home });

function Header({ badge, title }: { badge: string; title: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-4 py-2.5 shadow-sm">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
        {badge}
      </span>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Compound components</h1>

      <section className="space-y-4">
        <Header badge="A" title="Props-based" />
        <BrowserWindow url="mysite.com">
          <SiteNavigationAExample />
        </BrowserWindow>
      </section>

      <section className="space-y-4">
        <Header badge="B" title="Compound" />
        <BrowserWindow url="mysite.com">
          <SiteNavigationBExample />
        </BrowserWindow>
      </section>
    </div>
  );
}
