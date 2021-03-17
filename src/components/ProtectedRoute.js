import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SIGNUP } from '../utils/routes';

const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route>{() => (props.loggedIn === true ? <Component {...props} /> : <Redirect to={SIGNUP} />)}</Route>
);

export default ProtectedRoute;
