import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context as appContext } from './context/AppContext';
import { Context as authContext } from './context/AuthContext';
import AuthRoutes from "./Routes/AuthRoutes";
import AppRoutes from "./Routes/AppRoutes";
import Loading from "./components/Loading/Loading";
import styles from './App.module.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import MobileTopBar from "./components/MobileTopBar/MobileTopBar";

function App() {
    const { startAuthLoading, stopAuthLoading } = useContext(appContext);
    const { state: { authenticated }, checkAuth } = useContext(authContext);

    useEffect(() => {
        startAuthLoading();
        checkAuth(stopAuthLoading);

        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.App}>
            <Loading type="app" />
            <Loading type="auth" />

            <Router>
                { authenticated && <>
                    <MobileTopBar />
                    <Sidebar />
                    <div className={styles.PageContentWrapper}>
                        <AppRoutes />
                    </div>
                </>}

                { ( !authenticated && authenticated !== null ) && <AuthRoutes /> }
            </Router>
        </div>
    );
}

export default App;
