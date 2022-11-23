import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";

const EasyCrop = ({ imgSource, setImageSource, setIsCropping }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    console.log('cliquei botão de crop');
    try {
      const croppedImage = await getCroppedImg(
        imgSource,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setImageSource(croppedImage);
      setIsCropping(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, imgSource]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
      <div
        className="container"
        style={{
          display: imgSource === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="crop-container">
          <Cropper
            image={imgSource}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
      </div>
      <button
        style={{
          display: imgSource === null || croppedImage !== null ? "none" : "block", position: "relative", zIndex: 1
        }}
        onClick={showCroppedImage}
      >
        Crop
      </button>
    </div>
  );
};

export default EasyCrop;