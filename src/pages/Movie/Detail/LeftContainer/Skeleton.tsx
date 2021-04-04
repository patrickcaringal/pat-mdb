import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';

import { cardStyle, horizontalCardStyle } from './styles';
import { CardSkeleton } from '../../../../components/Card';

const LeftContainer: React.FC = () => {
    console.log('loading');
    return (
        <>
            <Box mb={4}>
                <Typography variant="h5">
                    <Skeleton variant="text" width={160} />
                </Typography>
                <Box display="flex" flexDirection="row" overflow="auto" pt={1} pb={2}>
                    {[...Array(5)].map(() => (
                        <CardSkeleton style={cardStyle} />
                    ))}
                </Box>
            </Box>

            <Box mb={4}>
                <Typography variant="h5">
                    <Skeleton variant="text" width={160} />
                </Typography>
                <Box display="flex" flexDirection="column" pt={1}>
                    {[...Array(3)].map(() => (
                        <CardSkeleton variant="horizontal" style={horizontalCardStyle} />
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default LeftContainer;
