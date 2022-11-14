import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import Filters from "./FiltersComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const FramesFilters = ({ frame, filter, crop, text }) => {
    return (
        <>
            <div className="row" style={{ paddingTop: 10, rowGap: 10 }}>
                <Button onClick={() => frame.setFrameRow(!frame.frameRowOpen)}>Frames</Button>
                <Button onClick={() => filter.setFiltersRow(!filter.filtersRowOpen)}>Filters</Button>
                <Button onClick={() => crop.setCropRow(!crop.cropRowOpen)}>Crop</Button>
                <Button onClick={() => text.setTextRow(!text.textRowOpen)}>Add Text</Button>
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

            <div className='row container canvas'>
                <div className="row">
                    <div className='col-10'>
                        <img className={`${filterClass}`}
                            src={URL.createObjectURL(props.selectedPhoto)}
                            alt="SelectedImg"
                            height={props.selectedPhoto.height}
                            width={props.selectedPhoto.width}/>
                    </div>
                    <div className='col-2'>
                        <FramesFilters frame={{ frameRowOpen, setFrameRow }}
                            filter={{ filtersRowOpen, setFiltersRow }}
                            crop={{ cropRowOpen, setCropRow }}
                            text={{ textRowOpen, setTextRow }} />
                    </div>
                </div>
                {filtersRowOpen ?
                    <Filters selectedPhoto={props.selectedPhoto}
                        filterClass={filterClass}
                        setFilterClass={setFilterClass} />
                    :
                    <>
                    </>
                }
                {textRowOpen ?
                    <div className="row mt-2">
                        <Label style={{ textAlign: "start" }}>Add text to image</Label>
                        <Input style={{ width: 300, marginLeft: 10 }} type="text" onChange={() => setTextToInsert} />
                    </div>
                    :
                    <></>
                }
            </div>
        </>
    );

}

export default Canvas;