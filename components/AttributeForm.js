import { useState } from "react"

export default function AttributeForm(props) {

    const modes = {
        view: 'view',
        change: 'change',
    }

    const [mode, setMode] = useState(modes.view);

    const defaultMessage = null;

    const [message, setMessage] = useState(defaultMessage);

    let timeoutId = null;

    const isDisabled = () => {
        return mode !== modes.change;
    }

    const InputType = () => {
        switch (props.type) {
            case "textarea":
                return (
                    <textarea name={'value'} defaultValue={props.defaultValue} disabled={isDisabled()}></textarea>
                )
            default:
                return (
                    <input type={props.type} name={'value'} defaultValue={props.defaultValue} disabled={isDisabled()}></input>
                )
        }
    }
    
    const Actions = () => {
        switch (mode) {
            case modes.view:
                return (
                    <button onClick={() => setMode(modes.change)}>Edit</button>
                )
            case modes.change:
                return (
                    <button type="submit">Save</button>
                )
            default:
                throw new Error(`Mode not supported: ${mode}`);
        }
    }

    const Message = () => {
        if (message) {
            return (
                <p>{message}</p>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const setTimeoutMessage = (value) => {
        setMessage(value);

        timeoutId = setTimeout(() => {
            setMessage(defaultMessage);

            timeoutId = null;
        }, 1000);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (timeoutId) {
            clearTimeout(timeoutId);

            timeoutId = null;
        }

        const formData = new FormData(e.target);

        let success = true;

        if (formData.get('value') != props.defaultValue) {
            success = await props.onSubmit(e);
        }

        if (success) {
            setTimeoutMessage('Success');
        } else {
            setTimeoutMessage('Error');

            e.target.reset();
        }

        setMode(modes.view);
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <label htmlFor={'value'}>{props.label}</label>
                <InputType />
                <input type={'hidden'} name={'attribute'} value={props.attribute}></input>
                <Actions />
            </form>
            <Message />
        </div>
    )
}