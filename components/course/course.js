import Link from "next/link";

export default function Course(props) {
    if (!props.name) {
        throw new Error('Course must have a name');
    }

    return (
        <Link href={`/course/${props.name.replace(' ', '-')}`}>
            <a>{props.name}</a>
        </Link>
    )
}