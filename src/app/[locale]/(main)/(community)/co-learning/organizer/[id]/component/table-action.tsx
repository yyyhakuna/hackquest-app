export const TableAction = () => {
  return (
    <div className="flex gap-6">
      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        Download
      </button>
    </div>
  )
}
