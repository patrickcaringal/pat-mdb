import React, { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

interface IOwnProps {
    label: string;
    chipRender: (item: any) => ReactNode;
    options: {
        [key: string]: string;
    };
}

const Chips: React.FC<IOwnProps> = ({ label, chipRender, options }) => {
    const renders = React.useRef(0);

    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <Typography style={{ marginBottom: 8 }}>
                    {label}
                    {renders.current++}
                </Typography>
                <Box display="flex" flexWrap="wrap">
                    {Object.entries(options).map((item) => chipRender(item))}
                </Box>
            </Box>

            <Divider />
        </>
    );
};

export default React.memo(Chips);
