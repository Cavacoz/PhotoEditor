import React, { useState } from 'react';
import { Input } from 'reactstrap';
import Canvas from './CanvasComponent';

const PhotoEditor = (props) => {

    const [imgSource, setImgSource] = useState('');
    const [imgName, setImageName] = useState('');

    function handleImageInputChange(e) {
        setImgSource(URL.createObjectURL(e.target.files[0]).toString());
        setImageName(e.target.files[0].name)
    }

    function clearImage() {
        setImgSource('');
    }

    return (
        <>
            <div className='container mt-4'>
                <div className='row' style={{ textAlign: 'left' }}>
                    <h1>Editor</h1>
                </div>
                <hr />
                {imgSource ?
                    <div className="container">
                        <Canvas auth={props.auth} imgName={imgName} imgSource={imgSource} clearImage={clearImage} />
                    </div>
                    :
                    <>
                        <div className='row'>
                            <h5 style={{ textAlign: 'start' }}>Choose your Photo to edit</h5>
                            <Input className='input-file' type="file" accept=".png, .jpg, .jpeg" onChange={handleImageInputChange} />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default PhotoEditor;