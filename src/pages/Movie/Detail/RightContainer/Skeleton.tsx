import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles, cardStyle } from './styles';
import { CardSkeleton } from '../../../../components/Card';

const RightContainer: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Box mb={3} pt={1} className={classes.detailsCont}>
                <Typography variant="body2">
                    <Skeleton variant="text" width="50%" />
                </Typography>
                <Box display="flex" flexDirection="row" flexWrap="wrap" mx={-1} mb={1}>
                    {[...Array(3)].map((i) => {
                        return (
                            <Box
                                m={1}
                                display="flex"
                                width={50}
                                height={50}
                                boxSizing="content-box"
                            >
                                <Skeleton variant="rect" width="inherit" height="inherit" />
                            </Box>
                        );
                    })}
                </Box>

                <Typography variant="body2">
                    <Skeleton variant="text" width={100} />
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Skeleton variant="text" width={100} />
                </Typography>

                <Typography variant="body2">
                    <Skeleton variant="text" width={100} />
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Skeleton variant="text" width={100} />
                </Typography>

                <Typography variant="body2">
                    <Skeleton variant="text" width="50%" />
                </Typography>
                <Box display="flex" flexWrap="wrap" mt={1}>
                    {[...Array(8)].map((i) => (
                        <Skeleton
                            variant="rect"
                            width={60}
                            height={18}
                            style={{ margin: 4, borderRadius: 16 }}
                        />
                    ))}
                </Box>
            </Box>

            <Divider />

            <Box mt={3} mb={2}>
                <Typography variant="body1">
                    <Skeleton variant="text" width="50%" />
                </Typography>
                <Box display="flex" py={2} flexWrap="wrap" justifyContent="space-between">
                    {[...Array(8)].map(() => (
                        <CardSkeleton style={cardStyle} />
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default RightContainer;
