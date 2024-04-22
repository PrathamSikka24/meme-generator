import React, { useState } from 'react';
import { json, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import type { ActionFunctionArgs } from "@remix-run/node";
import Meme from './meme'


// Define the meme template interface
interface MemeTemplate {
    id: string;
    name: string;
    lines: number;
    overlays: number;
    styles: any[];
    blank: string;
    example: {
        text: string[];
        url: string;
    };
    source: string;
    keywords: string[];
}

export const loader: LoaderFunction = async (): Promise<Response> => {
    const response = await fetch("https://api.memegen.link/templates");
    if (!response.ok) {
        throw new Response("Failed to load meme templates", { status: response.status });
    }
    const templates: MemeTemplate[] = await response.json();
    return json(templates);
};


export async function action({ request }: ActionFunctionArgs) {
    try {
        // Assuming the incoming request body is JSON
        const data = await request.json();
        const imageUrl = data.imageUrl;

        // Validate the imageUrl is a string and not empty
        if (typeof imageUrl !== 'string' || !imageUrl.trim()) {
            return json({ error: 'Invalid URL' }, { status: 400 });
        }

        // Create and save the new Meme instance
        const newMeme = new Meme({  imageUrl });
        await newMeme.save();

        // Return a success response with the ID of the newly created meme
        return json({ success: true, memeId: newMeme._id }, { status: 200 });
    } catch (error) {
        console.error('Failed to save meme:', error);
        return json({ error: 'Failed to save meme' }, { status: 500 });
    }
}

interface Meme {
    _id: string;
    imageUrl: string;
}

interface MemeListProps {
    memes: Meme[];
}

const MemeList: React.FC<MemeListProps> = ({ memes }) => {
    return (
        <ul>
            {memes.map((meme) => (
                <li key={meme._id}>{meme.imageUrl}</li>
            ))}
        </ul>
    );
};

export default function Memes() {
    const templates = useLoaderData<MemeTemplate[]>();
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [text, setText] = useState<string>('');
    const navigate = useNavigate();

    const generateMeme = async () => {
        console.log('Selected Template ID:', selectedTemplate);
        console.log('Text for meme:', text);

        if (selectedTemplate && text) {
            const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(text)}.png`;
            console.log('Generated Meme URL:', memeUrl);

            try {
                const saveResponse = await fetch('/memes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ imageUrl: memeUrl })
                });

                if (!saveResponse.ok) {
                    console.error('Failed to save the meme:', await saveResponse.text());
                    navigate(`/meme-result?url=${encodeURIComponent(memeUrl)}`);
                    return;
                }

                const result = await saveResponse.json();
                console.log('Save successful, meme ID:', result.memeId);
                navigate(`/view-meme/${result.memeId}`);
            } catch (error) {
                console.error('Error during saving meme:', error);
                navigate(`/meme-result?url=${encodeURIComponent(memeUrl)}`);
            }
        } else {
            console.error('Template ID or text is missing');
        }
    };

    return (
        <div>
            <h1>Meme Templates</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {templates.map((template) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template.id)} style={{ margin: '20px', cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
                        <img src={template.blank} alt={template.name} style={{ width: '300px', height: 'auto' }} />
                        <p>{template.name}</p>
                    </div>
                ))}
            </div>
            {selectedTemplate && (
                <form onSubmit={(e) => { e.preventDefault(); generateMeme(); }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`https://api.memegen.link/images/${selectedTemplate}.png`} alt="Selected Template" style={{ maxWidth: '80%', maxHeight: '80%' }} />
                    <input type="text" placeholder="Enter your text here" value={text} onChange={(e) => setText(e.target.value)} style={{ margin: '20px', padding: '10px', width: '50%' }} />
                    <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Generate</button>
                </form>
            )}
        </div>
    );
}
export { MemeList} ;
