import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, path }) => {
    const user = useSelector(({ user }) => user);
    const location = useLocation();
    return (
        <Route path={path} exact>
            {user ? children : <Redirect to={{ pathname: 'login', state: { from: location } }} />}
        </Route>
    )
}

export default PrivateRoute;
