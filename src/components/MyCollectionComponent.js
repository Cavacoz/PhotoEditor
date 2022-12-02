import React, { useEffect, useState } from "react";
import { IKImage, IKContext } from 'imagekitio-react';
import { baseUrl } from '../shared/baseUrl';
import { fetchImages, deleteImage } from "./ApiCalls";
import { Button } from "reactstrap";

const MyCollection = ({ auth }) => {

    const publicKey = 'public_Q4+YMPWdnNO13CXq1ZF4tm5j0ro='
    const urlEndpoint = 'https://ik.imagekit.io/nny7nrtku';
    const authenticationEndpoint = baseUrl + 'mycollection/auth';

    const [imgsUrls, setImgsUrls] = useState([]);

    useEffect(() => {
        fetchImages()
            .then(imgs => {
                setImgsUrls(imgs);
            })
    }, [])

    async function deletePhoto(e) {
        await deleteImage(e.target.value);
        fetchImages()
            .then(imgs => {
                setImgsUrls(imgs);
            })
    }

    return (
        <>
            {auth?.isAuthenticated ?
                <div className='container mt-4'>
                    <div className='row row-collection'>
                        <h1>My Collection</h1>
                    </div>
                    <div className="row">
                        <IKContext
                            publicKey={publicKey}
                            urlEndpoint={urlEndpoint}
                            authenticationEndpoint={authenticationEndpoint}>
                            {imgsUrls.map((img) => {
                                return (
                                    <div key={img.url} className="col-3">
                                        <IKImage
                                            src={`${img.url}`}
                                            transformation={[{
                                                height: 150,
                                                width: 150
                                            }]}
                                        />
                                        <Button onClick={deletePhoto} value={img.url}>Del</Button>
                                        <Button>Download</Button>
                                    </div>
                                );
                            })}
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