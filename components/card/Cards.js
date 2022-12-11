import Card from './Card';

export default function Cards(props) {
    return (
        <>
            <ol className="cards" role="button">
                {(props.children).map((child, i) => {
                    return (
                        <Card key={i}>
                            {child}
                        </Card>
                    );
                })}
            </ol>
            <style jsx>{`
                .cards {
                    margin: -1rem; /* Counteract margin of individual cards. */ /* TODO: set margin dynamically. */
                    padding: 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                }
            `}</style>
        </>
    );
}