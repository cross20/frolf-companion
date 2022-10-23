import { useState } from "react";
import SearchResult from "./search-result";
import styles from './search-results.module.css'

export default function SearchResults(props) {
    const terms = props.terms;

    // TODO: make api call to set results based on terms.
    const [results, setResults] = useState([]);

    const Content = () => {
        switch (0) {
            case terms.length:
                return (
                    <p>Search for a course to start playing.</p>
                );
                break;
            case results.length:
                return (
                    <p>Uh oh! There are no results for this search. Modify the search terms and try again.</p>
                );
                break;
            default:
                return (
                    <>
                        {results.map((result, index) => {
                            return <SearchResult result={result} key={index}/>
                        })}
                    </>
                );
        }
    }

    return (
        <div className={styles.container}>
            <Content />
        </div>
    );
}