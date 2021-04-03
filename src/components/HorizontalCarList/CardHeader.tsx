import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';

import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import { LoaderContext } from './CardListContext';
import Toggle from '../Toggle';

interface IOwnProps {
    title: string;
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
    buttons?: {
        label: string;
        value: string;
    }[];
    selected?: string;
    onToggleChange?: (value: string) => void;
}

const Header: React.FC<IOwnProps> = ({
    title,
    titleVariant = 'h5',
    buttons = [],
    selected = '',
    onToggleChange = () => {}
}) => {
    // const renders = React.useRef(0);
    const isLoading = useContext(LoaderContext);

    return (
        <Box display="flex" py={1}>
            {/* {renders.current++} */}
            {isLoading && (
                <Typography variant={titleVariant}>
                    <Skeleton variant="text" width={140} />
                </Typography>
            )}

            {/* has buttons */}
            {!isLoading && buttons.length !== 0 && (
                <>
                    <Typography variant="h5" style={{ fontWeight: 600, marginRight: 16 }}>
                        {title}
                    </Typography>
                    <Toggle buttons={buttons} selected={selected} onToggleChange={onToggleChange} />
                </>
            )}

            {/* no buttons */}
            {!isLoading && buttons.length === 0 && (
                <Typography variant={titleVariant} style={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
        </Box>
    );
};

export default React.memo(Header);
