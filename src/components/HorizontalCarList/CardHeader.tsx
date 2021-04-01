import React from 'react';
import Box from '@material-ui/core/Box';

import Typography, { TypographyProps, TypographyClassKey } from '@material-ui/core/Typography';
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

    return (
        <Box display="flex" py={1}>
            {/* {renders.current++} */}
            {buttons?.length ? (
                <>
                    <Typography variant="h5" style={{ fontWeight: 600, marginRight: 16 }}>
                        {title}
                    </Typography>
                    <Toggle buttons={buttons} selected={selected} onToggleChange={onToggleChange} />
                </>
            ) : (
                <Typography variant={titleVariant} style={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
        </Box>
    );
};

export default React.memo(Header);
