import fs from 'fs';
import path from 'path';

const flashcardDirectory = path.join(process.cwd(), 'flashcards');

export default function readJSON(name) {
    const jsonDir = path.join(flashcardDirectory, `${name}.json`);
    const fileContent = fs.readFileSync(jsonDir, 'utf8');
    return JSON.parse(fileContent);
}