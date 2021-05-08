import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Box, Container, Typography } from '@material-ui/core';

import { actions, selectors } from '../../../store/movie.slice';
import { IMediaDetail } from '../../../store/interfaces';

import BannerSkeleton from './BannerSkeleton';
import { bannerUseStyles as useStyles } from './styles';

import { formatNumWithComma, formatDate, formatHours } from '../../../utils/helpers';

interface MovieDetailProps extends RouteComponentProps {}

const MoivieDetail: React.FC<MovieDetailProps> = () => {
    const { data: detail, fetching: loading } = useSelector(selectors.movieDetailSelector);

    const {
        banner,
        budget,
        director,
        genres,
        overview,
        poster,
        release_date,
        revenue,
        runtime,
        tagline,
        title,
        vote_average,
        vote_count
    } = detail as IMediaDetail;

    const isLoading = false;

    const classes = useStyles({ bannerBg: banner });

    return !loading ? (
        <Box display="flex" className={classes.backdrop} style={{ backgroundSize: 'cover' }}>
            <Box display="flex" flex="1" className={classes.backdropOverlay}>
                <Container disableGutters maxWidth="lg">
                    <Box display="flex" flexDirection="row" p={4}>
                        <Box display="flex" flexDirection="column">
                            <img src={poster} alt="PAT MDb" className={classes.poster} />
                        </Box>
                        <Box display="flex" flex="1" flexDirection="column" pl={5}>
                            <Typography variant="h3" className={classes.boldText}>
                                {title}
                            </Typography>
                            <Typography>
                                <span>{formatDate(release_date)}</span>
                                <span>&#8226;{genres?.join(', ')}</span>
                                <span>&#8226;{formatHours(runtime)}</span>
                            </Typography>

                            <Box display="flex" flexDirection="column" mt={1} mb={2}>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Typography variant="h4" className={classes.boldText}>
                                        {vote_average}&nbsp;
                                    </Typography>
                                    <Typography variant="h6">/&nbsp;10</Typography>
                                </Box>
                                <Typography>{formatNumWithComma(vote_count)} votes</Typography>
                            </Box>

                            <Typography className={classes.tagline}>{tagline}</Typography>

                            <Typography variant="h6" className={classes.boldText}>
                                Overview
                            </Typography>
                            <Typography>{overview}</Typography>

                            <Box display="flex" mt={4}>
                                <Box flex="1">
                                    <Typography className={classes.boldText}>Director</Typography>
                                    <Typography>{director?.join(', ')}</Typography>
                                </Box>
                                <Box flex="1">
                                    <Typography className={classes.boldText}>Budget</Typography>
                                    <Typography>${formatNumWithComma(budget)}</Typography>
                                </Box>
                                <Box flex="2">
                                    <Typography className={classes.boldText}>Revenue</Typography>
                                    <Typography> ${formatNumWithComma(revenue)}</Typography>
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
