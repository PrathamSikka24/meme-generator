// In some configuration file or at the top of your utility file
const memeUrl = "https://api.memegen.link/images/{templateId}/{text}.png";

// utils/generateMemeUrl.js
export function generateMemeUrl(templateId, text) {
    return memeUrl.replace('{templateId}', templateId).replace('{text}', encodeURIComponent(text));
}

