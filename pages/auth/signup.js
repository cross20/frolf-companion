export default function SignUp() {
    const onSubmit = async (e) => {
        e.preventDefault();

        const body = {
            firstName: e.target['first-name'].value,
            lastName: e.target['last-name'].value,
            email: e.target.username.value,
            password: e.target.password.value,
        }

        const res = await fetch('../api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify(body),
        });

        console.log('res', res);

        const content = await res.json();

        console.log('content', content);

        e.target.reset();
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="first-name">First name</label>
            <input name="first-name" type="text"></input>
            <label htmlFor="last-name">Last name</label>
            <input name="last-name" type="text"></input>
            <label htmlFor="username">Email</label>
            <input name="username" type="email"></input>
            <label htmlFor="password">Password</label>
            <input name="password" type="password"></input>
            <button type="submit">Sign up</button>
        </form>
    )
}