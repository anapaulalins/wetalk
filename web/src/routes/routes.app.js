import React from 'react';
import {Switch} from 'react-router-dom';

import Landing from '../pages/landing';
import Login from '../pages/login';
import SingUp from '../pages/singUp';
import Window from '../pages/window';

import RouteInterface from './routeInterface';

function Routes(){

    return (
        <Switch>
        <RouteInterface path="/" exact component={Landing} />
        <RouteInterface path="/login"  component={Login} />
        <RouteInterface path="/singup"  component={SingUp} />
        <RouteInterface path="/window"  component={Window} isPrivate />
    </Switch>
    )

}

export default Routes;