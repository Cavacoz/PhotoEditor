import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Label } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan, faScissors, faFont, faWandMagicSparkles, faVectorSquare, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Frames from "./FramesComponent";
import Filters from "./FiltersComponent";

import './styles/instagram.css'
import EasyCrop from "./EasyCrop";

const FramesFilters = ({ frameRow, filterRow, cropRow, textRow, cropOption }) => {
    function handleFramesClicked() {
        frameRow.setFrameRow(!frameRow.frameRowOpen);
        filterRow.setFiltersRow(false);
        cropRow.setCropRow(false);
        textRow.setTextRow(false);
        cropOption.setIsCropping(false);
    }
    function handleFiltersClicked() {
        frameRow.setFrameRow(false);
        filterRow.setFiltersRow(!filterRow.filtersRowOpen);
        cropRow.setCropRow(false);
        textRow.setTextRow(false);
        cropOption.setIsCropping(false);
    }
    function handleCropClicked() {
        frameRow.setFrameRow(false);
        filterRow.setFiltersRow(false);
        cropRow.setCropRow(!cropRow.cropRowOpen);
        cropOption.setIsCropping(!cropOption.isCropping);
        textRow.setTextRow(false);
    }
    function handleTextClicked() {
        frameRow.setFrameRow(false);
        filterRow.setFiltersRow(false);
        cropRow.setCropRow(false);
        textRow.setTextRow(!textRow.textRowOpen);
        cropOption.setIsCropping(false);
    }
    return (
        <>
            <Button onClick={handleFramesClicked}><FontAwesomeIcon icon={faVectorSquare} /></Button>
            <Button onClick={handleFiltersClicked}><FontAwesomeIcon icon={faWandMagicSparkles} /></Button>
            <Button onClick={handleCropClicked}><FontAwesomeIcon icon={faScissors} /></Button>
            <Button onClick={handleTextClicked}><FontAwesomeIcon icon={faFont} /> Text</Button>
        </>
    );
}

const Canvas = (props) => {

    const [imgSource, setImageSource] = useState(props.imgSource);

    const [textToInsert, setTextToInsert] = useState();
    const [textColor, setTextColor] = useState('#ffffff');

    const [cropOption, setCropOption] = useState('square');
    const [isCropping, setIsCropping] = useState(false);

    const [frameRowOpen, setFrameRow] = useState(false);
    const [filtersRowOpen, setFiltersRow] = useState(false);
    const [cropRowOpen, setCropRow] = useState(false);
    const [textRowOpen, setTextRow] = useState(false);

    const [filterClass, setFilterClass] = useState('');
    const [framePath, setFramePath] = useState('');

    const CANVAS_WITDH = 1000;
    const CANVAS_HEIGHT = 500;

    const canvas = useRef(null);
    const frameCanvas = useRef(null);

    const textCanvas = useRef(null);
    var texts = [];
    var selectedText = -1;
    var offsetX, offsetY, startX, startY;

    const finalImageCanvas = useRef(null);

    var img = new Image();
    img.src = imgSource;
    const frame = new Image();
    frame.src = framePath;

    var hRatio = CANVAS_WITDH / img.naturalWidth;
    var vRatio = CANVAS_HEIGHT / img.naturalHeight;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (CANVAS_WITDH - img.naturalWidth * ratio) / 2;
    var centerShift_y = (CANVAS_HEIGHT - img.naturalHeight * ratio) / 2;

    useEffect(() => {
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
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT)
        ctx.filter = filterClass;
        ctx.drawImage(img,
            0, 0, img.naturalWidth, img.naturalHeight,
            centerShift_x, centerShift_y,
            img.naturalWidth * ratio, img.naturalHeight * ratio)
    }, [filterClass])
    useEffect(() => {
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
            ctx.drawImage(canvas, 0, 0, targetCanvas.width, targetCanvas.height);
        });
    }
    function handleTextChange(e) {
        setTextToInsert(e.target.value);
    }
    function handleColorChange(e) {
        setTextColor(e.target.value);
    }
    function clearImage() {
        props.clearImage();
    }
    function addText() {
        const ctx = textCanvas.current.getContext('2d');
        var text = {
            text: textToInsert,
            x: 500,
            y: 500
        }
        ctx.font = "26px verdana";
        ctx.fillStyle = textColor;
        text.width = ctx.measureText(text.text).width;
        text.height = 1000;
        texts.push(text);
        draw();
    }
    function draw() {
        const ctx = textCanvas.current.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];
            ctx.fillText(text.text, text.x, text.y);
        }
    }
    function textHittest(x, y, textIndex) {
        console.log('hit neste texto')
        var text = texts[textIndex];
        return (x >= text.x);
    }
    function handleMouseDown(e) {
        e.preventDefault();
        offsetX = textCanvas.current.offsetLeft;
        offsetY = textCanvas.current.offsetTop;
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        console.log(startX, startY)
        for (var i = 0; i < texts.length; i++) {
            if (textHittest(startX, startY, i)) {
                selectedText = i;
            }
        }
    }
    function handleMouseUp(e) {
        e.preventDefault();
        selectedText = -1;
    }
    function handleMouseMove(e) {
        if (selectedText < 0) {
            return;
        }
        e.preventDefault();
        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY);
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        var text = texts[selectedText];
        text.x += dx;
        text.y += dy;
        draw();
    }
    const downloadImage = (e) => {
        let link = e.currentTarget;
        link.setAttribute('download', 'test.png');
        let image = finalImageCanvas.current.toDataURL('image/png');
        link.setAttribute('href', image);
    }
    return (
        <>
            <div className="row image-name-row">
                <div className="col-10">
                    <h3>Image Name: </h3>
                    <h5>{props.imgName}</h5>
                </div>
                <div className="col-2 options-buttons">
                    <Button onClick={() => clearImage()}><FontAwesomeIcon icon={faTrashCan} /></Button>
                    {props.auth.isAuthenticated ?
                        <>
                            <a id="download_image" href="some_link" onClick={(e) => {
                                downloadImage(e)
                                mergeCanvas(finalImageCanvas.current, canvas.current, frameCanvas.current, textCanvas.current)
                            }}>
                                <Button><FontAwesomeIcon icon={faFloppyDisk} /></Button></a>
                            <Button><FontAwesomeIcon icon={faShareNodes} /></Button>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
            <div className='row canvas'>
                <div className='col-10 top-wrapper-image'>
                    {isCropping ?
                        <EasyCrop imgSource={imgSource} setImageSource={setImageSource} setIsCropping={setIsCropping}/>
                        :
                        <>
                            <canvas id="canvas1" className="image" ref={canvas} width={CANVAS_WITDH} height={CANVAS_HEIGHT} />
                            <canvas id="canvas2" className="image-frame" ref={frameCanvas} width={CANVAS_WITDH} height={CANVAS_HEIGHT} />
                            <canvas id="canvas3" className="text-canvas"
                                ref={textCanvas}
                                width={CANVAS_WITDH} height={CANVAS_HEIGHT}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            />
                            <canvas id="canvas4" ref={finalImageCanvas} width={CANVAS_WITDH} height={CANVAS_HEIGHT} hidden={true} />
                        </>
                    }
                </div>
                <div className='col-2 image-buttons-col'>
                    <FramesFilters frameRow={{ frameRowOpen, setFrameRow }}
                        filterRow={{ filtersRowOpen, setFiltersRow }}
                        cropRow={{ cropRowOpen, setCropRow }}
                        textRow={{ textRowOpen, setTextRow }}
                        cropOption={{ isCropping, setIsCropping }} />
                </div>
                <div className="row">
                    {frameRowOpen ?
                        <Frames imgSource={imgSource}
                            framePath={framePath}
                            setFramePath={setFramePath}
                            frameRow={{ frameRowOpen, setFrameRow }}
                            canvas={canvas}
                            canvasDimensions={{ CANVAS_WITDH, CANVAS_HEIGHT }} />
                        :
                        <></>
                    }
                    {filtersRowOpen ?
                        <Filters imgSource={imgSource}
                            filterClass={filterClass}
                            setFilterClass={setFilterClass}
                            filterRow={{ filtersRowOpen, setFiltersRow }} />
                        :
                        <></>
                    }
                    {cropRowOpen ?
                        <>
                            <div className="col-10 text-info-col">
                                <Label><strong>Crop option</strong></Label>
                                <Input type="select" onChange={(e) => setCropOption(e.target.value)}>
                                    <option value="square">Square</option>
                                    <option value="circle">Circle</option>
                                    <option value="ellipse">Ellipse</option>
                                    <option value="triangle">Triangle</option>
                                </Input>
                            </div>
                        </>
                        :
                        <></>
                    }
                    {textRowOpen ?
                        <>
                            <div className="col-10 mt-2 text-info-col">
                                <Label><strong>Text</strong></Label>
                                <Input maxLength={10} type="text" onChange={handleTextChange} />

                                <Label><strong>Text color</strong></Label>
                                <Input type="color" name="color" id="exampleColor" placeholder="color placeholder" value={textColor} onChange={handleColorChange} />
                            </div>
                            <div className="col-2 text-info-button">
                                <Button onClick={addText}>Add Text</Button>
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