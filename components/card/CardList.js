import styles from './CardList.module.css';

export default function CardList(props) {
    return (
        <ol className={styles.container} role="button">
            {props.children}
        </ol>
    );
}