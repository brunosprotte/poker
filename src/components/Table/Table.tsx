import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { Container, AgreementContainer } from './Table.styles';

interface TableProps {
    handleRevealCards(): void;
}

const Table: React.FC<TableProps> = ({ handleRevealCards }) => (
    <Container>
        <Button variant='outlined' color='primary' onClick={handleRevealCards}>
            <Typography>Reveal</Typography>
        </Button>

        <AgreementContainer>
            <Typography>
                agreement
            </Typography>
        </AgreementContainer>

    </Container>
);
export default Table;
