import { getCsrfToken } from "next-auth/react"
import Link from "next/link"

export default function SignIn({ csrfToken }) {
    return (
        <div className="container">
            <div className="card">
                <form method="POST" action="/api/auth/callback/credentials">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <label htmlFor="username">Email</label>
                    <input name="username" type="email" />
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" />
                    <button type="submit">Sign in</button>
                </form>
                <p>
                    New to Par Three?
                    <Link href="./signup">
                        <a>Join now</a>
                    </Link>
                </p>
            </div>
            <style jsx>{`
                .container {
                    margin: auto;
                    width: 25%;
                    height: 500px;
                    position: relative;
                }

                .card {
                    margin: 0;
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                }

                form {
                    margin: 0 0 2rem;
                    padding: 1.5rem 1rem 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                label {
                    margin: 0;
                    width: 100%;
                    display: block;
                }

                input {
                    margin: 0.25rem 0 1rem 0;
                    padding: 0.5rem;
                    width: 100%;
                    display: block;
                    background: transparent;
                    border: 1px solid grey;
                    border-radius: 0.25rem;
                }

                button {
                    margin: 2rem 0 0 0;
                    padding: 0.75rem;
                    width: 100%;
                    display: block;
                    border: 1px solid grey;
                    border-radius: 2rem;
                }

                p {
                    text-align: center;
                }

                a {
                    margin: 0 0.15rem;
                    padding: 0.25rem 0.35rem;
                    border-radius: 1rem;
                    color: blue;
                    font-weight: 500;
                }

                a:hover {
                    background-color: rgba(52, 152, 219, 0.15);
                }

                a:link:active, a:visited:active {
                    color: #8B008B;
                }
            `}</style>
        </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}