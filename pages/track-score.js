import { useState } from 'react';

import Counter from '../lib/components/counter/Counter'
import Hole from '../lib/components/hole/Hole'

import { getHoles } from '../lib/database/redis';

import styles from '../styles/TrackScore.module.css'

function TrackScore(props) {
    const course = props.course;
    const holes = props.holes;

    const [hole, setHole] = useState(0);

    return (
        <main>
            <h1>Track Score</h1>
            <section className={styles.section}>
                <h2>Hole {hole + 1}</h2>
                <Hole hole={holes[hole]} />
            </section>
            <section className={styles.section}>
                <h2>Throws</h2>
                <Counter />
            </section>
            <button onClick={() => {
                setHole(hole - 1);
            }} disabled={hole === 0}>Previous Hole</button>
            <button onClick={() => {
                setHole(hole + 1);
            }} disabled={hole === holes.length - 1}>Next Hole</button>
        </main>
    )
}

export async function getServerSideProps(context) {
    const holes = await getHoles(0);

    holes.sort((a, b) => {
        return a.sequence - b.sequence;
    });

    return {
        props: {
            holes,
        }
    }
}

export default TrackScore