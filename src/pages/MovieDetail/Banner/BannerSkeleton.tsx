import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import { bannerUseStyles as useStyles } from './styles';

const theme = createMuiTheme({
    palette: { type: 'dark' }
});

const BannerSkeleton: React.FC = () => {
    const classes = useStyles({ bannerBg: '' });

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" className={classes.backdrop} style={{ backgroundSize: 'cover' }}>
                <Box className="backdrop-overlay">
                    <Container disableGutters maxWidth="lg">
                        <Box className="flex-row" p={4}>
                            <Box className="flex-column">
                                <Skeleton variant="rect" className="poster-image" />
                            </Box>
                            <Box className="flex-column" flex="1" pl={5}>
                                <Typography variant="h3">
                                    <Skeleton variant="text" width="70%" />
                                </Typography>
                                <Typography>
                                    <Skeleton variant="text" width="40%" />
                                </Typography>

                                <Box className="flex-column" mt={1} mb={2}>
                                    <Box className="flex-row" alignItems="center">
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
                                    <Skeleton variant="text" width="80%" />
                                </Typography>
                                <Typography>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" width="80%" />
                                </Typography>

                                <Box className="flex-row" mt={4}>
                                    <Box flex="1">
                                        <Skeleton variant="text" width="70%" />
                                        <Skeleton variant="text" width="70%" />
                                    </Box>
                                    <Box flex="1">
                                        <Skeleton variant="text" width="70%" />
                                        <Skeleton variant="text" width="70%" />
                                    </Box>
                                    <Box flex="2">
                                        <Skeleton variant="text" width="35%" />
                                        <Skeleton variant="text" width="35%" />
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
