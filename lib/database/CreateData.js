export default function CreateData() {
    const formId = 'create-data';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        await fetch('/api/createData', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        document.querySelector(`form[id="${formId}"]`).reset();
    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <label htmlFor="name">
                <p>Name</p>
                <input name="name" type="text"/>
            </label>
            <label htmlFor="description">
                <p>Description</p>
                <textarea name="description" type="text"/>
            </label>
            <button type="submit">Create Data</button>
        </form>
    )
}