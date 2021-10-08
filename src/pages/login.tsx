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
                        id="join-name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        id="join-roomId"
                        name="roomId"
                        variant="outlined"
                        label="Room ID"
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
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
                        id="create-name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        id="create-roomName"
                        name="roomName"
                        variant="outlined"
                        label="Room name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <InputLabel id="select-game-type-label">Game type</InputLabel>
                    <Select
                        id="create-gameType"
                        name="gameType"
                        labelId="select-game-type-label"
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
