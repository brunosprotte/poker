/* eslint-disable react/jsx-indent */
import React from 'react';
import { render } from '@testing-library/react';
import 'firebase/firestore';
import Room from '../../src/pages/room';
import { RoomContext } from '../../src/contexts/RoomProvider';

describe('Room', () => {
    let mocked;

    beforeEach(() => {
        mocked = {
            roomName: 'roomName',
            showCards: false,
            agreementLevel: 'agreementLevel',
            votes: [{
                id: 'id', email: 'email', value: 1
            }],
            handleRevealCards: jest.fn(),
            createRoom: jest.fn(),
            handleUpdateCard: jest.fn(),
            handleResetRoom: jest.fn()
        };
    });

    it('should render room name at toolbar', () => {

        const { getByTestId } = render(
            <RoomContext.Provider value={mocked}>
                <Room />
            </RoomContext.Provider >
        );

        expect(getByTestId('toolbar-room-name').textContent).toBe('roomName');
    });

    it('should ', () => {

        mocked.votes = [
            { id: 'id1', email: 'email1', value: 1 },
            { id: 'id2', email: 'email2', value: 2 },
            { id: 'id3', email: 'email3', value: 3 }
        ];

        const { getAllByTestId } = render(
            <RoomContext.Provider value={mocked}>
                <Room />
            </RoomContext.Provider >
        );

        expect(getAllByTestId(/^email/).length).toEqual(3);
    });

});
