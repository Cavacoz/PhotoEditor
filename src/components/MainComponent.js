import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PhotoEditor from './PhotoEditorComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';

import { baseUrl } from '../shared/baseUrl';
import MyCollection from './MyCollectionComponent';

const Main = (props) => {

    //has firstname, lastname and username/email
    const [auth, setAuth] = useState([]);

    const loginUser = (creds) => {
        return fetch(baseUrl + 'users/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setAuth(response.user);
                    console.log(response.user);
                    localStorage.setItem('token', response.token);
                }
            })
            // handle error
    }

    return (
        <>
            <Header auth={auth} setAuth={setAuth} />
            <Routes >
                <Route path="/login" element={<Login loginUser={loginUser} />} />
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