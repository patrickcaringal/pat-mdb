import React, { ReactNode } from 'react';
import Box from '@material-ui/core/Box';

import { ItemsProvider, LoaderProvider } from './CardListContext';

import CardHeader from './CardHeader';
import CardItems from './CardItems';

interface IOwnProps<T> {
    items: T[];
    isLoading?: boolean;
    className?: string | undefined;
    children: ReactNode;
    hideOnBlankItems?: boolean;
}

function CardList<T>({
    items,
    isLoading,
    children,
    hideOnBlankItems = false,
    ...rest
}: IOwnProps<T>) {
    // const renders = React.useRef(0);
    // if (hideOnBlankItems && !isLoading && items.length === 0) return null;

    return (
        <ItemsProvider value={items}>
            <LoaderProvider value={isLoading}>
                {/* {renders.current++} */}
                <Box display="flex" flexDirection="column" width="100%" {...rest}>
                    {React.Children.toArray(children).find((node: any) => node.type === CardHeader)}

                    {React.Children.toArray(children).find((node: any) => node.type === CardItems)}
                </Box>
            </LoaderProvider>
        </ItemsProvider>
    );
}

export default CardList;
