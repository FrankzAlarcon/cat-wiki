import Image from "next/image";

interface Props {
  src: string
  alt: string
  title: string
}

export default function Card({ src, alt, title }: Props) {
  return (
    <div className="">
      <Image className="rounded-xl" src={src} alt={alt} width={70} height={70} layout='responsive' />
      <p className="font-medium text-primary py-2 text-sm">{title}</p>
    </div>
  )
}
