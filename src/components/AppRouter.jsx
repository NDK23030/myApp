import React, {useContext}from 'react';
import {  Navigate, Route, Routes } from "react-router-dom";
import {AuthContext} from '../context';

import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? 
            <Routes to="/posts" replace>
                {privateRoutes.map(route => 
                    <Route 
                        path={route.path} 
                        element={route.component}
                        key={route.path}
                    />
                )}
                <Route path='/*' element={<Navigate to='/posts' replace/>}/>
            </Routes>
            : 
            <Routes>
                {publicRoutes.map(route => 
                    <Route 
                        path={route.path} 
                        element={route.component}
                        key={route.path}
                    />
                )}
                <Route path='/*' element={<Navigate to='/login' replace/>}/>
            </Routes>
    );
};

export default AppRouter;