import { useState } from "react";
import AttributeForm from "./AttributeForm";

export default function InputForm(props) {
    const [disabled, setDisabled] = useState(true);

    const onSubmit = async (e) => {
        const data = new FormData(e.target);

        // Check if the value has changed before running props onSubmit function.
        if (data.get('value') == props.defaultValue) {
            return true;
        }

        return await props.onSubmit(e);
    }

    return (
        <AttributeForm onSubmit={(e) => onSubmit(e)} setDisabled={(disabled) => setDisabled(disabled)}>
            <label htmlFor="value">{props.label}</label>
            <input type={props.type} name="value" defaultValue={props.defaultValue} disabled={disabled}></input>
            <input type="hidden" name="attribute" value={props.attribute}></input>
        </AttributeForm>
    )
}