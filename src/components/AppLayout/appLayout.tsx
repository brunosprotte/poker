import React, { useEffect } from 'react';
import initClient from '../../config';

const AppLayout: React.FC = ({ children }) => {
    useEffect(() => {
        initClient();
    }, []);

    return <> {children} </>;
};

export default AppLayout;
