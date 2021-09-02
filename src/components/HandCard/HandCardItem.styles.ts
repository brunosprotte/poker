import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

interface HandCardItemProps {
    isSelected: boolean;
}

export const Container = withTheme(styled.div<HandCardItemProps>`
    display: flex;

    width: 40px;
    height: 60px;

    align-items: center;
    justify-content: center;

    font-weight: 500;
    font-size: 30px;

    border-radius: 10px;
    border: 2px solid ${props => props.theme.palette.primary.main};
    background-color: transparent;
    margin: 10px;

    transition: 0.2s;

    :hover {
        background-color: ${props => props.theme.palette.primary.main};
        color: #fafafa;
        margin-bottom: 20px;
    }

    ${({ isSelected }) =>
        isSelected
            ? `
        background-color: #F31143;
        color: #FAFAFA;
        margin-bottom: 20px;
        `
            : ''}

    cursor: pointer;
`);

export default Container;
