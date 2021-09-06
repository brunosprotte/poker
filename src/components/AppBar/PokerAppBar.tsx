import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Share } from '@material-ui/icons';

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

interface PokerBarProps {
    roomName: string;
}

const PokerAppBar: React.FC<PokerBarProps> = ({ roomName }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        {roomName}
                    </Typography>
                    <>
                        <IconButton edge='end' aria-label='share' aria-controls='menu-appbar' color='inherit'>
                            <Share />
                        </IconButton>
                    </>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default PokerAppBar;
