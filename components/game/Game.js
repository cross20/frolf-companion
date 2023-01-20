import styles from './Game.module.css'

import { useState } from "react";

import Holes from "./Holes";
import CurrentHole from './CurrentHole';
import Score from "./Score";

export default function Game({ game }) {
    if (!game) {
        throw new Error('Invalid game.');
    }

    const [holes] = useState(game.holes);
    const [currentHole, setCurrentHole] = useState(game.currentHole);
    const [score, setScore] = useState(game.score);

    const chooseHole = (id) => {
        setCurrentHole(id);

        // TODO: update game.
    }

    const updateScore = (increment) => {
        const newScore = score + (increment * 2) - 1; // Increase or decrease the current score by 1.

        setScore(newScore);

        // TODO: update game.
        // TODO: consider moving score state to ScoreCard component.
    }

    return (
        <main>
            <h1>Game</h1>
            <div className={styles.game}>
                <div className={styles.holes}>
                    <Holes holes={holes} currentHole={currentHole} chooseHole={(id) => chooseHole(id)} />
                </div>
                <div className={styles['current-hole']}>
                    <CurrentHole hole={holes.find((hole) => hole.id === currentHole)} />
                </div>
            </div>
            <div>
                <Score currentScore={score} updateScore={(increment) => updateScore(increment)} />
            </div>
        </main>
    );
}