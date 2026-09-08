export const defaultInputCode = `
function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-4xl
         border border-input bg-input/30
         px-3 py-1 text-base
         focus-visible:border-ring
         focus-visible:ring-[3px]
         focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}
`

export const customInputCode = `
function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md
         border border-input bg-background
         px-3 py-2 text-base shadow-sm
         focus-visible:border-ring
         focus-visible:shadow-md",
        className
      )}
      {...props}
    />
  )
}
`

export const mockPageCode = `
<header>
  <Sheet>
    <SheetTrigger asChild>
      <Button>Menu</Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetTitle>Altair</SheetTitle>
    </SheetContent>
  </Sheet>

  <nav>Product · Docs · Pricing</nav>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>Account</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <Dialog>
    <DialogTrigger asChild>
      <Button>Get started</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Create a workspace</DialogTitle>
      <Input id="workspace" />
    </DialogContent>
  </Dialog>
</header>

<Carousel>
  <CarouselContent>
    <CarouselItem>
      <Card>
        <img src={lisbon} alt="" />
        <CardTitle>Lisbon</CardTitle>
        <Button>Book now</Button>
      </Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
`

export const compoundCode = `
// Each piece is a real export — not a
// config object. Compose what you need.

Card                    // root surface
  CardHeader
    CardTitle
    CardDescription
  CardContent           // body slot
  CardFooter            // actions slot

// Same idea as:
// Dialog + DialogTrigger + DialogContent
// Avatar + AvatarImage + AvatarFallback
`

export const calloutCode = `
import { cva } from 'class-variance-authority'

const calloutVariants = cva(
  'rounded-2xl border font-medium',
  {
    variants: {
      intent: {
        info: 'border-sky-200 bg-sky-50 ...',
        success: 'border-emerald-200 ...',
        warning: 'border-amber-200 ...',
        danger: 'border-red-200 ...',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-5 py-4 text-base',
      },
    },
    defaultVariants: {
      intent: 'info',
      size: 'md',
    },
  },
)

function Callout({ intent, size, className, ...props }) {
  return (
    <div
      className={cn(calloutVariants({ intent, size }), className)}
      {...props}
    />
  )
}
`
