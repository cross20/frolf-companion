import GameContainer from "../../components/game/GameContainer";
import Layout from "../../components/Layout";

export default function Game({ gameData }) {
    return (
        <Layout>
            <GameContainer game={gameData} />
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
        this.id = id;
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
    const gameData = getGameData(params.id);
    
    return {
        props: {
            gameData,
        },
    };
}