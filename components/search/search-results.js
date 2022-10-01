import SearchResult from "./search-result";
import styles from './search-results.module.css'

export default function SearchResults() {
    const results = [{title: 'Result 1', description: 'This is the first result. This is a test'}, {title: 'Result 2', description: 'This is the second result.'}];

    return (
        <div className={styles.container}>
            {results.map((r) => {
                return <SearchResult result={r} />
            })}
        </div>
    );
}