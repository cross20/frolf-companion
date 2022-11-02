import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import { useState } from "react";

export default function Search() {
    const [results, setResults] = useState(undefined);

    /**
     * Finds the search results based on the search terms.
     * @param {Array} searchTerms Keywords used to search for a course.
     */
    const onSearch = (searchTerms) => {
        if (searchTerms) {
            const req = new Request('/api/search-course-by-name');

            const init = {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: searchTerms.replace(' ', '|') }), // TODO: evaluate whether this is best way to search multiple names.
            }
    
            fetch(req, init).then((res) => {
                res.json().then((data) => {
                    setResults(data.courses);
                });
            });
        } else {
            setResults(undefined);
        }
    }
    
    return (
        <div>
            <SearchBar onSearch={(searchTerms) => onSearch(searchTerms)}/>
            <SearchResults results={results} />
        </div>
    );
}