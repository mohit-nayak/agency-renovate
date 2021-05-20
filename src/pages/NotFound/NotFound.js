import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.Wrapper}>
            <h1 className={styles.Title}>Oops, page not found!</h1>
        </div>
    );
};

export default NotFound;
