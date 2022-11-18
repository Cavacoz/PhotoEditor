import React from "react";

const Home = () => {

    return (
        <div className="container mt-4">
            <div className='row' style={{ textAlign: 'left' }}>
                <h1>Photo Editor</h1>
            </div>

            <hr />

            <div className="row mt-5">
                <div className="col-6 what-is-it" >
                    <h3>What is it</h3>
                </div>
                <div className="col-6 what-is-it-info">
                    <ul>
                        <lh>Here you can upload one image at a time so you can:</lh>
                        <li className="mt-1">Crop it</li>
                        <li>Add Frames</li>
                        <li>And add Filters</li>
                    </ul>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-6 what-is-it">
                    <h3>How to use it</h3>
                </div>
                <div className="col-6 what-is-it-info">
                    <ol type="1">
                        <lh>Steps:</lh>
                        <li className="mt-1">Go to Editor Page</li>
                        <li>Upload your image from your computer</li>
                        <li>Crop it, add a filter or a frame, maybe everything together</li>
                        <li>Finaly, you can download it</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Home;