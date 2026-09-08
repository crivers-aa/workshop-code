import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

export function CompoundCardExample() {
  return (
    <div className="flex h-full items-center justify-center bg-muted/20 p-6">
      <Card className="w-full max-w-sm" size="sm">
        <CardHeader>
          <CardTitle>Invite teammate</CardTitle>
          <CardDescription>
            Compound pieces share one visual system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Send a link. They pick a role after they join.
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm">Copy invite</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
