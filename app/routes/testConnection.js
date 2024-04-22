import mongoose from 'mongoose';
import Meme from './meme';  // Ensure the path to your Meme model is correct
import { generateMemeUrl } from './generateMemeUrl';  // Make sure the path is correct

async function testDatabase() {
    try {
        // Dynamically generate the meme URL for testing
        const templateId = 'sampleTemplateId';  // Sample template ID for testing
        const text = 'sampleText';  // Sample text for testing
        const generatedMemeUrl = generateMemeUrl(templateId, text);
        console.log('Generated Meme URL:', generatedMemeUrl);

        // Save a new user for testing
        
        // Save a new meme for testing
        const newMeme = new Meme({
            imageUrl: generatedMemeUrl,
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

testDatabase();
