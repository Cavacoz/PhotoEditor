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

const Filters = ({ imgSource, filterClass, setFilterClass, filterRow, canvas, canvasDimensions }) => {

    const filters = [
        {
            name: '1997',
            class: 'filter-1997',
        },
        {
            name: 'Aden',
            class: 'filter-aden',
        },
        {
            name: 'Amaro',
            class: 'filter-amaro',
        },
        {
            name: 'Ashby',
            class: 'filter-ashby',
        },
        {
            name: 'Brannan',
            class: 'filter-brannan',
        },
        {
            name: 'Brooklyn',
            class: 'filter-brooklyn',
        },
        {
            name: 'Charmes',
            class: 'filter-charmes',
        },
        {
            name: 'Clarendon',
            class: 'filter-clarendon',
        },
        {
            name: 'Crema',
            class: 'filter-crema',
        },
        {
            name: 'Dogpatch',
            class: 'filter-dogpatch',
        },
    ]

    const filters1 = [
        {
            name: 'Contrast',
            effects: 'contrast(1.4)'
        },
        {
            name: 'Sepia',
            effects: 'sepia(1)'
        },
        {
            name: 'Blur',
            effects: 'blur(4px)'
        },
        {
            name: 'Contrast&Sepia',
            effects: 'contrast(1.4) sepia(1)'
        },
        {
            name: 'Blur&Sepia',
            effects: 'blur(4px) sepia(1) '
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
        setFilterClass(undefined);
        var img = new Image();
        img.src = imgSource;
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvasDimensions.CANVAS_WITDH, canvasDimensions.CANVAS_HEIGHT)
        var hRatio = canvasDimensions.CANVAS_WITDH / img.naturalWidth;
        var vRatio = canvasDimensions.CANVAS_HEIGHT / img.naturalHeight;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvasDimensions.CANVAS_WITDH - img.naturalWidth * ratio) / 2;
        var centerShift_y = (canvasDimensions.CANVAS_HEIGHT - img.naturalHeight * ratio) / 2;
        ctx.drawImage(img,
            0, 0, img.naturalWidth, img.naturalHeight,
            centerShift_x, centerShift_y,
            img.naturalWidth * ratio, img.naturalHeight * ratio)

        filterRow.setFiltersRow(false)
    }

    function handleApplyClick() {
        filterRow.setFiltersRow(false);
    }

    return (
        <>
            <div className="col-10 mt-3">
                <FiltersStyles>
                    <Slider {...settings} >
                        {filters1.map((filter, index) => {
                            return (
                                <div key={index} style={{ paddingTop: 15 }}>
                                    <div
                                        className={`filter-item ${filterClass === filter.effects ? 'filter-item--selected' : ''}`}

                                        onClick={() => setFilterClass(filter.effects)}>
                                        <div>
                                            <div className="filter-item__img">
                                                <img
                                                    style={{ filter: filter.effects }}
                                                    src={imgSource}
                                                    height={100} width={150}
                                                    alt={filter.name}
                                                />
                                            </div>
                                            <div className="filter-item__name">
                                                <p>
                                                    <strong>{filter.name}</strong>
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

export default Filters;