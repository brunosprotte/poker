import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { Container } from './Table.styles';

interface TableProps {
    handleRevealCards(): void;
}

const Table: React.FC<TableProps> = ({ handleRevealCards }) => (
    <Container>
        <Button variant='outlined' color='primary' onClick={handleRevealCards}>
            <Typography>Reveal</Typography>
        </Button>
    </Container>
);
export default Table;
