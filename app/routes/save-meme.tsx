import { json, ActionFunctionArgs } from '@remix-run/node';
import Meme from './meme'
import { request } from 'express';

export async function action({
    request,
}: ActionFunctionArgs ) {
    try {
        const formData = await request.formData();
        const imageUrl = formData.get('memeUrl');

        if (typeof imageUrl !== 'string') {
            return json({ error: 'Invalid URL' }, 400);
        }

        const newMeme = new Meme({ imageUrl });
        await newMeme.save();

        return json({ success: true, memeId: newMeme._id }, 200);
    } catch (error) {
        console.error('Failed to save meme:', error);
        return json({ error: 'Failed to save meme' }, 500);
    }

}


   