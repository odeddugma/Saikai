import React from 'react';
import styled from 'styled-components';
import { darkBlack } from '../../styles/_color';

const SFooter = styled.div`
    margin: 0 auto;
    width: max-content;
    height: 15px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    &,
    & > a {
        color: ${darkBlack};
    }
    & > a {
        cursor: pointer;
    }

    @media screen and (max-height: 780px) {
        & {
            bottom: 0;
            display: inline-block;
        }
    }
`;

const Footer = () => {
    return (
        <SFooter id="footerElement">
            Copyright: © 2021 <a href="https://github.com/Saikai-oyo/Saikai"> Saikai.</a>
            All Rights Reserved. <b />
            <a href="https://www.privacypolicies.com/live/2d6d691c-4def-4f5f-bcb4-77c3762ae877"> Terms Of Service </a>
        </SFooter>
    );
};

export default Footer;
