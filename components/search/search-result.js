import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react'
import styles from './search-result.module.css'
import image from './/temp.png'

export default function SearchResult(props) {
    const [result, setResult] = useState(props.result);

    return (
        <article className={styles.container}>
            <Link href={`/course/${result.urlName}`}>
                <a className={styles.link}>
                    <section className={styles.content}>
                        <span className={styles['image']}>
                            <Image src={image.src} alt={'A skyline'} layout={'fill'} objectFit={'cover'} style={{borderRadius: '1rem 0 0 1rem'}} priority />
                        </span>
                        <span className={styles['body']}>
                            <h2>{result.name}</h2>
                            <p>{result.description}</p>
                        </span>
                    </section>
                </a>
            </Link>
        </article>
    )
}