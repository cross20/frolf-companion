import styles from './ScoreCard.module.css'

export default function ScoreCard({ currentScore, updateScore }) {
    return (
        <section className={styles.container}>
            <button onClick={() => updateScore(false)} aria-label={`Decrease score`}>Decrease</button>
            <output className={styles.score}>{currentScore.toLocaleString()}</output>
            <button onClick={() => updateScore(true)} aria-label={`Increase score`}>Increase</button>
        </section>
    );
}