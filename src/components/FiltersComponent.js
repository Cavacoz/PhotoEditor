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

const Filters = ({ selectedPhoto, filterClass, setFilterClass, filterRow }) => {

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

    const settings = {
        dots: false,
        Infinite: true,
        speed: 750,
        slidesToShow: 5,
        slidesToScroll: 5,
    }

    function handleCancelClick() {
        setFilterClass('');
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
                        {filters.map((filter, index) => {
                            return (
                                <div key={index} style={{ paddingTop: 15 }}>
                                    <div
                                        className={`filter-item ${filterClass === filter.class ? 'filter-item--selected' : ''}`}
                                        onClick={() => setFilterClass(filter.class)}>
                                        <div>
                                            <div className="filter-item__img">
                                                <img
                                                    className={filter.class}
                                                    src={URL.createObjectURL(selectedPhoto)}
                                                    height={100} width={148}
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