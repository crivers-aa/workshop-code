import { useLayoutEffect, useRef, useState } from 'react'
import { MenuIcon } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import kyoto from '#/components/shadcn-talk/assets/kyoto.jpg'
import lisbon from '#/components/shadcn-talk/assets/lisbon.jpg'
import nyc from '#/components/shadcn-talk/assets/nyc.jpg'
import santorini from '#/components/shadcn-talk/assets/santorini.jpg'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'

const destinations = [
  { city: 'Lisbon', detail: 'From £186 · Direct', tag: 'Beach', image: lisbon },
  { city: 'Kyoto', detail: 'From £742 · 1 stop', tag: 'City', image: kyoto },
  { city: 'Santorini', detail: 'From £214 · Direct', tag: 'Island', image: santorini },
  { city: 'New York', detail: 'From £398 · Direct', tag: 'City', image: nyc },
]

export function ShadcnMockPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    setContainer(rootRef.current)
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative flex h-full flex-col overflow-hidden bg-background"
    >
      <header className="flex items-center gap-2 border-b px-2.5 py-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-xs" aria-label="Open menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" container={container} className="w-52 max-w-[70%]">
            <SheetHeader className="p-4">
              <SheetTitle>Altair</SheetTitle>
              <SheetDescription>Product navigation</SheetDescription>
            </SheetHeader>
            <nav className="grid gap-1 px-3 pb-4">
              <Button variant="ghost" className="justify-start">
                Product
              </Button>
              <Button variant="ghost" className="justify-start">
                Docs
              </Button>
              <Button variant="ghost" className="justify-start">
                Pricing
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        <p className="truncate text-sm font-semibold tracking-tight">Altair</p>

        <nav className="ml-1 hidden items-center gap-1 sm:flex">
          <Button variant="ghost" size="xs">
            Product
          </Button>
          <Button variant="ghost" size="xs">
            Docs
          </Button>
          <Button variant="ghost" size="xs">
            Pricing
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="xs">
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent container={container} align="end" className="min-w-40">
              <DropdownMenuLabel>Chris R.</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="xs">Get started</Button>
            </DialogTrigger>
            <DialogContent container={container} className="max-w-xs gap-4 p-4">
              <DialogHeader>
                <DialogTitle>Create a workspace</DialogTitle>
                <DialogDescription>
                  Invite your team after you pick a name.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-1.5">
                <Label htmlFor="workspace">Workspace name</Label>
                <Input id="workspace" defaultValue="Altair Studio" />
              </div>
              <DialogFooter>
                <Button size="sm">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-auto p-3">
        <div className="mb-3">
          <p className="text-xs text-muted-foreground">This weekend</p>
          <h1 className="text-lg font-semibold tracking-tight">
            Popular destinations
          </h1>
        </div>
        <Carousel opts={{ align: 'start', loop: true }} className="px-8">
          <CarouselContent className="-ml-2">
            {destinations.map((destination) => (
              <CarouselItem key={destination.city} className="basis-[46%] pl-2">
                <Card size="sm" className="gap-2 py-0 [--card-spacing:--spacing(2)]">
                  <img
                    src={destination.image}
                    alt=""
                    className="h-16 w-full object-cover"
                  />
                  <CardHeader className="gap-0.5 pb-0">
                    <div className="flex items-center justify-between gap-1">
                      <CardTitle className="text-xs">{destination.city}</CardTitle>
                      <Badge variant="outline" className="px-1.5 text-[10px]">
                        {destination.tag}
                      </Badge>
                    </div>
                    <CardDescription className="text-[11px] leading-tight">
                      {destination.detail}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pb-2">
                    <Button size="xs" className="h-6 w-full text-[11px]">
                      Book now
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 size-7" />
          <CarouselNext className="right-0 size-7" />
        </Carousel>
      </main>
    </div>
  )
}
