import React from 'react';
import { Box, Button } from '@material-ui/core';

import { Container, AgreementContainer } from './Table.styles';

interface TableProps {
    handleRevealCards(): void;
}

const Table: React.FC<TableProps> = ({ handleRevealCards }) => (
    <Container>
        <Button variant='outlined' color='primary' onClick={handleRevealCards}>
            Reveal
        </Button>

        <AgreementContainer>
            <Box fontWeight={500}>
                AGREEMENT
            </Box>
        </AgreementContainer>

    </Container>
);
export default Table;
