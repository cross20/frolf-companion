import styles from './Card.module.css'

export default function Card(props) {
    return (
        <li className={styles.container}>
            <article>
                {props.children}
            </article>
        </li>
    );
}