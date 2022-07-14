import styled from "styled-components";

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useEffect, useState } from "react";

function Carousel({banners = [], showArrows, showButtons, autoSlider, speed = 5, large}) {

    const [position, setPosition] = useState(0);

    useEffect(() => {
        if(autoSlider) {
            const intervalId = setInterval(() => setPosition((position < banners.length-1) ? position+1 : 0), speed*1000);
            return () => clearInterval(intervalId)
        }
    }, [banners, speed, position, autoSlider])

    return (
        <Content large={large} onTouchStart={e => console.log(e)} onTouchMove={e => console.log(e)}>
            <Banners slider={position}>
                {banners.map((banner, index) => (
                    <Banner key={index} href={banner.link && banner.link } background={banner.img}>
                        {banner.component && banner.component}
                        {banner.legend && <span className="legend">{banner.legend}</span>}
                    </Banner>
                ))}
            </Banners>
            
            {showArrows && <>
                <Arrow onClick={() => setPosition((position > 0) ? position-1 : banners.length-1)} left><MdArrowBackIosNew/></Arrow>
                <Arrow onClick={() => setPosition((position < banners.length-1) ? position+1 : 0)} right><MdArrowForwardIos/></Arrow>
            </>}
            {showButtons && <Buttons>
                {banners.map((banner, index) => (
                    <input key={index} onChange={() => setPosition(index)} type="radio" name="slider" checked={(position === index) && 'checked'} />
                ))}
            </Buttons>}
        </Content>
    );
}

const Content = styled.div`
    position: relative;
    width: ${props => props.large ? props.large : '100'}%;
    height: 100%;
    overflow: hidden;
`

const Banners = styled.div`
    display: flex;
    min-width: 100%;
    min-height: 100%;
    transform: translateX(-${props => props.slider*100}%);

    transition: all 500ms;

    img {
        width: 100%;
    }
`

const Banner = styled.a`
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-width: 100%;
    min-height: 100%;

    position: relative;

    span.legend {
        color: #ffffff99;
        padding: 5px 60px;
        margin-bottom: 5%;
        border-radius: 10px;
        background-color: #ffffff15;
        backdrop-filter: blur(2px);

        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2%;

        @media (max-width: 720px) {
            display: none;
        }
    }

    text-decoration: none;
    cursor: initial;
`

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    padding: 6px 12px;
    border-radius: 6px;
    background-color: #ffffff05;
    backdrop-filter: blur(5px);

    input[type='radio'] {
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        margin: 0;

        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid #ffffff60;
        backdrop-filter: blur(1px);
        border-radius: 50%;

        display: grid;
        place-content: center;

        &::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            border-radius: 50%;
            // background-color: #1972b9;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em white;
        }

        &:checked {
            border: 0.15em solid white;

            &::before {
                transform: scale(1);
            }
        }
    }
`

const Arrow = styled.span`
    position: absolute;
    top: 0;
    ${props => props.left && 'left: 0;'}
    ${props => props.right && 'right: 0;'}
    width: 7%;
    min-width: 100px;

    @media (max-width: 720px) {
        background-color: transparent !important;
        backdrop-filter: none !important;
        min-width: 60px;
    }

    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms;

    svg {
        transition: all 300ms;
    }
    
    &:hover {
        cursor: pointer;
        background-color: #ffffff10;
        backdrop-filter: blur(5px);
        opacity: 1;

        svg {
            font-size: 1.3em;
        }
    }

    opacity: .3;
    color: white;
`

export default Carousel;