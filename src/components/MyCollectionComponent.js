import React, { useEffect, useState } from "react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { baseUrl } from '../shared/baseUrl';
import { postImage } from "./ApiCalls";

const MyCollection = (props) => {

    const publicKey = 'public_Q4+YMPWdnNO13CXq1ZF4tm5j0ro='
    const urlEndpoint = 'https://ik.imagekit.io/nny7nrtku';
    const authenticationEndpoint = baseUrl + 'mycollection/auth';

    const [imgsUrls, setImgsUrls] = useState([]);

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        console.log("Success", res);
        postImage(res.url);
    };

    return (
        <>
            <div className='container mt-4'>
                <div className='row' style={{ textAlign: 'left' }}>
                    <h1>My Collection</h1>
                </div>
                <IKContext
                    publicKey={publicKey}
                    urlEndpoint={urlEndpoint}
                    transformationPosition="path"
                    authenticationEndpoint={authenticationEndpoint}>

                    <IKUpload
                        fileName="test-upload.png"
                        onError={onError}
                        onSuccess={onSuccess}
                    />
                </IKContext>
            </div>
        </>
    );
}

export default MyCollection;