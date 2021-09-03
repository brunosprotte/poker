import React, { createContext, ReactNode, useState } from "react";

interface PartyContextData {
    players: [];
    addPlayer: (_nextValue: any) => void;
}

interface PartyProviderProps {
    children: ReactNode;
}

export const PartyContext = createContext({} as PartyContextData);

export function PartyProvider({ children }: PartyProviderProps) {
    const [players, setPlayers] = useState<any>([]);

    function addPlayer(player: any): void {
        setPlayers([player, ...players]);
    }

    return (
        <PartyContext.Provider value={{ players, addPlayer }}>
            {children}
        </PartyContext.Provider>
    );

}
