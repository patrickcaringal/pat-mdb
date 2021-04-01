import React, { ReactNode, useContext, useRef } from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

import { ItemsContext, LoaderContext } from './CardListContext';

interface IOwnProps extends BoxProps {
    itemRender: (item: any) => ReactNode;
    skeletonRender?: () => ReactNode;
}

const CardItems: React.FC<IOwnProps> = ({ itemRender, skeletonRender = () => null, ...rest }) => {
    const items = useContext(ItemsContext);
    const isLoading = useContext(LoaderContext);
    // const renders = React.useRef(0);

    return (
        // display="flex" py={2} flexWrap="wrap" justifyContent="space-between"
        <Box {...rest}>
            {/* {renders.current++} */}
            {isLoading ? skeletonRender() : items.map((item: any) => itemRender(item))}
        </Box>
    );
};

export default React.memo(CardItems);
