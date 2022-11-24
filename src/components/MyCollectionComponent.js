import React, { useEffect, useState } from "react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { baseUrl } from '../shared/baseUrl';
import { fetchImages, postImage } from "./ApiCalls";

const MyCollection = ({ auth }) => {

    const publicKey = 'public_Q4+YMPWdnNO13CXq1ZF4tm5j0ro='
    const urlEndpoint = 'https://ik.imagekit.io/nny7nrtku';
    const authenticationEndpoint = baseUrl + 'mycollection/auth';

    const [imgsUrls, setImgsUrls] = useState([]);

    useEffect(() => {
        fetchImages()
            .then(imgs => {
                setImgsUrls(imgs);
                console.log('component', imgsUrls);
            })
    }, [])

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        console.log("Success", res);
        postImage(res.url);
    };

    return (
        <>
            {auth?.isAuthenticated ?
                <div className='container mt-4'>
                    <div className='row' style={{ textAlign: 'left' }}>
                        <h1>My Collection</h1>
                    </div>
                    <div className="row">
                        <IKContext
                            publicKey={publicKey}
                            urlEndpoint={urlEndpoint}
                            authenticationEndpoint={authenticationEndpoint}>
                            {imgsUrls.map((img) => {
                                return (
                                    <div className="col-3">
                                        <IKImage
                                            src={`${img.url}`}
                                            transformation={[{
                                                height: 150,
                                                width: 150
                                            }]}
                                        />
                                    </div>
                                );
                            })}
                            <IKUpload
                                fileName="test-upload.png"
                                onError={onError}
                                onSuccess={onSuccess}
                            />
                        </IKContext>
                    </div>
                </div>
                :
                <div className="container mt-4">
                    <div className='row'>
                        <h1>You are not Authenticated!</h1>
                    </div>
                </div>
            }
        </>
    );
}

export default MyCollection;