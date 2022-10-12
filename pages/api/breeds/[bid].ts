import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  const { bid } = req.query;
  const breed = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${bid}`, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY
    }
  });
  const [image, rawImages] = await Promise.allSettled([
    axios.get(`https://api.thecatapi.com/v1/images/${breed.data[0].reference_image_id}`),
    axios.get(`https://api.thecatapi.com/v1/images/search?limit=8&breed_id=${breed.data[0].id}`)
  ]);
  if (image.status === 'fulfilled' && rawImages.status === 'fulfilled') {
    const main_image_url = image.value.data.url;
    const images = rawImages.value.data.map((image: any) => image.url);
    const CompleteBreed = {
      ...breed.data[0],
      main_image_url,
      images
    }
    res.status(200).json({ breed: CompleteBreed });
  }
}