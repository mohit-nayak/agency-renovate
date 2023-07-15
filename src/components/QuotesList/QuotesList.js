import React from 'react';
import QuoteTile from "../QuoteTile/QuoteTile";
import styles from './QuotesList.module.scss';

const QuotesList = ({ quotes }) => {
    return (
        <div className={styles.Wrapper}>
            { quotes && Object.keys(quotes).reverse().map(key => {
                return <QuoteTile key={key} data={quotes[key]} />
            }) }

            { !quotes && <h5 className={styles.NotFound}>No quotes yet!</h5> }
        </div>
    );
};

export default QuotesList;
