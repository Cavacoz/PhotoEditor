import React, { useState, useContext } from 'react';
import { Input } from 'reactstrap';
import Canvas from './CanvasComponent';
import { ImageContext } from '../App';

const PhotoEditor = (props) => {

    const image = useContext(ImageContext);
    const [imgName, setImageName] = useState('');

    function handleImageInputChange(e) {
        image.setImageSource(URL.createObjectURL(e.target.files[0]).toString());
        setImageName(e.target.files[0].name)
    }

    function clearImage() {
        image.setImageSource('');
    }

    return (
        <>
            <div className='container mt-4'>
                <div className='row editor-h1'>
                    <h1>Editor</h1>
                </div>
                <hr />
                {image.imgSource ?
                    <div className="container">
                        <Canvas auth={props.auth} imgName={imgName} imgSource={image.imgSource} clearImage={clearImage} />
                    </div>
                    :
                    <>
                        <div className='row'>
                            <h5 className='choose-photo-h5'>Choose your Photo to edit</h5>
                            <Input className='input-file' type="file" accept=".png, .jpg, .jpeg" onChange={handleImageInputChange} />
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default PhotoEditor;