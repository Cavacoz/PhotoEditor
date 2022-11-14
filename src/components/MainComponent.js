import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PhotoEditor from './PhotoEditorComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';

const Main = (props) => {
    return (
        <>
            <Header />
            <Routes >
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/photoeditor" element={<PhotoEditor />} />
                <Route path="/home" element={<Home />} />
                <Route path='*' element={<Navigate to="/home" />} />
            </Routes >
        </>
    );
}

export default Main;