import { useState } from "react";
import SearchResult from "./search-result";
import styles from './search-results.module.css'

export default function SearchResults(props) {
    const results = props.results;

    const Content = () => {
        if (results === undefined) {
            return (
                <p>Search for a course to start playing.</p>
            );
        } else if (results.length === 0) {
            return (
                <p>Uh oh! There are no results for this search. Modify the search terms and try again.</p>
            );
        } else {
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