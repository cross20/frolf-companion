import { useState, useEffect, useRef } from 'react';
import styles from './counter.module.css'

export default function Counter(props) {
    // Declare attributes.
    const [count, setCount] = useState((props.initialCount ? props.initialCount : 0));

    /** Amount to decrement `count` by. */
    const decrementBy = (props.decrementBy ? props.decrementBy : 1);

    /** Amount to increment `count` by. */
    const incrementBy = (props.incrementBy ? props.incrementBy : 1);

    /** Default minimum value if the initial value of `count` is not less than this value. */
    const defaultMin = 0;

    /** Minimum allowed value of `count`. */
    const min = (props.min ? props.min : (props.initialCount < defaultMin ? props.initialCount : defaultMin));

    /** Default maximum value if the initial value of `count` is not greater than this value. */
    const defaultMax = 100;

    /** Maximum allowed value of `count`. */
    const max = (props.max ? props.max : (props.initialCount > defaultMax ? props.initialCount : defaultMax));

    /** Button used to decrement `count`. */
    const decrementElement = useRef(null);

    /** Button used to increment `count`. */
    const incrementElement = useRef(null);

    // Declare functions.
    /**
     * Get the decremented value of `count`.
     * @returns decremented value of `count`.
     */
    const getDecrementedCount = () => {
        return count - decrementBy;
    }

    /**
     * Get the incremented value of `count`.
     * @returns incremented value of `count`.
     */
    const getIncrementedCount = () => {
        return count + incrementBy;
    }

    /**
     * Enable and disable action elements based on future values of `count`.
     */
     const setAvailableActions = () => {
        // Check decrement action.
        const futureCountDecremented = getDecrementedCount();
        decrementElement.current.disabled = (futureCountDecremented < min);
        
        // Check increment action.
        const futureCountIncremented = getIncrementedCount();
        incrementElement.current.disabled = (futureCountIncremented > max);
    }

    // Do work.
    useEffect(() => {
        setAvailableActions();
    }, [count]);

    return (
        <article className={styles.container}>
            <button ref={decrementElement} className={styles.button} onClick={() => setCount(getDecrementedCount())}>-</button>
            <output className={styles.output}>{count}</output>
            <button ref={incrementElement} className={styles.button} onClick={() => setCount(getIncrementedCount())}>+</button>
        </article>
    )
}