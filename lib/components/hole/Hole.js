import { useState } from 'react';

import styles from './Hole.module.css'

export default function Hole(props) {
    const hole = props.hole;

    return (
        <article className={styles.container}>
            {hole.name},{' '}
            {hole.point.latitude},{' '}
            {hole.point.longitude}
        </article>
    );
}