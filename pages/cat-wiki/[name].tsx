import { GetServerSideProps } from "next"
import axios from 'axios'
import Layout from "../../components/Layout";
import { BreedComplete } from "../../types/cats";
import Image from "next/image";
import Levels from "../../components/Levels";

interface Props {
  breed: BreedComplete
}

export default function CatWiki({ breed }: Props) {
  return (
    <Layout>
      <section className="md:grid md:grid-cols-5 md:gap-5">
        <div className="w-11/12 md:w-1/2 my-4 mx-auto rounded-3xl overflow-hidden md:col-start-1 md:col-end-3">
          <Image
            src={breed.main_image_url}
            alt={breed.name}
            width={100}
            height={100}
            layout="responsive"
            className="rounded-3xl"
          />
        </div>
        <div className="text-primary md:col-start-3 md:col-end-6 px-4">
          <h1 className="text-2xl font-bold my-4 text-center">{breed.name}</h1>
          <p className="mb-4">{breed.description}</p>
          <ul className="space-y-4">
            <li className="text-sm font-medium">
              <span className="font-bold">Temperament: </span>{breed.temperament}
            </li>
            <li className="text-sm font-medium">
              <span className="font-bold">Origin: </span>{breed.origin}
            </li>
            <li className="text-sm font-medium">
              <span className="font-bold">Life Span: </span>{breed.life_span}
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Adaptability: </span><Levels level={breed.adaptability} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Affection level: </span><Levels level={breed.affection_level} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Child Friendly: </span><Levels level={breed.child_friendly} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Grooming: </span><Levels level={breed.grooming} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Intelligence: </span><Levels level={breed.intelligence} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Health issues: </span><Levels level={breed.health_issues} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Social needs: </span><Levels level={breed.social_needs} />
            </li>
            <li className="text-sm font-medium grid grid-cols-2 md:grid-cols-3">
              <span className="font-bold">Stranger friendly: </span><Levels level={breed.stranger_friendly} />
            </li>
          </ul>
        </div>
      </section>
      <section className="mb-20">
        <h2 className="text-2xl font-semibold my-6">Other Photos</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {breed.images.map((url, index) => (
            <div key={index} className="rounded-2xl overflow-hidden">
              <Image
                src={url}
                alt={`${breed.name} ${index + 1}`}
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params as { name: string };
  if (!name) {
    return {
      notFound: true,
    };
  }
  const { data } = await axios.get(`${process.env.URL}api/breeds/${name}`)

  return {
    props: {
      breed: data.breed
    }
  }
}