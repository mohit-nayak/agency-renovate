import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Projects from '../pages/Projects/Projects';
import Quotes from '../pages/Quotes/Quotes';
import Settings from "../pages/Settings/Settings";
import NotFound from '../pages/NotFound/NotFound';
import { Context as authContext } from '../context/AuthContext';

const AppRoutes = () => {
    const { state: { isSuperAdmin } } = useContext(authContext);

    return (
        <Switch>
            <Route path='/' component={Projects} exact />
            <Route path='/projects' component={Projects} />
            <Route path='/quotes' component={Quotes} />
            { isSuperAdmin && <Route path='/settings' component={Settings} /> }
            <Route component={NotFound} />
        </Switch>
    );
};

export default AppRoutes;
