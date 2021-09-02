import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

export const Container = withTheme(styled('div')`
    display: flex;

    width: 400px;
    height: 200px;

    border-radius: 10px;
    border: 2px solid ${props => props.theme.palette.primary.main};

    align-items: center;
    justify-content: center;

    margin: 20px;
`);

export default Container;
