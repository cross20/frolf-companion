export default function IndexData() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('/api/createIndex');
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Create Index</button>
        </form>
    );
}