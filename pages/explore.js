import Layout from "../components/Layout";
import Search from "../components/search/search";

export default function Explore() {
    return (
        <Layout>
            <div className="hidden">
                <h1>Search</h1>
            </div>
            <Search />
        </Layout>
    );
}