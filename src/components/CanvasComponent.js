import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Label } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan, faScissors, faFont, faWandMagicSparkles, faVectorSquare, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Frames from "./FramesComponent";
import Filters from "./FiltersComponent";

import './styles/instagram.css'

const FramesFilters = ({ frameRow, filterRow, cropRow, textRow }) => {

    function handleFramesClicked() {
        frameRow.setFrameRow(!frameRow.frameRowOpen);
        filterRow.setFiltersRow(false);
        cropRow.setCropRow(false);
        textRow.setTextRow(false);
    }

    function handleFiltersClicked() {
        frameRow.setFrameRow(false);
        filterRow.setFiltersRow(!filterRow.filtersRowOpen);
        cropRow.setCropRow(false);
        textRow.setTextRow(false);
    }

    function handleTextClicked() {
        frameRow.setFrameRow(false);
        filterRow.setFiltersRow(false);
        cropRow.setCropRow(false);
        textRow.setTextRow(!textRow.textRowOpen);
    }

    return (
        <>
            <Button onClick={handleFramesClicked}><FontAwesomeIcon icon={faVectorSquare} /></Button>
            <Button onClick={handleFiltersClicked}><FontAwesomeIcon icon={faWandMagicSparkles} /></Button>
            <Button onClick={() => cropRow.setCropRow(!cropRow.cropRowOpen)}><FontAwesomeIcon icon={faScissors} /></Button>
            <Button onClick={handleTextClicked}><FontAwesomeIcon icon={faFont} /> Text</Button>
        </>
    );
}

const Canvas = (props) => {

    const [textToInsert, setTextToInsert] = useState();
    const [textColor, setTextColor] = useState('#ffffff');
    const [textPosition, setTextPosition] = useState('text-inside-image-center')

    const [frameRowOpen, setFrameRow] = useState(false);
    const [filtersRowOpen, setFiltersRow] = useState(false);
    const [cropRowOpen, setCropRow] = useState(false);
    const [textRowOpen, setTextRow] = useState(false);

    const [finalCanvas, setFinalCanvas] = useState(false);

    const [filterClass, setFilterClass] = useState('');
    const [framePath, setFramePath] = useState('');

    const canvas = useRef(null);
    const frameCanvas = useRef(null);
    const finalImageCanvas = useRef(null);

    const CANVAS_WITDH = 1000;
    const CANVAS_HEIGHT = 500

    const img = new Image();
    img.src = props.imgSource;
    const frame = new Image();
    frame.src = framePath;

    var hRatio = CANVAS_WITDH / img.naturalWidth;
    var vRatio = CANVAS_HEIGHT / img.naturalHeight;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (CANVAS_WITDH - img.naturalWidth * ratio) / 2;
    var centerShift_y = (CANVAS_HEIGHT - img.naturalHeight * ratio) / 2;

    useEffect(() => {
        console.log('unico useEffect')
        img.onload = function () {
            console.log('dei load na imagem')
            const ctx = canvas.current.getContext('2d');
            var hRatio = CANVAS_WITDH / img.naturalWidth;
            var vRatio = CANVAS_HEIGHT / img.naturalHeight;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = (CANVAS_WITDH - img.naturalWidth * ratio) / 2;
            var centerShift_y = (CANVAS_HEIGHT - img.naturalHeight * ratio) / 2;
            ctx.drawImage(img,
                0, 0, img.naturalWidth, img.naturalHeight,
                centerShift_x, centerShift_y,
                img.naturalWidth * ratio, img.naturalHeight * ratio)
        }
    }, [])

    useEffect(() => {
        console.log('atualizei imagem')
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT)
        ctx.filter = filterClass;
        ctx.drawImage(img,
            0, 0, img.naturalWidth, img.naturalHeight,
            centerShift_x, centerShift_y,
            img.naturalWidth * ratio, img.naturalHeight * ratio)
    }, [filterClass])

    useEffect(() => {
        console.log('adicionei frame')
        const ctx = frameCanvas.current.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
        var hRatio = CANVAS_WITDH / frame.naturalWidth;
        var vRatio = CANVAS_HEIGHT / frame.naturalHeight;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (CANVAS_WITDH - frame.naturalWidth * ratio) / 2;
        var centerShift_y = (CANVAS_HEIGHT - frame.naturalHeight * ratio) / 2;
        ctx.drawImage(frame,
            0, 0, frame.naturalWidth, frame.naturalHeight,
            centerShift_x, centerShift_y,
            frame.naturalWidth * ratio, frame.naturalHeight * ratio)
    }, [framePath])

    function mergeCanvas(targetCanvas, ...args) {
        const ctx = targetCanvas.getContext('2d');
        args.forEach(canvas => {
            ctx.drawImage(canvas, 0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
        });
    }

    function handleTextChange(e) {
        setTextToInsert(e.target.value);
    }

    function handleColorChange(e) {
        setTextColor(e.target.value);
    }

    function handleTextPositionChange(e) {
        setTextPosition(e.target.value);
    }

    function clearImage() {
        props.clearImage();
    }

    const downloadImage = (e) => {
        mergeCanvas(finalImageCanvas.current, canvas.current, frameCanvas.current);
        let link = e.currentTarget;
        link.setAttribute('download', 'test.png');
        let image = finalImageCanvas.current.toDataURL('image/png');
        link.setAttribute('href', image);
    }

    return (
        <>
            <div className="row" style={{ textAlign: "left" }}>
                <div className="col-10">
                    <h3>Image Name: </h3>
                    <h5>{props.imgName}</h5>
                </div>
                <div className="col-2 options-buttons">
                    <Button onClick={() => clearImage()}><FontAwesomeIcon icon={faTrashCan} /></Button>
                    <a id="download_image" href="some_link" onClick={downloadImage}>Download</a>
                    <Button><FontAwesomeIcon icon={faShareNodes} /></Button>
                </div>

            </div>

            <div className='row canvas'>

                <div className='col-10 top-wrapper-image'>

                    <canvas id="canvas1" className="image" ref={canvas} width={CANVAS_WITDH} height={CANVAS_HEIGHT}></canvas>
                    <canvas id="canvas2" className="image-frame" ref={frameCanvas} width={CANVAS_WITDH} height={CANVAS_HEIGHT}></canvas>

                    <canvas id="canvas3" ref={finalImageCanvas} width={CANVAS_WITDH} height={CANVAS_HEIGHT} hidden={true}></canvas>


                    <p className={`${textPosition}`} style={{ color: `${textColor}` }}>{textToInsert}</p>

                </div>
                <div className='col-2 image-buttons-col'>
                    <FramesFilters frameRow={{ frameRowOpen, setFrameRow }}
                        filterRow={{ filtersRowOpen, setFiltersRow }}
                        cropRow={{ cropRowOpen, setCropRow }}
                        textRow={{ textRowOpen, setTextRow }} />
                </div>

                <div className="row">
                    {frameRowOpen ?
                        <Frames imgSource={props.imgSource}
                            framePath={framePath}
                            setFramePath={setFramePath}
                            frameRow={{ frameRowOpen, setFrameRow }}
                            canvas={canvas}
                            canvasDimensions={{ CANVAS_WITDH, CANVAS_HEIGHT }} />
                        :
                        <>
                        </>
                    }

                    {filtersRowOpen ?
                        <Filters imgSource={props.imgSource}
                            filterClass={filterClass}
                            setFilterClass={setFilterClass}
                            filterRow={{ filtersRowOpen, setFiltersRow }} />
                        :
                        <>
                        </>
                    }

                    {textRowOpen ?
                        <>
                            <div className="mt-2" style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                                <Label><strong>Text</strong></Label>
                                <Input maxLength={10} type="text" onChange={handleTextChange} />

                                <Label><strong>Text color</strong></Label>
                                <Input type="color" name="color" id="exampleColor" placeholder="color placeholder" value={textColor} onChange={handleColorChange} />

                                <Label><strong>Text position</strong></Label>
                                <Input type="select" onChange={handleTextPositionChange}>
                                    <option value="text-inside-image-center">Center</option>
                                    <option value="text-inside-image-topleft">Top Left</option>
                                    <option value="text-inside-image-topright">Top Right</option>
                                    <option value="text-inside-image-bottomleft">Bottom Left</option>
                                    <option value="text-inside-image-bottomright">Bottom Right</option>
                                </Input>
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    );

}

export default Canvas;