import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const breeds = await axios.get(`https://api.thecatapi.com/v1/breeds`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY
    }
  });
  res.status(200).json({breeds: breeds.data});
}