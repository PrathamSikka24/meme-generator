import mongoose from 'mongoose';
import Meme from './meme'  // Ensure the path to your Meme model is correct

async function testDatabase(templateId: string, text: string) {
    try {
        // Dynamically generate the meme URL for testing
    
        
        const newMeme = new Meme({
            templateId,
            text,

        });
        const savedMeme = await newMeme.save();
        console.log('Meme saved successfully:', savedMeme);

        // Optionally, retrieve memes to confirm they're being saved
        const memes = await Meme.find();
        console.log('All memes:', memes);

        // Close the connection once testing is done
        mongoose.connection.close();
    } catch (err) {
        console.error('Error during database operation:', err);
    }
}

export default testDatabase;