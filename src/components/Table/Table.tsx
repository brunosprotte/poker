import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { Container, Content, AgreementContainer } from './Table.styles';
import { RoomContext } from '../../contexts/RoomProvider';

const Table: React.FC = () => {

    const { gameSetup, handleRevealCards, handleResetRoom, agreementLevel } = useContext(RoomContext);

    return (
        <Container>
            <Content>

                {gameSetup.revealed ?
                    <Button
                        data-testid='table-button-reset' id='table-button-reset' variant='outlined' color='primary' onClick={handleResetRoom}>
                        Reset
                    </Button>
                    :
                    <Button
                        data-testid='table-button-reveal' id='table-button-reveal' variant='outlined' color='primary' onClick={handleRevealCards}>
                        Reveal
                    </Button>
                }

                <AgreementContainer data-testid='table-agreement' id='table-agreement'>
                    {/* <Box fontWeight={500}></Box> */}
                    AGREEMENT: {agreementLevel}
                </AgreementContainer>
            </Content>
        </Container>
    );
};
export default Table;
