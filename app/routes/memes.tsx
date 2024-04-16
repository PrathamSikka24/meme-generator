import React, { useState } from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';

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

// Loader to fetch meme templates
export const loader: LoaderFunction = async (): Promise<Response> => {
    const response = await fetch("https://api.memegen.link/templates");
    if (!response.ok) {
        throw new Response("Failed to load meme templates", { status: response.status });
    }
    const templates: MemeTemplate[] = await response.json();
    return json(templates);
};

export default function Memes() {
    const templates = useLoaderData<MemeTemplate[]>();
    const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const generateMeme = () => {
        if (selectedTemplate) {
            const memeUrl = `https://api.memegen.link/images/${selectedTemplate.id}/${encodeURIComponent(text)}.png`;
            navigate(`/meme-result?url=${encodeURIComponent(memeUrl)}`);
        }
    };

    return (
        <div>
            <h1>Meme Templates</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {templates.map((template) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template)} style={{ margin: '20px', cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
                        <img src={template.blank} alt={template.name} style={{ width: '300px', height: 'auto' }} />
                        <p>{template.name}</p>
                    </div>
                ))}
            </div>
            {selectedTemplate && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={selectedTemplate.blank} alt={selectedTemplate.name} style={{ maxWidth: '80%', maxHeight: '80%' }} />
                    <input type="text" placeholder="Enter your text here" value={text} onChange={(e) => setText(e.target.value)} style={{ margin: '20px', padding: '10px', width: '50%' }} />
                    <button onClick={generateMeme} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Generate</button>
                    <button onClick={() => setSelectedTemplate(null)} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>Close</button>
                </div>
            )}
        </div>
    );
}
