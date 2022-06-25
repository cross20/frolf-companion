export default function NewHole(props) {

    if (!props.authorId) {
        throw new Error('Holes must have an author ID');
    }

    if (!props.courseId) {
        throw new Error('Holes must have a course ID');
    }

    const newHole = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const newHole = {
            name: formData.get('name'),
            description: formData.get('description'),
            order: formData.get('order'),
            start: {
                latitude: formData.get('initial-latitude'),
                longitude: formData.get('initial-longitude'),
            },
            stop: {
                latitude: formData.get('final-latitude'),
                longitude: formData.get('final-longitude'),
            },
            courseId: props.courseId,
            authorId: props.authorId,
        }

        // todo: make api call to create hole.

        e.target.reset();
    }

    return (
        <form onSubmit={(e) => newHole(e)}>
            <label htmlFor="name">
                Name
                <input type="text" name="name"></input>
            </label>
            <label htmlFor="description">
                Description
                <textarea name="description"></textarea>
            </label>
            <label htmlFor="order">
                Order
                <input type="number" name="order" min="0"></input>
            </label>
            <h3>Starting Point</h3>
            <label htmlFor="initialLatitude">
                Latitude
                <input type="number" name="initialLatitude"></input>
            </label>
            <label htmlFor="initialLongitude">
                Longitude
                <input type="number" name="initialLongitude"></input>
            </label>
            <h3>Stopping Point</h3>
            <label htmlFor="finalLatitude">
                Latitude
                <input type="number" name="finalLatitude"></input>
            </label>
            <label htmlFor="finalLongitude">
                Longitude
                <input type="number" name="finalLongitude"></input>
            </label>
            <button type="submit">Add Hole</button>
        </form>
    )
}