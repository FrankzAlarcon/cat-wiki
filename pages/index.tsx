import type { GetServerSideProps, NextPage } from 'next'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Card from '../components/Card'
import Layout from '../components/Layout'
import Masonry from 'react-masonry-css'
import Searcher from '../components/Searcher'
import { Breed } from '../types/cats'

interface Props {
  breeds: Breed[]
}

const Home: NextPage<Props> = ({ breeds }) => {
  const [showSearcher, setShowSearcher] = useState(false);
  const [showBreeds, setShowBreeds] = useState(false);
  const [breedInput, setBreedInput] = useState('');

  const filteredBreeds = useMemo(() => breeds.filter((breed) => breed.name.toLowerCase().includes(breedInput.toLowerCase())), [breeds, breedInput]);

  const handleShowSearcher = () => {
    setShowSearcher(true);
  }

  const handleHideSearcher = () => {
    setShowSearcher(false);
  }

  const handleSearcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length > 0) {
      setShowBreeds(true);
    } else if (e.target.value.trim().length === 0) {
      setShowBreeds(false);
    }
    setBreedInput(e.target.value);
  }

  return (
    <Layout>
      <section className='rounded-[3rem] overflow-hidden'>
        <div className='bg-hero-sm md:bg-hero-md lg:bg-hero-lg bg-no-repeat bg-cover bg-center text-white p-8 lg:p-16 text-lg'>
          {
            showSearcher && <Searcher hideSearcher={handleHideSearcher} breeds={breeds} />
          }
          <div className='w-1/2 relative'>
            <h1 className='font-mystery md:text-6xl'>CatWiki</h1>
            <p className='text-sm py-2 md:text-lg lg:w-1/2 lg:my-4'>Get to know more about yout cat breed</p>
            <label htmlFor="searcher" className="hidden relative md:flex items-center justify-between border border-black rounded-full bg-white md:w-1/2">
              <input
                id="searcher"
                type="text"
                value={breedInput}
                onChange={handleSearcher}
                placeholder="Type a letter"
                className="rounded-l-full py-2 px-4 w-full text-base text-black"
                autoComplete='off'
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 stroke-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </label>
            {
              showBreeds && (
                <div className='hidden md:absolute md:block md:w-1/2 mt-2 rounded-md text-black bg-white max-h-40 overflow-y-scroll'>
                  {
                    filteredBreeds.map((breed) => (
                      <Link href={`/cat-wiki/${breed.name}`} key={breed.id} >
                        <p className="block text-xs lg:text-sm font-medium p-1 w-full text-left hover:bg-slate-100 cursor-pointer">{breed.name}</p>
                      </Link>
                    ))
                  }
                </div>
              )
            }
            <button type='button' className='md:hidden flex justify-between items-center rounded-full p-4 bg-white text-black text-sm font-medium my-2 mx-auto w-4/5 ' onClick={handleShowSearcher}>
              Search
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </div>
        <div className='bg-[#E3E1DC] text-primary pt-2 pb-5'>
          <div className='w-4/5 mx-auto'>
            <p className='font-medium pb-1 pt-3'>Most Searched Breeds</p>
            <span className='w-11 h-1 rounded-full bg-primary block'></span>
            <div className='flex justify-between items-end'>
              <h2 className='font-bold text-xl w-52 py-2 md:text-4xl md:w-1/2 lg:w-1/3 md:my-4'>66+ Breeds For you to discover</h2>
              <Link href='/cat-wiki/most-searched' >
                <p className='uppercase font-bold text-sm flex gap-3 pb-4 cursor-pointer'>
                  See More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </p>
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-x-5 gap-y-2 md:grid-cols-4'>
              {
                ['Bengal', 'Savannah', 'Norwegian Forest Cat', 'Selkirk Rex'].map((item, index) => (
                  <Card key={item} src={`/img/breed_${index + 1}.png`} alt={item} title={item} />
                ))
              }
            </div>
          </div>
        </div>
      </section>
      <section className='md:grid md:grid-cols-2 md:gap-x-10'>
        <div className='md:mt-14 md:pr-12'>
          <span className='w-11 h-1 rounded-full bg-primary block mt-12 mb-6'></span>
          <h2 className='font-bold text-4xl mx-auto mb-10'>Why should you have a cat?</h2>
          <p className='text-justify pb-2 md:mb-6'>
            Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety leves
          </p>
          <a href="https://www.helpguide.org/articles/healthy-living/joys-of-owning-a-cat.htm" target="_blank" className='uppercase text-xs font-bold flex items-center gap-4 text-[#29150799] mb-10' rel="noreferrer">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
        <div className='mx-auto md:mx-0 md:my-14'>
          <Masonry
            breakpointCols={2}
            className='my-masonry-grid'
            columnClassName="my-masonry-grid_column"

          >
            {
              [2, 3, 1].map((item) => (
                <div key={item} className="overflow-hidden rounded-2xl max-w-fit">
                  <img src={`/img/image ${item}.png`} alt={`Cat image ${item}`} />
                </div>
              ))
            }
          </Masonry>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get(`${process.env.URL}api/breeds`)
  const breeds = data.breeds.map((breed: Breed) => ({
    id: breed.id,
    name: breed.name,
  }))
  return {
    props: {
      breeds: breeds
    }
  }
}

export default Home
