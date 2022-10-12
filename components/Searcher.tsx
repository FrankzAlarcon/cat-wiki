import Link from "next/link";
import { useMemo, useState } from "react";
import { Breed } from "../types/cats";

interface Props {
  hideSearcher: () => void;
  breeds: Breed[];
}

export default function Searcher({ hideSearcher, breeds }: Props) {
  const [breedInput, setBreedInput] = useState('');

  const filteredBreeds = useMemo(() => breeds.filter((breed) => breed.name.toLowerCase().includes(breedInput.toLowerCase())), [breeds, breedInput]);



  return (
    <div className="absolute h-screen z-10 w-full rounded-md bg-white top-0 left-0 p-4 ">
      <span className="flex justify-end mt-2 mb-6">
        <button onClick={hideSearcher}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 bg-slate-200 p-1 rounded-md">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </span>
      <label htmlFor="searcher" className="flex items-center justify-between border border-black rounded-full">
        <input
          id="searcher"
          type="text"
          placeholder="Type a letter"
          value={breedInput}
          onChange={(e) => setBreedInput(e.target.value)}
          className="rounded-l-full py-3 px-4 w-full text-base text-black"
          autoComplete="off"
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </label>
      <div className='md:w-1/2 mt-2 rounded-md text-black bg-white h-s overflow-y-scroll'>
        {
          filteredBreeds.map((breed) => (
            <Link href={`/cat-wiki/${breed.name}`} key={breed.id} >
              <p className="block text-xs lg:text-sm font-medium p-1 w-full text-left hover:bg-slate-100 cursor-pointer">{breed.name}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
