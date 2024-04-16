// app/routes/meme-result.tsx
import React from 'react';
import { useSearchParams } from '@remix-run/react';

const MemeResult = () => {
  const [searchParams] = useSearchParams();
  const memeUrl = searchParams.get('url');

  return (
    <div>
      <h1>Your Generated Meme</h1>
      {memeUrl ? (
        <img src={memeUrl} alt="Generated Meme" />
      ) : (
        <p>No meme generated yet.</p>
      )}
    </div>
  );
};

export default MemeResult;
