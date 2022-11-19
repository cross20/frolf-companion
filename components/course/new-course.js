export default function NewCourse(props) {

    if (!props.authorId) {
        throw new Error('Courses must have an author ID');
    }

    const newCourse = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const res = await fetch('../api/create-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                description: formData.get('description'),
                authorId: props.authorId,
            }),
        }); // todo: change request url so it's not dependent on location relative to api directory.

        e.target.reset();
    }

    return (
        <form onSubmit={(e) => newCourse(e)}>
            <label htmlFor="name">
                Name
                <input type="text" name="name"></input>
            </label>
            <label htmlFor="description">
                Description
                <textarea name="description"></textarea>
            </label>
            <button type="submit">Create Course</button>
        </form>
    )
}