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

const PokerAppBar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Room name
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
