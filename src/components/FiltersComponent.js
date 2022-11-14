import React from "react";

import styled from 'styled-components'
import Slider from "react-slick";

import './styles/instagram.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

const Filters = ({ selectedPhoto, filterClass, setFilterClass }) => {

    const filters = [
        {
            name: 'Brooklyn',
            class: 'filter-brooklyn',
        },
        {
            name: 'Brannan',
            class: 'filter-brannan',
        },
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
    ]

    const settings = {
        dots: false,
        Infinite: true,
        speed: 750,
        slidesToShow: 5,
        slidesToScroll: 5,
    }

    return (
        <div className="row mt-3">
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
                                                height={100} width={100}
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
    );
}

export default Filters;