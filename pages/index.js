import Link from 'next/link';
import { readFlashcardsDir } from '../lib/fs';

export async function getStaticProps() {
    const files = readFlashcardsDir();
    return {
        props: {
            files
        }
    }
}


export default function Home({files}) {
    return (
        <div>
            {files.map(file => <><Link href={`/flashcards/${file}`}>{file}</Link><br></br></>)}
        </div>
    )
}