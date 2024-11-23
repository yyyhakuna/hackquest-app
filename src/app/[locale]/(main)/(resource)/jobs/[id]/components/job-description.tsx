'use client'
export function JobDescription({ description }: { description: string }) {
  return (
    <div
      className="body-m reset-editor-style text-primary-neutral [&_h3]:my-4 [&_ol]:list-inside [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:list-inside [&_ul]:list-disc"
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  )
}
