import React, { ReactNode, useState, useEffect, useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { ItemsProvider } from './CardListContext';

import CardHeader from './CardHeader';
import CardItems from './CardItems';

interface IOwnProps<T> {
    items: T[];
    // isLoading: boolean;
    children: ReactNode;
}

// const CardList: React.FC<IOwnProps<ICardItem>> = ({ items, children }) => {
//     return (
//         <ItemsProvider value={items}>
//             <Box display="flex" flexDirection="column" flex="1">
//                 <Box display="flex" py={1}>
//                     {React.Children.toArray(children).find((node: any) => node.type === CardHeader)}
//                 </Box>

//                 <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
//                     {React.Children.toArray(children).find((node: any) => node.type === H2x)}
//                 </Box>
//             </Box>
//         </ItemsProvider>
//     );
// };

function CardList<T>({ items, children }: IOwnProps<T>) {
    return (
        <ItemsProvider value={items}>
            <Container disableGutters maxWidth="lg">
                <Box display="flex" flexDirection="column" flex="1">
                    <Box display="flex" py={1}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === CardHeader
                        )}
                    </Box>

                    <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === CardItems
                        )}
                    </Box>
                </Box>
            </Container>
        </ItemsProvider>
    );
}

export default CardList;
