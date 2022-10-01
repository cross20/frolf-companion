import styles from './search-bar.module.css'

export default function SearchBar() {
    return (
        <div className={styles.container}>
            <input type="text" placeholder="Find a course" className={styles.searchBar}></input>
            <button className={styles.search}>Search</button>
        </div>
    );
}