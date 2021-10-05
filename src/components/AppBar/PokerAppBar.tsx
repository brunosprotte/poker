import React, { useContext, useState } from 'react';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Share } from '@material-ui/icons';

import { RoomContext } from '../../contexts/RoomProvider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const PokerAppBar: React.FC = () => {

    const classes = useStyles();

    const [openShareModal, setOpenShareModa] = useState(false);

    const { gameSetup } = useContext(RoomContext);

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography data-testid='toolbar-room-name' variant='h6' className={classes.title}  >
                        {gameSetup.roomName}
                    </Typography>
                    <>
                        <IconButton
                            edge='end'
                            aria-label='share'
                            aria-controls='menu-appbar'
                            color='inherit'
                            onClick={() => setOpenShareModa(!openShareModal)}
                        >
                            <Share />
                        </IconButton>
                    </>
                </Toolbar>
            </AppBar>

            <Dialog
                open={openShareModal}
            >
                <DialogContent>
                    <DialogContentText>
                        Your room ID: {gameSetup.roomId}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenShareModa(!openShareModal)}
                        variant="outlined"
                        color="primary"
                        autoFocus >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default PokerAppBar;
