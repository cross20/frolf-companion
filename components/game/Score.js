import styles from './Score.module.css'

export default function Score({ currentScore, updateScore }) {
    return (
        <article className={styles.container}>
            <button onClick={() => updateScore(false)} aria-label={`Decrease score`}>Decrease</button>
            <output className={styles.score}>{currentScore.toLocaleString()}</output>
            <button onClick={() => updateScore(true)} aria-label={`Increase score`}>Increase</button>
        </article>
    );
}