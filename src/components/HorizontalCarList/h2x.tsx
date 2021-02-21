import React, { useContext } from 'react';
import ItemsContext from './CardListContext';

const Header: React.FC = () => {
    const items = useContext(ItemsContext);
    const renders = React.useRef(0);

    console.log(items);
    return (
        <h2>
            {renders.current++}Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
            provident.
        </h2>
    );
};

export default React.memo(Header);
