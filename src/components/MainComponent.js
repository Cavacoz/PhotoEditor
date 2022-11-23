import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PhotoEditor from './PhotoEditorComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';

import MyCollection from './MyCollectionComponent';

import { loginUser } from './ApiCalls'

const Main = (props) => {

    //has firstname, lastname and username/email
    const [auth, setAuth] = useState([]);

    return (
        <>
            <Header auth={auth} setAuth={setAuth} />
            <Routes >
                <Route path="/login" element={<Login loginUser={loginUser} setAuth={setAuth} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/photoeditor" element={<PhotoEditor auth={auth} />} />
                <Route path="/mycollection" element={<MyCollection />} />
                <Route path="/home" element={<Home />} />
                <Route path='*' element={<Navigate to="/home" />} />
            </Routes >
        </>
    );
}

export default Main;