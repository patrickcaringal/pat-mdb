import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Container, ThemeProvider, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';

export interface ISeasonDetailComponentProps extends RouteComponentProps {
    loading: boolean;
    poster: string;
    title: string;
    release_date: string;
    genres: string;
    overview: string;
    episodeCount: number;
    seasonNumber: number;
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        display: 'flex',
        color: '#fff',
        '& .backdrop-overlay': {
            display: 'flex',
            flex: 1,
            background:
                'linear-gradient(to right, rgba(31, 36, 33, 1.00) 150px, rgba(38, 102, 69, 0.9) 100%)'
        },

        '& .subtitle': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(3),
            '& > span:not(:first-child)': {
                marginLeft: theme.spacing(1),
                '&::before': {
                    content: '"\\2022"',
                    marginRight: theme.spacing(1)
                }
            }
        },
        '& .poster-image': {
            minWidth: 300,
            width: 300,
            height: 450,
            borderRadius: 8
        },
        // General
        '& .flex-row': {
            display: 'flex',
            flexDirection: 'row'
        },
        '& .flex-column': {
            display: 'flex',
            flexDirection: 'column'
        },
        '& .bold-text': {
            fontWeight: 700
        },
        '& .tagline-text': {
            fontStyle: 'italic',
            fontWeight: 600,
            marginBottom: 6
        }
    }
}));

const Banner: React.FC<ISeasonDetailComponentProps> = ({
    genres,
    overview,
    poster,
    release_date,
    title,
    episodeCount,
    seasonNumber,
    loading
}) => {
    const classes = useStyles();

    return !loading ? (
        <Box className={classes.backdrop} style={{ backgroundSize: 'cover' }}>
            <Box className="backdrop-overlay">
                <Container disableGutters maxWidth="lg">
                    <Box className="flex-row" p={4}>
                        <img src={poster} alt="PAT MDb" className="poster-image" />

                        <Box className="flex-column" ml={5}>
                            <Typography variant="h3" className="bold-text">
                                {title}
                            </Typography>
                            <Typography variant="h4" className="bold-text">
                                Season {seasonNumber}
                            </Typography>
                            <Typography className="subtitle">
                                <span>{release_date}</span>
                                <span>{genres}</span>
                            </Typography>

                            {overview && (
                                <>
                                    <Typography variant="h6" className="bold-text">
                                        Overview
                                    </Typography>
                                    <Typography>{overview}</Typography>
                                </>
                            )}

                            <Box className="flex-row" mt={4}>
                                <Box>
                                    <Typography className="bold-text">Episodes</Typography>
                                    <Typography variant="h4" className="semibold-text">
                                        {episodeCount}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    ) : (
        <BannerSkeleton />
    );
};

export default withRouter(Banner);

const BannerSkeleton: React.FC = () => {
    const classes = useStyles({ bannerBg: '' });

    const theme = createMuiTheme({
        palette: { type: 'dark' }
    });

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
