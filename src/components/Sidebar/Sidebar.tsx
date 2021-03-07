import React, { ReactNode, useState, useEffect, useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

interface IOwnProps {
    children?: ReactNode;
}

function Sidebar({ children }: IOwnProps) {
    // const renders = React.useRef(0);
    return (
        <Box
            display="flex"
            flexDirection="column"
            bgcolor="#fff"
            boxShadow={1}
            borderRadius={4}
            border="1px solid rgba(0, 0, 0, 0.12)"
        >
            {children}
        </Box>
    );
}

export default Sidebar;
