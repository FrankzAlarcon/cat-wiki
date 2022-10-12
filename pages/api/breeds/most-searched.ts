import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const breeds: any = await axios.get(`https://api.thecatapi.com/v1/breeds?limit=10`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY
    }
  });  
  const mostSearched = breeds.data.map((breed: any) => ({
    id: breed.id,
    name: breed.name,
    description: breed.description,
    image: breed.image.url,
  }));
  res.status(200).json({breeds: mostSearched});
}