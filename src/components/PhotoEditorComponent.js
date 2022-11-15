import React, { useState } from 'react';
import { Input } from 'reactstrap';
import Canvas from './CanvasComponent';

const PhotoEditor = (props) => {

    const [selectedPhoto, setSelectedPhoto] = useState();
    const [imgSource, setImgSource] = useState('');

    function handleImageInputChange(e) {
        setSelectedPhoto(e.target.files[0]);
        console.log(window.location.href);

        //setImgSource("blob:http://lo")
    }

    function clearImage() {
        setSelectedPhoto(undefined);
    }

    return (
        <>
            <div className='container mt-4'>
                <div className='row' style={{ textAlign: 'left' }}>
                    <h1>Editor</h1>
                </div>
                <hr />
                {selectedPhoto !== undefined ?
                    <div className="container">
                        <Canvas selectedPhoto={selectedPhoto} clearImage={clearImage} />
                    </div>
                    :
                    <>
                        <div className='row'>
                            <h5 style={{ textAlign: 'start' }}>Choose your Photo to edit</h5>
                            <Input style={{ width: 500, marginLeft: 12 }} type="file" accept=".png, .jpg, .jpeg" onChange={handleImageInputChange} />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default PhotoEditor;