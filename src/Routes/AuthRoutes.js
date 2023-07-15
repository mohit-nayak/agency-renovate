import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';

const AuthRoutes = () => {
    return (
        <Switch>
            <Route component={Login} />
        </Switch>
    );
};

export default AuthRoutes;
