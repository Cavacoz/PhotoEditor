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

const Frames = ({ selectedPhoto, framePath, setFramePath, frameRow, frameDisplay }) => {

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
            name: 'Happy Birthday',
            src: '../assets/images/happyBirthday.png'
        },
        {
            name: 'Halloween',
            src: '../assets/images/halloween.png'
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
        frameDisplay.setFrameSelected(false);
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
                        {frames.map((frame, index) => {
                            return (
                                <div key={index} style={{ paddingTop: 15 }}>
                                    <div
                                        className={`filter-item ${framePath === frame.src ? 'filter-item--selected' : ''}`}
                                        onClick={() => setFramePath(frame.src)}>
                                        <div>
                                            <div className="filter-item__img">
                                                <img src={URL.createObjectURL(selectedPhoto)}
                                                    height={100} width={150}
                                                    alt={frame.name}
                                                />
                                                <img className="frame-image"
                                                    src={`${frame.src}`}
                                                    height={100} width={150} />
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