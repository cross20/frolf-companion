import Game from "../../components/game/Game";
import Layout from "../../components/Layout";

export default function Gamee({ game }) {
    return (
        <Layout>
            <Game game={game} />
        </Layout>
    );
}

export function getAllGameIds() {
    // TODO: get all game IDs from the database.

    const gameIds = ['0', '1', '2', '3'];

    return gameIds.map((gameId) => {
        return {
            params: {
                id: gameId,
            },
        };
    });
}

function getGameData(id) {
    // TODO: get game from database based on ID.

    function Game(id) {
        const hole = {id: 1000, 
            name: 'A hole', 
            description: 'This is a hole used for testing pruposes.', 
            par: 3, 
            type: {id: 0, name: 'Standard'}, 
            difficulty: {id: 0, name: 'Easy'},
            tee: {id: 0, description: 'This is a description used for testing purposes.'},
            target: {id: 2, description: 'This is a description used for testing purposes.'}};

        const anotherHole = {id: 1001, 
            name: 'Another hole', 
            description: 'This is another hole used for testing purposes. It has a longer description than the other test hole.',
            par: 8, 
            type: {id: 1, name: 'Bonus'}, 
            difficulty: {id: 2, name: 'Hard'},
            tee: {id: 0, description: 'This is another description used for testing purposes.'},
            target: {id: 2, description: 'This is another description used for testing purposes.'}};

        const otherHole = {id: 1002, 
            name: 'Other hole', 
            description: 'This is an other hole used for testing pruposes.', 
            par: 4, 
            type: {id: 0, name: 'Standard'}, 
            difficulty: {id: 0, name: 'Medium'},
            tee: {id: 0, description: 'This is an other description used for testing purposes.'},
            target: {id: 2, description: 'This is an other description used for testing purposes.'}};

        this.id = id;
        this.holes = [hole, anotherHole, otherHole];
        this.currentHole = hole.id;
        this.score = 0;
        this.createdAt = new Date().toString();
        this.completedAt = null;
    }

    const games = [new Game(id)];

    const game = games.find((game) => {
        return game.id = id;
    });

    return {
        id,
        ...game,
    };
}

export async function getStaticPaths() {
    const paths = getAllGameIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const game = getGameData(params.id);
    
    return {
        props: {
            game,
        },
    };
}