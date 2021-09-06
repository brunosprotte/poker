import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';

import { Container, Content, AgreementContainer } from './Table.styles';
import { RoomContext } from '../../contexts/RoomContext';

const Table: React.FC = () => {

    const { showCards, handleRevealCards, handleResetRoom, agreementLevel } = useContext(RoomContext);

    return (
        <Container>
            <Content>

                {showCards ?
                    <Button
                        variant='outlined' color='primary' onClick={handleResetRoom}>
                        Reset
                    </Button>
                    :
                    <Button variant='outlined' color='primary' onClick={handleRevealCards}>
                        Reveal
                    </Button>
                }

                <AgreementContainer>
                    <Box fontWeight={500}>AGREEMENT: {agreementLevel}</Box>
                </AgreementContainer>
            </Content>
        </Container>
    );
};
export default Table;
