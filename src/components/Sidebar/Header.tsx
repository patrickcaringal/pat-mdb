import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

interface IOwnProps {
    title: string;
}

const SidebarHeader: React.FC<IOwnProps> = ({ title }) => {
    const renders = React.useRef(0);
    return (
        <>
            <Box display="flex" flexDirection="column" p={2}>
                <Typography variant="h6">
                    {title} {renders.current++}
                </Typography>
            </Box>
            <Divider />
        </>
    );
};

export default React.memo(SidebarHeader);
