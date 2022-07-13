import { useEffect, useState } from "react";
import AttributeForm from "../AttributeForm";

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
                <AttributeForm onSubmit={(e) => updateName(e)} attribute={"name"} defaultValue={hole.name} label={"Name"} type={"text"} />
                <AttributeForm onSubmit={(e) => updateAttribute(e)} attribute={"description"} defaultValue={hole.description} label={"Description"} type={"textarea"} />
                <AttributeForm onSubmit={(e) => updateIndex(e)} attribute={"index"} defaultValue={hole.index} label={"Number"} type={"number"} />
            </>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
}