import { render } from '@testing-library/react';
import React from 'react';
import { RoomContext, RoomProvider } from './RoomProvider';

describe('RoomProvider', () => {

    describe('useEffect functions', () => {

        it.todo('mock firebase and test .onRealtimeReveal ', () => {
            render(
                <RoomProvider>
                    <RoomContext.Consumer>
                        {value => <span>${value}</span>}
                    </RoomContext.Consumer>
                </RoomProvider>
            );
        });

        it.todo('mock firebase and test .onRealtimeRevealed');
    });

});

