import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";

const EasyCrop = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div>
      <div className="crop-container">
        <Cropper
          image={props.imgSource}
          crop={crop}
          zoom={zoom}
          zoomSpeed={4}
          maxZoom={3}
          zoomWithScroll={true}
          showGrid={true}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <label>
          Zoom
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            className="range"
          />
        </label>
      </div>
    </div>
  );
};

export default EasyCrop;