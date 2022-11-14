import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import Filters from "./FiltersComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan, faScissors, faFont, faWandMagicSparkles, faVectorSquare } from "@fortawesome/free-solid-svg-icons";

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

    return (
        <>
            <div className="row" style={{ paddingTop: 10, rowGap: 10 }}>
                <Button onClick={() => frameRow.setFrameRow(!frameRow.frameRowOpen)}><FontAwesomeIcon icon={faVectorSquare} /></Button>
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

    function handleTextChange(e) {
        console.log(e.target.value)
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
                <div className="col-2" style={{ alignSelf: "center" }}>
                    <Button onClick={() => clearImage()}><FontAwesomeIcon icon={faTrashCan} /></Button>
                    <Button><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                </div>

            </div>

            <div className='row canvas'>

                <div className='col-10 top-wrapper-image'>
                    <img className={`${filterClass} image`} style={{ objectFit: "cover" }}
                        src={URL.createObjectURL(props.selectedPhoto)}
                        alt="SelectedImg"
                        height={500}
                        width={700} />
                    <p className="text-inside-image">{textToInsert}</p>
                </div>
                <div className='col-2'>
                    <FramesFilters frameRow={{ frameRowOpen, setFrameRow }}
                        filterRow={{ filtersRowOpen, setFiltersRow }}
                        cropRow={{ cropRowOpen, setCropRow }}
                        textRow={{ textRowOpen, setTextRow }} />
                </div>

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
                            <Label style={{ textAlign: "start" }}>Add text to image</Label>
                            <Input style={{ width: 300, marginLeft: 10 }} type="text" onChange={handleTextChange} />
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