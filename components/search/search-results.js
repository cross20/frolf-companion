import { useState } from "react";
import SearchResult from "./search-result";
import styles from './search-results.module.css'

export default function SearchResults() {
    const [results, setResults] = useState([{urlName: 'whitworth', title: 'Whitworth', description: 'This is the first result.'}, 
    {urlName: 'whitworth', title: 'Whitworth', description: 'This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. This is the first result. Testing Testing'}, 
    {urlName: 'whitworth', title: 'Whitworth', description: 'This is the first result.'}, 
    {urlName: 'whitworth', title: 'Whitworth', description: 'This is the first result.'}, 
    {urlName: 'whitworth', title: 'Whitworth', description: 'This is the first result.'}, 
    {urlName: 'whitworth', title: 'Whitworth', description: 'This is the first result.'}, 
    {urlName: 'new-course', title: 'New Course', description: 'This is the second result.'}]);

    let key = 0;

    return (
        <div className={styles.container}>
            {results.map((r) => {
                return <SearchResult result={r} key={key++}/>
            })}
        </div>
    );
}