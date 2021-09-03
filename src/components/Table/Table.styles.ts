import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

export const Container = withTheme(styled('div')`
    display: flex;
    flex-direction: column;

    width: 400px;
    height: 200px;

    border-radius: 10px;
    border: 2px solid ${props => props.theme.palette.primary.main};

    align-items: center;
    justify-content: center;

    margin: 20px;
`);

export const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const AgreementContainer = withTheme(styled('div')`
    display: flex;
    color: ${props => props.theme.palette.primary.main};
    bottom: 15px;
    position: absolute;
`);
