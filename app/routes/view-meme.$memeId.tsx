import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Meme from './meme';
interface LoaderData {
    meme: {
        imageUrl: string;
    };
}
// Loader to fetch meme details
interface LoaderData {
    meme: {
      imageUrl: string;
    };
  }
  
  export const loader: LoaderFunction = async ({ params }) => {
    try {
      const meme = await Meme.findById(params.memeId).exec();
      if (!meme) {
        throw new Error('Meme not found');
      }
      return json({ meme });
    } catch (error) {
      console.error(error);
      throw new Response('Not Found', { status: 404 });
    }
  };
  
  export default function ViewMemePage() {
    const { meme } = useLoaderData<LoaderData>();
    return (
      <div>
        <h1>Your Generated Meme</h1>
        <img src={meme.imageUrl} alt="Generated Meme" />
      </div>
    );
  };