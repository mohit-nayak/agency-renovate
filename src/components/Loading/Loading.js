import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Context as appContext } from '../../context/AppContext';
import styles from './Loading.module.scss';

const Loading = ({ type = 'app' }) => {
    const { state: { loading, authLoading } } = useContext(appContext);
    const condition = type === "auth" ? authLoading : loading;

    return (
        <>
            { condition && <div className={styles.Wrapper}>
                <Spinner animation="border" variant="primary" size="lg" role="status" className={styles.Spinner}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div> }
        </>
    );
};

export default Loading;
