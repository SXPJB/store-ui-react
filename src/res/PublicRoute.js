import React from 'react';
import {Route,Redirect } from 'react-router-dom';
import {Utils} from "./Utils";

//handle the public routes
export default function PublicRoute({component:Component,...rest}){
    return(
        <Route
            {...rest}
            render={(props) => !Utils.getUser() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />}
        />
    )
}