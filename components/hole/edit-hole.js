import { useEffect, useState } from "react";
import InputForm from "../form/InputForm";
import TextareaForm from "../form/TextareaForm";

export default function EditHole(props) {
    if (!props.holeId) {
        throw new Error('A hole ID is required to edit a hole');
    }

    const [hole, setHole] = useState(props.hole);

    useEffect(() => {
        fetch('../../../api/find-hole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                holeId: props.holeId,
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setHole(data.hole);
        });
    }, []);

    const updateAttribute = async (e) => {
        const formData = new FormData(e.target);

        const response = await fetch('../../../../../api/update-hole', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: hole.id,
                attribute: formData.get('attribute'),
                value: formData.get('value'),
            }),
        });

        const data = await response.json();

        setHole(data.updatedHole);

        return true;
    }

    const updateName = async (e) => {
        // TODO: api call to update name.

        // TODO: set hole.

        // TODO: route to page match new name.

        return false; // TODO: remove;

        return await updateAttribute(e);
    }

    const updateIndex = async (e) => {
        return false; // TODO: remove.



        return await updateAttribute(e);
    }

    // todo: implement form.
    if (hole) {
        return (
            <>
                <InputForm onSubmit={(e) => updateName(e)} attribute="name" label="Name" defaultValue={hole.name}></InputForm>
                <TextareaForm onSubmit={(e) => updateAttribute(e)} attribute="description" label="Description" defaultValue={hole.description}></TextareaForm>
            </>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
}