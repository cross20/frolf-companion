import { useState } from "react";
import ScoreCard from "./ScoreCard";

export default function GameContainer({ game }) {
    if (!game) {
        throw new Error('Invalid game.');
    }

    const [score, setScore] = useState(game.score);

    return (
        <article>
            <ScoreCard currentScore={score} updateScore={(increment) => { increment ? setScore(score + 1) : setScore(score - 1) }} />
        </article>
    );
}