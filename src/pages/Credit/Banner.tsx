import React from 'react';
import { Box, Container, ThemeProvider, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from './styles';

interface IBannerComponentProps {
    poster: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    loading: boolean;
}

const Banner: React.FC<IBannerComponentProps> = ({
    poster,
    title,
    subtitle1,
    subtitle2,
    loading
}) => {
    const classes = useStyles();

    if (loading) return <BannerSkeleton />;

    return (
        <Box className={classes.bannerContainer} style={{ backgroundSize: 'cover' }}>
            <Container disableGutters maxWidth="lg">
                <Box className="flex-row" p={4}>
                    <img src={poster} alt="poster" className="poster-image" />

                    <Box className="flex-column" pl={5}>
                        <Typography variant="h3" className="semibold-text">
                            {title}
                        </Typography>
                        <Typography className="subtitle">
                            <span>{subtitle1}</span>
                            <span>{subtitle2}</span>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Banner;

const BannerSkeleton: React.FC = () => {
    const classes = useStyles();

    const theme = createMuiTheme({
        palette: { type: 'dark' }
    });

    return (
        <ThemeProvider theme={theme}>
            <Box className={classes.bannerContainer} style={{ backgroundSize: 'cover' }}>
                <Container disableGutters maxWidth="lg">
                    <Box className="flex-row" p={4}>
                        <Skeleton variant="rect" className="poster-image" />

                        <Box className="flex-column" pl={5}>
                            <Typography variant="h3">
                                <Skeleton variant="text" width="50%" />
                            </Typography>
                            <Typography className="subtitle">
                                <Skeleton variant="text" width="40%" />
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};
