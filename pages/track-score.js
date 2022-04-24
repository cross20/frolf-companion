import { useState } from 'react';

import Counter from '../lib/components/counter/Counter'
import Hole from '../lib/components/hole/Hole'

import { getHoles } from '../lib/database/redis';

import styles from '../styles/TrackScore.module.css'

function TrackScore(props) {
    const [hole, setHole] = useState(props.hole);

    return (
        <main>
            <section className={styles.section}>
                <h2>Hole #{hole.sequence}</h2>
                <Hole hole={hole} />
            </section>
            <section className={styles.section}>
                <h2>Throws</h2>
                <Counter />
            </section>
        </main>
    )
}

export async function getServerSideProps(context) {
    const holes = await getHoles(0);

    const hole = holes[0].entityData;
    console.log(hole);

    return {
        props: {
            hole,
        }
    }
}

export default TrackScore