import styles from './Holes.module.css'

import Hole from "./Hole";

export default function Holes({ holes, currentHole, chooseHole }) {
    const Content = () => {
        if (!holes || holes.length === 0) {
            return (
                <p>This course does not have any holes.</p>
            );
        } else {
            return (
                <ol className={styles.holes}>
                    {holes.map((hole) => {
                        return (
                            <li className={styles.hole}>
                                <Hole hole={hole} current={currentHole === hole.id} chooseHole={() => chooseHole(hole.id)} />
                            </li>
                        );
                    })}
                </ol>
            );
        }
    }

    return (
        <section>
            <h2>Holes</h2>
            <Content />
        </section>
    );
}