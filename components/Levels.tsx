interface Props {
  level: number;
}
export default function Levels({ level }: Props) {
  return (
    <div className="flex gap-2 md:col-start-2 md:col-end-4">
      {
        [1, 2, 3, 4, 5].map((item) => (
          <span key={item} className={`w-8 sm:w-10 md:w-12 xl:w-16 ${level >= item ? 'bg-primary' : 'bg-slate-200'} h-2 rounded-md block`}></span>
        ))
      }
    </div>
  )
}
