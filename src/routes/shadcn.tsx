import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FiPackage } from 'react-icons/fi'
import { RiAccessibilityLine } from 'react-icons/ri'
import { SiTailwindcss } from 'react-icons/si'
import { TbComponents, TbVariableMinus } from 'react-icons/tb'

import { BackToWorkshop } from '#/components/BackToWorkshop'
import { CalloutExamples } from '#/components/shadcn-talk/CalloutExamples'
import { CompoundCardExample } from '#/components/shadcn-talk/CompoundCardExample'
import {
  CustomInputPreview,
  DefaultInputPreview,
} from '#/components/shadcn-talk/InputComparison'
import { ShadcnMockPage } from '#/components/shadcn-talk/ShadcnMockPage'
import {
  calloutCode,
  compoundCode,
  customInputCode,
  defaultInputCode,
  mockPageCode,
} from '#/components/shadcn-talk/samples'
import {
  BulletSlide,
  FolderStructureSlide,
  Presentation,
  Slide,
  Slides,
  SplitSlide,
  TitleSlide,
} from '#/components/presentation'
import type { FolderNode } from '#/components/presentation'

export const Route = createFileRoute('/shadcn')({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = Number(search.slide)
    return {
      slide: Number.isInteger(raw) && raw >= 1 ? raw : 1,
    }
  },
  component: ShadcnTalk,
})

const shadcnTree: FolderNode[] = [
  {
    name: 'src',
    kind: 'folder',
    children: [
      {
        name: 'components',
        kind: 'folder',
        children: [
          {
            name: 'ui',
            kind: 'folder',
            highlight: true,
            children: [
              { name: 'button.tsx' },
              { name: 'card.tsx' },
              { name: 'input.tsx' },
              { name: 'badge.tsx' },
              { name: 'avatar.tsx' },
              { name: 'dialog.tsx' },
              { name: 'sheet.tsx' },
              { name: 'dropdown-menu.tsx' },
              { name: 'carousel.tsx' },
            ],
          },
          { name: 'Callout.tsx' },
        ],
      },
      {
        name: 'lib',
        kind: 'folder',
        children: [{ name: 'utils.ts' }],
      },
    ],
  },
  { name: 'components.json' },
]

function ShadcnTalk() {
  const { slide } = Route.useSearch()
  const navigate = useNavigate({ from: '/shadcn' })

  return (
    <div className="relative">
      <BackToWorkshop className="absolute top-4 left-4 z-20" />
      <Presentation
        slide={slide}
        onSlideChange={(next) =>
          navigate({ search: { slide: next }, replace: true })
        }
      >
        <TitleSlide
          title="shadcn/ui"
          description="Copy-paste primitives you own. Accessible Radix pieces, Tailwind tokens, and CVA variants — composed in your repo, not wrapped as a black-box library."
        />
        <BulletSlide
          title="What shadcn actually is"
          items={[
            { icon: FiPackage, text: 'When you run the CLI, it copies the component source directly into your project — you own and can edit those files freely.' },
            { icon: RiAccessibilityLine, text: 'Under the hood, each component is built on a Radix UI primitive, which takes care of behavior and accessibility for you.' },
            { icon: SiTailwindcss, text: 'Styling is driven by Tailwind utility classes that reference your design tokens, so the components naturally follow your theme.' },
            { icon: TbVariableMinus, text: 'CVA (Class Variance Authority) wires up variants like intent and size, mapping them to the right class names without manual conditionals.' },
            { icon: TbComponents, text: 'Because you own the source, you can edit the primatives directly to your needs just open the file and change it.' },
          ]}
        />
        <FolderStructureSlide
          title="Where the primitives live"
          tree={shadcnTree}
        />
        <Slides title="You own the source">
          <Slide>
            <SplitSlide
              title="Default"
              code={defaultInputCode}
              url="ui.shop/input"
            >
              <DefaultInputPreview />
            </SplitSlide>
          </Slide>
          <Slide>
            <SplitSlide
              title="Yours"
              code={customInputCode}
              url="ui.shop/input-custom"
            >
              <CustomInputPreview />
            </SplitSlide>
          </Slide>
        </Slides>
        <SplitSlide
          title="Compose a page from primitives"
          code={mockPageCode}
          url="altair.app"
        >
          <ShadcnMockPage />
        </SplitSlide>
        <SplitSlide
          title="Primitives are compound components"
          code={compoundCode}
          language="txt"
          url="ui.shop/invite"
        >
          <CompoundCardExample />
        </SplitSlide>
        <SplitSlide
          title="CVA makes your own variants"
          code={calloutCode}
          url="ui.shop/callout"
        >
          <CalloutExamples />
        </SplitSlide>
      </Presentation>
    </div>
  )
}
