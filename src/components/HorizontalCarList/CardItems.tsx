import React, { ReactNode, useContext, useRef } from 'react';
import ItemsContext from './CardListContext';

interface IOwnProps {
    itemRender: (item: any) => ReactNode;
}

const CardItems: React.FC<IOwnProps> = ({ itemRender }) => {
    const items = useContext(ItemsContext);

    return <>{items.map((item: any) => itemRender(item))}</>;
};

export default React.memo(CardItems);
