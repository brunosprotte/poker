import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

interface CardProps {
    isRevealed: boolean;
}

export const Container = withTheme(styled('div')`
    display: flex;
    flex-direction: column;

    padding: 5px;

    background-color: transparent;
`);

export const CardPlaceHolder = withTheme(styled.div<CardProps>`
    width: 60px;
    min-width: 60px;

    height: 80px;
    min-height: 80px;

    align-items: center;
    justify-content: center;

    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border: 2px solid ${props => props.theme.palette.primary.main};

    transition: transform 1s;

    ${({ isRevealed }) => (isRevealed ? '' : 'transform: rotateY(180deg);')}
`);

export const CardFront = withTheme(styled('div')`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: center;

    font-weight: 500;
    font-size: 30px;

    background-color: ${props => props.theme.palette.background};
    border-radius: 10px;
    color: black;
    z-index: 1;
    padding: 5px;
`);

export const CardBack = withTheme(styled('div')`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: #fafafa;
    color: white;
    transform: rotateY(180deg);
    z-index: 2;
    border-radius: 10px;
`);
