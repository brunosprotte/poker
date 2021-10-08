/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../../contexts/RoomProvider';
import HandCardItem from './HandCardItem';

export enum HandType {
    TShirt,
    Fibbonacci,
    Sequential,
}

interface HandCardProps {
    handType: HandType;
}

const HandCard: React.FC<HandCardProps> = ({ handType }) => {
    const { handleUpdateCard, gameSetup, votes } = useContext(RoomContext);

    const [selectedItem, setSelectedItem] = useState<number | string>('');

    const handleSelectItem = (item: string | number) => {
        if (item !== selectedItem && !gameSetup.revealed) {
            handleUpdateCard(item);
            setSelectedItem(item);
        }
    };

    const fibbonacci = (target: number) => {
        const fib = [];
        let a = 0;
        let b = 1;
        let c = 0;

        while (c < target) {
            c = b + a;
            a = b;
            b = c;
            fib.push(c);
        }
        return fib;
    };

    const handleIsSelected = (index: string | number) =>
        !!votes.find(vote => vote.email === gameSetup.name && index === selectedItem);

    const createItem = (index: string | number) => (
        <HandCardItem
            key={index}
            isSelected={handleIsSelected(index)}
            onClick={() => handleSelectItem(index)}
            _rest={
                {
                    'data-testid':`hand-card-item-${index}`,
                    id: `hand-card-item-${index}`
                }
            }
        >
            {index}
        </HandCardItem>
    );

    const handleCreateHand = () => {
        switch (handType) {
        case HandType.TShirt: {
            return renderTShirt();
        }

        case HandType.Fibbonacci: {
            return renderFibbonacci();
        }

        case HandType.Sequential: {
            return renderSequential();
        }
        default: {
            return renderFibbonacci();
        }
        }
    };

    const renderTShirt = () => [createItem('XS'), createItem('S'), createItem('M'), createItem('L'), createItem('XL')];

    const renderFibbonacci = () => {
        const sequence = fibbonacci(34);
        const itens = sequence.map(fib => createItem(fib));
        itens.push(createItem('!'), createItem('?'));
        return itens;
    };

    const renderSequential = () => {
        const itens = [];
        while (itens.length < 16) {
            itens.push(createItem(itens.length + 1));
        }
        return itens;
    };

    return <>{handleCreateHand()}</>;
};

export default HandCard;
