import React, {useContext, useEffect} from 'react';
import { Context as appContext } from '../../context/AppContext';
import { Context as quoteContext } from '../../context/QuoteContext';
import { startListeningForQuoteDataChange } from '../../api/firebase';
import styles from './Quotes.module.scss';
import QuotesList from "../../components/QuotesList/QuotesList";

const Quotes = () => {
    const { startLoading, stopLoading } = useContext(appContext);
    const { state: { quotes }, setQuotes } = useContext(quoteContext);

    // Store response each time data updated at backend.
    const storeResponse = data => {
        setQuotes(data);
        stopLoading();
    };

    // Start listening for data updates at backend.
    useEffect(() => {
        startLoading();
        startListeningForQuoteDataChange(storeResponse);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.Wrapper}>
            <h4 className={styles.Title}>User Quotes</h4>

            <QuotesList quotes={quotes} />
        </div>
    );
};

export default Quotes;
