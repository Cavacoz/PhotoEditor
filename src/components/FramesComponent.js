import React from "react";

import styled from 'styled-components'
import Slider from "react-slick";

import './styles/instagram.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

const FiltersStyles = styled.div`
width: 75%;
margin: auto;
.slick-prev:before {
  color: blue;
}
.slick-next:before {
  color: blue;
}
`

const Frames = ({ imgSource, framePath, setFramePath, frameRow, canvas, canvasDimensions }) => {

    const frames = [
        {
            name: 'Christmas Red',
            src: '../assets/images/christmasGreen.png'
        },
        {
            name: 'Christmas Green',
            src: '../assets/images/christmasRed.png'
        },
        {
            name: 'We Are Friends',
            src: '../assets/images/weAreFriends.png'
        },
        {
            name: 'Halloween',
            src: '../assets/images/halloween.png'
        },
        {
            name: 'Minnie and Mickey',
            src: '../assets/images/minnieandmickey.png'
        }
    ]

    const settings = {
        dots: false,
        Infinite: true,
        speed: 750,
        slidesToShow: 5,
        slidesToScroll: 5,
    }

    function handleCancelClick() {
        setFramePath('');
        frameRow.setFrameRow(false);
    }

    function handleApplyClick() {
        frameRow.setFrameRow(false);
    }

    return (
        <>
            <div className="col-10 mt-3">
                <FiltersStyles>
                    <Slider {...settings} >
                        {frames.map((frame) => {
                            return (
                                <div key={frame.name} style={{ paddingTop: 15 }}>
                                    <div
                                        className={`filter-item ${framePath === frame.src ? 'filter-item--selected' : ''}`}
                                        style={{ marginLeft: 2 }}
                                        onClick={() => setFramePath(frame.src)}>
                                        <div>
                                            <div className="filter-item__img">
                                                <img src={imgSource}
                                                    height={100} width={145}
                                                    alt={frame.name}
                                                />
                                                <img className="frame-image"
                                                    src={`${frame.src}`}
                                                    height={100} width={145} />
                                            </div>
                                            <div className="filter-item__name">
                                                <p>
                                                    <strong>{frame.name}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </FiltersStyles>
            </div>
            <div className="col-2">
                <div className="row" style={{ paddingTop: 10, rowGap: 10 }}>
                    <Button onClick={handleCancelClick}><FontAwesomeIcon icon={faXmark} /></Button>
                    <Button onClick={handleApplyClick}><FontAwesomeIcon icon={faCheck} /></Button>
                </div>
            </div>
        </>
    );
}

export default Frames;