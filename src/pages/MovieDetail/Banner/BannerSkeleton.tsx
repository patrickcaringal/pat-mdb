import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import { bannerUseStyles as useStyles } from './styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

const BannerSkeleton: React.FC = () => {
    const classes = useStyles({ bannerBg: '' });

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" className={classes.backdrop} style={{ backgroundSize: 'cover' }}>
                <Box display="flex" flex="1" className={classes.backdropOverlay}>
                    <Container disableGutters maxWidth="lg">
                        <Box display="flex" flexDirection="row" p={4}>
                            <Box display="flex" flexDirection="column">
                                <Skeleton variant="rect" className={classes.poster} />
                            </Box>
                            <Box display="flex" flex="1" flexDirection="column" pl={5}>
                                <Typography variant="h3">
                                    <Skeleton variant="text" width="70%" />
                                </Typography>
                                <Typography>
                                    <Skeleton variant="text" width="40%" />
                                </Typography>

                                <Box display="flex" flexDirection="column" mt={1} mb={2}>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography variant="h4">
                                            <Skeleton variant="text" width={90} />
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        <Skeleton variant="text" width={80} />
                                    </Typography>
                                </Box>

                                <Typography className={classes.tagline}>
                                    <Skeleton variant="text" width="30%" />
                                </Typography>

                                <Typography variant="h6">
                                    <Skeleton variant="text" width={120} />
                                </Typography>
                                <Typography>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" width="80%" />
                                </Typography>

                                <Box display="flex" mt={4}>
                                    <Box flex="1">
                                        <Skeleton variant="text" width={120} />
                                        <Skeleton variant="text" width={120} />
                                    </Box>
                                    <Box flex="1">
                                        <Skeleton variant="text" width={120} />
                                        <Skeleton variant="text" width={120} />
                                    </Box>
                                    <Box flex="2">
                                        <Skeleton variant="text" width={120} />
                                        <Skeleton variant="text" width={120} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default BannerSkeleton;
