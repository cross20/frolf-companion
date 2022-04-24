import CreateData from "./CreateData";
import IndexData from "./IndexData";
import SearchData from "./SearchData";

export default function TestDatabase() {
    return (
        <article>
            <h2>Test Database</h2>
            <section>
                <h3>POST</h3>
                <section>
                    <h4>Create Data</h4>
                    <CreateData />
                </section>
                <section>
                    <h4>Create Index</h4>
                    <IndexData />
                </section>
            </section>
            <section>
                <h3>FETCH</h3>
                <SearchData />
            </section>
        </article>
    );
}