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

const Filters = ({ imgSource, filterClass, setFilterClass, filterRow, setImageSource, canvas }) => {

    const filters = [
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
        setFilterClass('contrast(1) sepia(0) blur(0px)');
        filterRow.setFiltersRow(false)
    }

    function handleApplyClick() {
        var dataURL = canvas?.current.toDataURL('image/png');
        setImageSource(dataURL);
        console.log('applied filter')
        filterRow.setFiltersRow(false);
    }

    return (
        <>
            <div className="col-10 mt-3">
                <FiltersStyles>
                    <Slider {...settings} >
                        {filters.map((filter, index) => {
                            return (
                                <div key={index} className="filters-div">
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
                <div className="row accept-cancel-buttons">
                    <Button onClick={handleCancelClick}><FontAwesomeIcon icon={faXmark} /></Button>
                    <Button onClick={handleApplyClick}><FontAwesomeIcon icon={faCheck} /></Button>
                </div>
            </div>
        </>
    );
}

export default Filters;