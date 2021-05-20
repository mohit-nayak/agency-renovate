import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Projects from '../pages/Projects/Projects';
import Quotes from '../pages/Quotes/Quotes';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
    return (
        <Switch>
            <Route path='/' component={Projects} exact />
            <Route path='/projects' component={Projects} />
            <Route path='/quotes' component={Quotes} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default AppRoutes;
