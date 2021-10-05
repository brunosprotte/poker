import React, { useContext } from 'react';

import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import { useRouter } from 'next/dist/client/router';
import { Container, JoinSection } from '../../styles/login.styles';

import AppLayout from '../components/AppLayout';
import { RoomContext } from '../contexts/RoomProvider';

const Login: React.FC = () => {

    const router = useRouter();

    // const [gameSetup, setGameSetup] = useState<GameSetupInterface>({
    //     name: "",
    //     roomId: "",
    //     roomName: "",
    //     gameType:2,
    //     revealed: false
    // });

    const { gameSetup, setGameSetup, createRoom } = useContext(RoomContext);

    const handleJoinRoom = () =>{
        router.push(`room/${gameSetup.roomId}`);
    };

    const handleChange = (e) => {
        setGameSetup({ ...gameSetup, [e.target.name]: e.target.value  });
    };

    return (
        <AppLayout>
            <Container>
                <JoinSection>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        name="roomId"
                        variant="outlined"
                        label="Room ID"
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleJoinRoom}
                    >
                        JOIN
                    </Button>
                </JoinSection>

                <JoinSection>
                    <TextField
                        id="name"
                        name="name"
                        variant="outlined"
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        id="roomName"
                        name="roomName"
                        variant="outlined"
                        label="Room name"
                        onChange={handleChange}
                        fullWidth
                    />

                    <InputLabel id="select-game-type-label">Game type</InputLabel>
                    <Select
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
