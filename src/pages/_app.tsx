import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import initFirebase from '../config';
import { RoomProvider } from '../contexts/RoomProvider';

initFirebase();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <RoomProvider>
                <CssBaseline />
                <Component {...pageProps} />
            </RoomProvider>
        </ThemeProvider>
    );
}
export default MyApp;
