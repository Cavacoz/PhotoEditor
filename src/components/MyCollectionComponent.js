import React, { useEffect, useState } from "react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { baseUrl } from '../shared/baseUrl';

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
    };

    return (
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
    );
}

export default MyCollection;