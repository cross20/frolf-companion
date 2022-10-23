import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import { useState } from "react";

export default function Search() {
    const [terms, setTerms] = useState([]);
    
    return (
        <div>
            <SearchBar onSearch={(terms) => setTerms(terms)}/>
            <SearchResults terms={terms} />
        </div>
    );
}