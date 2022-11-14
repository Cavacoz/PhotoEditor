import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import Filters from "./FiltersComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan, faScissors, faFont, faWandMagicSparkles, faVectorSquare, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Frames from "./FramesComponent";

const FramesFilters = ({ frameRow, filterRow, cropRow, textRow }) => {

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

    function handleFramesClicked() {
        frameRow.setFrameRow(!frameRow.frameRowOpen);
        filterRow.setFiltersRow(false);
        cropRow.setCropRow(false);
        textRow.setTextRow(false);
    }

    return (
        <>
            <div className="row" style={{ paddingTop: 10, rowGap: 10 }}>
                <Button onClick={handleFramesClicked}><FontAwesomeIcon icon={faVectorSquare} /></Button>
                <Button onClick={handleFiltersClicked}><FontAwesomeIcon icon={faWandMagicSparkles} /></Button>
                <Button onClick={() => cropRow.setCropRow(!cropRow.cropRowOpen)}><FontAwesomeIcon icon={faScissors} /></Button>
                <Button onClick={handleTextClicked}><FontAwesomeIcon icon={faFont} /> Text</Button>
            </div>
        </>
    );
}

const Canvas = (props) => {

    const [textToInsert, setTextToInsert] = useState();

    const [frameRowOpen, setFrameRow] = useState(false);
    const [filtersRowOpen, setFiltersRow] = useState(false);
    const [cropRowOpen, setCropRow] = useState(false);
    const [textRowOpen, setTextRow] = useState(false);

    const [filterClass, setFilterClass] = useState('');

    const [framePath, setFramePath] = useState('');

    function handleTextChange(e) {
        setTextToInsert(e.target.value)
    }

    function clearImage() {
        props.clearImage();
    }

    return (
        <>
            <div className="row" style={{ textAlign: "left" }}>
                <div className="col-10">
                    <h3>Image Name: </h3>
                    <h5>{props.selectedPhoto.name}</h5>
                </div>
                <div className="col-2" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    height: 40, columnGap: 10
                }}>
                    <Button onClick={() => clearImage()}><FontAwesomeIcon icon={faTrashCan} /></Button>
                    <Button><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                    <Button><FontAwesomeIcon icon={faShareNodes} /></Button>
                </div>

            </div>

            <div className='row canvas'>

                <div className='col-10 top-wrapper-image'>

                    <img className={`${filterClass} image`} style={{ objectFit: "cover" }}
                        src={URL.createObjectURL(props.selectedPhoto)}
                        alt="SelectedImg" />
                    <img className="frame-image" src={`${framePath}`} />
                    <p className="text-inside-image">{textToInsert}</p>
                </div>
                <div className='col-2'>
                    <FramesFilters frameRow={{ frameRowOpen, setFrameRow }}
                        filterRow={{ filtersRowOpen, setFiltersRow }}
                        cropRow={{ cropRowOpen, setCropRow }}
                        textRow={{ textRowOpen, setTextRow }} />
                </div>

                {frameRowOpen ?
                    <Frames selectedPhoto={props.selectedPhoto}
                        framePath={framePath}
                        setFramePath={setFramePath}
                        frameRow={{ frameRowOpen, setFrameRow }} />
                    :
                    <>
                    </>
                }

                {filtersRowOpen ?
                    <Filters selectedPhoto={props.selectedPhoto}
                        filterClass={filterClass}
                        setFilterClass={setFilterClass}
                        filterRow={{ filtersRowOpen, setFiltersRow }} />
                    :
                    <>
                    </>
                }

                {textRowOpen ?
                    <>
                        <div className="col mt-2">
                            <Label ><strong>Add text to image</strong></Label>
                            <Input type="text" onChange={handleTextChange} />
                        </div>
                    </>
                    :
                    <></>
                }
            </div>
        </>
    );

}

export default Canvas;