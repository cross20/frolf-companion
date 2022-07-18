import { useEffect, useState } from "react"

export default function AttributeForm(props) {

    const modes = {
        view: 'view',
        change: 'change',
    }

    const [mode, setMode] = useState(modes.view);

    useEffect(() => {
        switch (mode) {
            case modes.view:
                props.setDisabled(true);
                break;
            case modes.change:
                props.setDisabled(false);
                break;
            default:
                throw new Error(`Unsupported mode: ${mode}`);
        }
    }, [mode]);
    
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

    let timeoutId = null;

    const [response, setResponse] = useState(null);

    const setTimeoutResponse = (value) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setResponse(value);

        timeoutId = setTimeout(() => {
            setResponse(null);

            timeoutId = null;
        }, 1000);
    }

    const Response = () => {
        if (response) {
            return <p>{response}</p>
        } else {
            return <></>
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (await props.onSubmit(e)) {
            setTimeoutResponse('Success');
        } else {
            setTimeoutResponse('Error');

            e.target.reset();
        }

        setMode(modes.view);
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                {props.children}
                <Actions />
            </form>
            <Response />
        </div>
    )
}