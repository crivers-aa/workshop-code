import { Callout } from '#/components/Callout'

export function CalloutExamples() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 bg-muted/20 p-6">
      <Callout intent="info" size="sm">
        Info - default teaching note
      </Callout>
      <Callout intent="success" size="md">
        Success - a completed step
      </Callout>
      <Callout intent="warning" size="md">
        Warning - check this before shipping
      </Callout>
      <Callout intent="danger" size="lg">
        Danger - this will overwrite files
      </Callout>
    </div>
  )
}
