import React, { useContext } from 'react';

import PokerAppBar from '../../components/AppBar/PokerAppBar';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';

import { Container, Content, Bottom } from '../../../styles/room.styles';
import HandCardList from '../../components/HandCard/HandCardList';

import AppLayout from '../../components/AppLayout';
import { RoomContext } from '../../contexts/RoomProvider';

const Room: React.FC = () => {

    const { votes } = useContext(RoomContext);

    return (
        <AppLayout>
            <PokerAppBar />
            <Container>
                <Content>
                    {
                        votes.map(vote =>
                            <Card
                                key={vote.email}
                                value={vote.value}
                                owner={{ name: vote.email }}
                            />
                        )
                    }
                    <Table />
                </Content>
            </Container>
            <Bottom>
                <HandCardList handType={1} />
            </Bottom>
        </AppLayout>
    );
};

export default Room;
