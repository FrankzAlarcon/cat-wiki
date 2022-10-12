import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>CatWiki</title>
      </Head>
      <header className="p-2">
        <Link href='/'>
          <a>
            <Image src='/CatwikiLogo.svg' alt="Logo CatWiki" width={100} height={40} className="cursor-pointer" />
          </a>
        </Link>
      </header>
      <main className="mx-4 md:w-11/12 md:mx-auto lg:w-9/12">
        {children}
      </main>
      <footer className="mx-4 mt-2 bg-black rounded-t-3xl p-4 text-white md:flex md:justify-between md:items-center md:px-8">
        <Image src='/CatwikiLogoWhite.svg' alt="Logo CatWiki" width={100} height={40} />
        <p className="text-sm font-medium">© created by
          <a href="https://frankz-web-portfolio.vercel.app/" target="_blank" rel="noreferrer"><span className="font-bold"> @FrankzAlarcon </span></a>
          - devChallenge.io 2022
        </p>
      </footer>
    </>
  )
}
