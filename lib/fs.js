import fs from 'fs';
import path from 'path';

const flashcardDirectory = path.join(process.cwd(), 'flashcards');

export function readFlashcards(name) {
    const jsonDir = path.join(flashcardDirectory, `${name}.json`);
    const fileContent = fs.readFileSync(jsonDir, 'utf8');
    return JSON.parse(fileContent);
}

export function readFlashcardsDir() {
    const files = fs.readdirSync(flashcardDirectory).map(dir => dir.split('.').slice(0, -1).join('.'));
    return files;
}