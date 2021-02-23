import React, { ReactNode, useContext, useRef } from 'react';
import { ItemsContext, LoaderContext } from './CardListContext';

interface IOwnProps {
    itemRender: (item: any) => ReactNode;
    skeletonRender?: () => ReactNode;
}

const CardItems: React.FC<IOwnProps> = ({ itemRender, skeletonRender = () => null }) => {
    const items = useContext(ItemsContext);
    const isLoading = useContext(LoaderContext);

    const renders = React.useRef(0);

    return (
        <>
            {renders.current++}
            {isLoading ? skeletonRender() : items.map((item: any) => itemRender(item))}
        </>
    );
};

export default React.memo(CardItems);
