import styles from './search-bar.module.css'

export default function SearchBar(props) {
    const onSubmit = (e) => {
        e.preventDefault();

        props.onSearch(new String(e.target['search-terms'].value).replace(/\s\s+/g, ' ').trim());   
    }

    return (
        <form className={styles.container} onSubmit={(e) => onSubmit(e)} role="search">
            <input type="text" name="search-terms" placeholder="Course name" className={styles.searchBar}></input>
            <button className={styles.search} type="submit">Search</button>
        </form>
    );
}