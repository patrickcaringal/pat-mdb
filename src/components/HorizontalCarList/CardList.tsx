import React, { ReactNode, useState, useEffect, useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { ItemsProvider, LoaderProvider } from './CardListContext';

import CardHeader from './CardHeader';
import CardItems from './CardItems';

interface IOwnProps<T> {
    items: T[];
    isLoading?: boolean;
    children: ReactNode;
}

function CardList<T>({ items, isLoading, children }: IOwnProps<T>) {
    // const renders = React.useRef(0);
    return (
        <ItemsProvider value={items}>
            <LoaderProvider value={isLoading}>
                {/* {renders.current++} */}
                <Box
                    display="flex"
                    flexDirection="column"
                    // flex="1"
                    style={{ width: '100%' }}
                >
                    <Box display="flex" py={1}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === CardHeader
                        )}
                    </Box>

                    <Box display="flex" py={2} style={{ overflow: 'auto' }}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === CardItems
                        )}
                    </Box>
                </Box>
            </LoaderProvider>
        </ItemsProvider>
    );
}

export default CardList;
