import { Input as DefaultInput } from '#/components/ui/input'
import { Input as CustomInput } from '#/components/ui/input-custom'
import { Label } from '#/components/ui/label'

function DestinationField({
  input: Field,
}: {
  input: typeof DefaultInput
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="destination">Destination</Label>
      <Field id="destination" defaultValue="Faro" />
    </div>
  )
}

export function DefaultInputPreview() {
  return <DestinationField input={DefaultInput} />
}

export function CustomInputPreview() {
  return <DestinationField input={CustomInput} />
}
