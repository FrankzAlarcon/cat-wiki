import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import { MostSearchedBreeds } from "../../types/cats";

interface Props {
  breeds: MostSearchedBreeds[];
}

export default function MostSearched({ breeds }: Props) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-10 text-primary lg:text-4xl lg:text-left">Top 10 most searched breeds</h1>
      <main>
        {
          breeds.map((breed, index) => (
            <div key={breed.id} className="mb-8 md:grid md:grid-cols-6 md:gap-5 lg:gap-10 lg:px-16 text-primary ">
              <div className="mb-4 md:col-start-1 md:col-end-3 p-4 lg:col-end-2 lg:p-0 ">
                <Image
                  src={breed.image}
                  alt={breed.name}
                  width={100}
                  height={100}
                  layout="responsive" priority
                  className="rounded-xl" />
              </div>
              <div className="md:col-start-3 md:col-end-7 lg:col-start-2">
                <Link href={`/cat-wiki/${breed.name}`}>
                  <h2 className="text-xl font-bold mb-4 cursor-pointer">{index + 1}. {breed.name}</h2>
                </Link>
                <p>{breed.description}</p>
              </div>
            </div>
          ))
        }
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(`${process.env.URL}api/breeds/most-searched`)
  const breeds: MostSearchedBreeds[] = data.breeds;

  return {
    props: {
      breeds
    }
  }
}