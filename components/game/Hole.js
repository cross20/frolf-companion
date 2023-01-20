import styles from './Hole.module.css'

export default function Hole({ hole, current, chooseHole }) {
    if (!hole) {
        throw new Error('There is no hole to display.');
    }

    // TODO: allow content to be focusable.
    return (
        <article onClick={() => chooseHole()} className={(current ? styles['current-hole'] : styles['hole'])}>
            <div className={styles.content}>
                <div className={styles.information}>
                    <h3 className={styles.name}>{hole.name}</h3>
                    <p className={styles.description}>{hole.description}</p>
                    <ul className={styles.attributes}>
                        <li className={styles.attribute}>
                            {`Par ${hole.par}`}
                        </li>
                        <li className={styles.attribute}>
                            {`${hole.type.name}`}
                        </li>
                        <li className={styles.attribute}>
                            {`${hole.difficulty.name}`}
                        </li>
                    </ul>
                    <button onClick={() => chooseHole()} hidden={true}>Choose hole</button>
                </div>
                <div className={styles.thumbnail}>
                    {/* TODO: image */}
                </div>
            </div>
        </article>
    );
}