const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[6px] w-20 overflow-hidden rounded-[3px] bg-neutral-300">
        <div
          className="h-full bg-primary-400"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="body-xs text-neutral-500">
        {progress > 100 ? 100 : progress}%
      </p>
    </div>
  )
}

export default Progress
