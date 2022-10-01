import { useState } from "react"
import styles from './search-result.module.css'

export default function SearchResult(props) {
    const [result, setResult] = useState(props.result);

    return (
        <article className={styles.container}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
        </article>
    )
}