import { useState } from "react";
import NewHole from "../hole/new-hole";

export default function NewCourse(props) {

    if (!props.authorId) {
        throw new Error('Courses must have an author ID');
    }

    const [holes, setHoles] = useState([]);

    const addHole = (hole) => {
        setHoles([...holes, hole]);

        console.log('hole hit', holes);
    }

    return (
        <div>
            <form>
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
            {holes.map((hole) => {
                return (
                    <div>
                        <p>{hole.name}</p>
                    </div>
                )
            })}
            <NewHole courseId={null} authorId={props.authorId} onSubmit={(hole) => addHole(hole) } />
        </div>
    )
}