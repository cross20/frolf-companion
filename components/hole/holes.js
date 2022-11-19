import { useEffect, useState } from 'react'

export default function Holes(props) {

    if (!props.courseId && !props.holes) {
        throw new Error('Must provide a course ID or array of hole objects');
    }

    const courseId = props.courseId;

    const [holes, setHoles] = useState(props.holes);

    useEffect(() => {
        if (courseId) {
            fetch('../api/find-holes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: props.courseId,
                }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setHoles(data.holes);
            });
        }
    }, []);

    if (holes) {
        if (holes.length > 0) {
            // HOLES
            return (
                <>
                    {holes.map((hole) => {
                        return (
                            <article key={hole.id}>
                                <h3>{hole.name}</h3>
                                <p>{`Hole ${hole.index}`}</p>
                                <p>{hole.description}</p>
                            </article>
                        );
                    })}
                    <button onClick={() => {
                        // Create new array of holes. This is necessary because state variables should be treated as immutable. The spread operator (...) is being used to do this becasuse objects and arrays are set by reference in JavaScript. Setting the array directly would just set a reference to the immutable value, defeating the purpose of the new array.
                        let newHoles = [...holes];
    
                        // Overwrite the array with a new array created by the map function.
                        newHoles = newHoles.map((hole) => {
                            // Update the value of the index before adding the hole to the new array.
                            hole.index++;
    
                            // A value must be returned to insert into the new array.
                            return hole;
                        });
    
                        // Overwrite the entire array with the new array.
                        setHoles(newHoles);
                    }}>Get wrecked</button>
                </>
            );
        } else {
            // NO HOLES
            return (
                <p>No holes exist for this course.</p>
            );
        }
    } else {
        // LOADING
        return (
            // todo: replace with loading component.
            <p>Loading</p>
        );
    }
}