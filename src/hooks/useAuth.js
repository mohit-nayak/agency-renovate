import React, { useContext } from "react";
import { Context as appContext } from '../context/AppContext';
import { Context as authContext } from '../context/AuthContext';

export default () => {
    const { startLoading, stopLoading } = useContext(appContext);
    const { checkAuth } = useContext(authContext);


};