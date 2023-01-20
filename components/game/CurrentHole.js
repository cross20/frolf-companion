export default function CurrentHole({ hole }) {
    return (
        <section>
            <h2>{hole.name}</h2>
            <p>{hole.description}</p>
            <ul>
                <li>{`Par ${hole.par}`}</li>
                <li>{hole.type.name}</li>
                <li>{hole.difficulty.name}</li>
            </ul>
            <div>
                <h3>Tee box</h3>
                <p>{hole.tee.description}</p>
            </div>
            <div>
                <h3>Target</h3>
                <p>{hole.target.description}</p>
            </div>
            <div>
                {/* TODO: implement map */}
            </div>
        </section>
    );
}