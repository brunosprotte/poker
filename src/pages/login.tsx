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
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        data-testid="join-roomId"
                        name="roomId"
                        variant="outlined"
                        label="Room ID"
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
                        data-testid="join-joinButton"
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
                        id="name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        data-testid="create-roomName"
                        id="roomName"
                        name="roomName"
                        variant="outlined"
                        label="Room name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <InputLabel id="select-game-type-label">Game type</InputLabel>
                    <Select
                        data-testid="create-gameType"
                        name="gameType"
                        labelId="select-game-type-label"
                        id="select-game-type"
                        value={gameSetup.gameType}
                        label="Game type"
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={1}>T-shirt</MenuItem>
                        <MenuItem value={2}>Fibbonacci</MenuItem>
                        <MenuItem value={3}>Sequential</MenuItem>
                    </Select>

                    <Button
                        data-testid="create-createButton"
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
