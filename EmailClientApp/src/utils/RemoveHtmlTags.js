export const  extractParagraphs = (htmlString) => {
    return htmlString
    .match(/<p>(.*?)<\/p>/g) // Match all <p>...</p> blocks
    .map(paragraph => paragraph.replace(/<\/?p>/g, "").trim()); // Remove <p> tags and trim whitespace
}