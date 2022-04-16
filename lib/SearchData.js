import { useState } from "react"

export default function SearchData() {

    const [hits, setHits] = useState([]);

    const search = async (event) => {
        const q = event.target.value;

        if (q.length > 2) {
            const params = new URLSearchParams({ q });
            
            const res = await fetch('/api/searchData?' + params);

            const result = await res.json();
            setHits(result['test']);
        }
    }

    return (
        <div>
            <section>
                <h4>Search</h4>
                <label htmlFor="searchTest">
                    <p>Enter a serach term</p>
                    <input onChange={search} type="text" name="searchTest"/>
                </label>
            </section>
            <section>
                <h4>Results</h4>
                <ul>
                    {hits.map((hit) => (
                        <li key={hit.entityId}>
                            <p>Name: "{hit.name}"</p>
                            <p>Description: "{hit.description}"</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}