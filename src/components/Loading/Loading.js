import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Context as appContext } from '../../context/AppContext';
import styles from './Loading.module.scss';

const Loading = () => {
    const { state: { loading } } = useContext(appContext);

    return (
        <>
            { loading && <div className={styles.Wrapper}>
                <Spinner animation="border" variant="primary" size="lg" role="status" className={styles.Spinner}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div> }
        </>
    );
};

export default Loading;
