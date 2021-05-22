import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Box, Container, Typography } from '@material-ui/core';

import { selectors } from '../../../store/tvShow.slice';
import { IMediaDetail } from '../../../store/interfaces';

import BannerSkeleton from './BannerSkeleton';
import { bannerUseStyles as useStyles } from './styles';

import { formatNumWithComma, formatDate, formatHours } from '../../../utils/helpers';

interface MovieDetailProps extends RouteComponentProps {}

const MoivieDetail: React.FC<MovieDetailProps> = () => {
    const { data: detail, fetching: loading } = useSelector(selectors.tvShowDetailSelector);

    const {
        banner,
        budget,
        director,
        genres,
        overview,
        number_of_seasons = 0,
        number_of_episodes = 0,
        poster,
        release_date,
        revenue,
        runtime,
        tagline,
        title,
        vote_average,
        vote_count
    } = detail as IMediaDetail;

    const classes = useStyles({ bannerBg: banner });

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
                            <Typography className="subtitle">
                                <span>{formatDate(release_date)}</span>
                                <span>{genres?.join(', ')}</span>
                                <span>{formatHours(runtime)}</span>
                            </Typography>

                            <Box className="flex-column" mt={1} mb={2}>
                                <Box className="flex-row" alignItems="center">
                                    <Typography variant="h4" className="bold-text">
                                        {vote_average}&nbsp;
                                    </Typography>
                                    <Typography variant="h6">/&nbsp;10</Typography>
                                </Box>
                                <Typography>{formatNumWithComma(vote_count)} votes</Typography>
                            </Box>

                            <Typography className="tagline-text">{tagline}</Typography>

                            <Typography variant="h6" className="bold-text">
                                Overview
                            </Typography>
                            <Typography>{overview}</Typography>

                            <Box className="flex-row" mt={4}>
                                <Box flex="1">
                                    <Typography className="bold-text">Director</Typography>
                                    <Typography>{director?.join(', ')}</Typography>
                                </Box>
                                <Box flex="1">
                                    <Typography className="bold-text">Seasons</Typography>
                                    <Typography>{number_of_seasons}</Typography>
                                </Box>
                                <Box flex="2">
                                    <Typography className="bold-text">Episodes</Typography>
                                    <Typography>{number_of_episodes}</Typography>
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

export default withRouter(MoivieDetail);
