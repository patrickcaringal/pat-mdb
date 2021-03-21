import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
    backdrop: {
        // background: ({ bannerBg }: { bannerBg: string }) =>
        //     `url(${bannerBg}) no-repeat  right -200px top`,
        color: '#fff'
    },
    backdropOverlay: {
        background:
            'linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)'
    },
    poster: {
        width: 300,
        height: 450,
        borderRadius: 8
    },
    movieConent: {},
    leftSidebar: {
        width: 260,
        minWidth: 260
    },

    cardCont: {
        minWidth: 138,
        marginRight: 14
    },
    cardImg: {
        height: 175
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    },

    recommendationCard: {
        width: 120,
        marginBottom: 16
    },
    recommendationCardImg: {
        height: 195
    },
    recommendationCardContent: {
        '&.MuiCardContent-root': {
            padding: 10
        }
    },

    mediaTab: {
        '&.MuiTab-root': {
            textTransform: 'none'
        },
        '&.Mui-selected': {
            fontWeight: 600
        }
    },

    photoCard: {
        minWidth: 533,
        borderRadius: 0,
        marginRight: 14
    },
    photoCardImg: {
        height: 300
    },

    posterCard: {
        minWidth: 200,
        borderRadius: 0,
        marginRight: 14
    },
    posterCardImg: {
        height: 300
    }
});

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

const BannerSkeleton: React.FC = () => {
    const classes = useStyles();

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

                                <Typography style={{ marginBottom: 6 }}>
                                    <Skeleton variant="text" width="30%" />
                                </Typography>
                                <Typography
                                    variant="h6"
                                    style={{ fontWeight: 700, marginBottom: 6 }}
                                >
                                    Overview
                                </Typography>
                                <Typography>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" width="80%" />
                                </Typography>

                                <Box display="flex" flexWrap="wrap" mt={4}>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>
                                            Director
                                        </Typography>
                                        <Typography>
                                            <Skeleton variant="text" width={120} />
                                        </Typography>
                                    </Box>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>
                                            Release date
                                        </Typography>
                                        <Typography>
                                            <Skeleton variant="text" width={120} />
                                        </Typography>
                                    </Box>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>Budget</Typography>
                                        <Typography>
                                            <Skeleton variant="text" width={120} />
                                        </Typography>
                                    </Box>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>Revenue</Typography>
                                        <Typography>
                                            <Skeleton variant="text" width={120} />
                                        </Typography>
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
