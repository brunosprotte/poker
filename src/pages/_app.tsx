import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
// import { initServer } from '../config';
import AppLayout from '../components/AppLayout/appLayout';

// initServer();
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </ThemeProvider>
    );
}
export default MyApp;
