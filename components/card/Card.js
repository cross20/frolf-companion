export default function Card(props) {
    const margin = 1;

    return (
        <>
            <li className='card'>
                <article className='card-article'>
                    {props.children}
                </article>
            </li>
            <style jsx>{`
                .card {
                    margin: ${margin}rem;
                    padding: 0;
                    list-style: none;
                    box-shadow: rgb(0 0 0 / 30%) 0px 2px 4px 0px;
                    flex: 0 0 calc(25% - ${margin * 2}rem); /* TODO: allow parent elements to set number of cards per row. Also, allow number of cards per row to change based on row width. */
                    width: calc(25% - ${margin * 2}rem);
                }

                .card:hover, .card:focus {
                    box-shadow: rgb(0 0 0 / 50%) 0px 2px 4px 0px;
                    cursor: pointer;
                }

                .card-article {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }

                .card, .card-artilce {
                    border-radius: 0.5rem;
                }
            `}</style>
        </>
    );
}