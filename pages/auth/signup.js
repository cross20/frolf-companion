import Link from "next/link";

export default function SignUp() {
    return (
        <form>
            <p>Hey there! This page is still under construction.</p>
            <Link href="/">
                <a>Return home</a>
            </Link>
            <style jsx>{`
                a {
                    color: blue;
                    font-weight: bold;
                }
            `}</style>
        </form>
    )
}