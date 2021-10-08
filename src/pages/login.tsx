import React, { useContext } from 'react';

import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import { useRouter } from 'next/dist/client/router';
import { Container, JoinSection } from '../../styles/login.styles';

import AppLayout from '../components/AppLayout';
import { RoomContext } from '../contexts/RoomProvider';

const Login: React.FC = () => {

    const router = useRouter();

    const { gameSetup, setGameSetup, createRoom } = useContext(RoomContext);

    const handleJoinRoom = () =>{
        router.push(`room/${gameSetup.roomId}`);
    };

    const handleChange = (e) => {
        setGameSetup({ ...gameSetup, [e.target.name]: e.target.value });
    };

    return (
        <AppLayout>
            <Container>
                <JoinSection>
                    <TextField
                        data-testid="join-name"
                        id="join-name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        data-testid="join-roomId"
                        id="join-roomId"
                        name="roomId"
                        variant="outlined"
                        label="Room ID"
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
                        data-testid="join-joinButton"
                        id="join-joinButton"
                        variant="outlined"
                        color="primary"
                        onClick={handleJoinRoom}
                    >
                        JOIN
                    </Button>
                </JoinSection>

                <JoinSection>
                    <TextField
                        data-testid="create-name"
                        id="create-name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        data-testid="create-roomName"
                        id="create-roomName"
                        name="roomName"
                        variant="outlined"
                        label="Room name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <InputLabel id="select-game-type-label">Game type</InputLabel>
                    <Select
                        data-testid="create-gameType"
                        id="create-gameType"
                        name="gameType"
                        labelId="select-game-type-label"
                        value={gameSetup.gameType}
                        label="Game type"
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem data-testid="create-gameType-t-shirt" id="create-gameType-t-shirt" value={1}>T-shirt</MenuItem>
                        <MenuItem data-testid="create-gameType-fibbonacci" id="create-gameType-fibbonacci" value={2}>Fibbonacci</MenuItem>
                        <MenuItem data-testid="create-gameType-sequential" id="create-gameType-sequential" value={3}>Sequential</MenuItem>
                    </Select>

                    <Button
                        data-testid="create-createButton"
                        id="create-createButton"
                        variant="outlined"
                        color="primary"
                        onClick={() => createRoom(gameSetup)}
                    >
                        CREATE
                    </Button>
                </JoinSection>

            </Container>

        </AppLayout>
    );
};

export default Login;
