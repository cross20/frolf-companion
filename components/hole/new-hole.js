import RenderResult from "next/dist/server/render-result";
import { useEffect, useState } from "react";

export default function NewHole(props) {

    if (!props.authorId) {
        throw new Error('Holes must have an author ID');
    }

    if (!props.courseId) {
        throw new Error('Holes must have a course ID');
    }

    const [holes, setHoles] = useState([]); // TODO: retrieve holes.

    useEffect(() => {
        fetch('../../../../../api/find-holes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: props.courseId,
            }),
        }).then((result) => {
            return result.json();
        }).then((data) => {
            console.log('holes', data.holes);

            setHoles(data.holes);
        });
    }, []);

    const newHole = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const previousHoleId = formData.get('previousHole');

        const res = await fetch('../../../api/create-hole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                description: formData.get('description'),
                previousHoleId: previousHoleId ? previousHoleId : null,
                tee: {
                    latitude: Number(formData.get('initialLatitude')),
                    longitude: Number(formData.get('initialLongitude')),
                },
                teeDescription: '',
                target: {
                    latitude: Number(formData.get('finalLatitude')),
                    longitude: Number(formData.get('finalLongitude')),
                },
                targetDescription: '',
                courseId: props.courseId,
                authorId: props.authorId,
            }),
        }); // todo: change request url so it's not dependent on location relative to api directory.

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
            <label htmlFor="previousHole">
                Previous Hole
                <select name="previousHole">
                    <option key="empty" value="">--</option>
                    {holes.map((hole) => {
                        return (
                            <option key={hole.id} value={hole.id}>{hole.name}</option>
                        )
                    })}
                </select>
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