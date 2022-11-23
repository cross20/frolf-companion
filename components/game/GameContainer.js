export default function GameContainer({ game }) {
    if (!game) {
        throw new Error('Invalid game.');
    }

    return (
        <article>
            <p>This is a test.</p>
        </article>
    );
}