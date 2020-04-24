import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Main from "./Components/Main";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dash/:room/:id' component={Main} />
            </Switch>
        </BrowserRouter>
    );
}
