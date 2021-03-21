import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import BannerSkeleton from './BannerSkeleton';

import { interfaces } from '../../../../ducks';
import { formatNumWithComma, formatDate, formatHours } from '../../../../utils/helpers';

const useStyles = makeStyles({
    backdrop: {
        background: ({ bannerBg }: { bannerBg: string }) =>
            `url(${bannerBg}) no-repeat  right -200px top`,
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
    }
});

interface IStateToProps {
    data: interfaces.IMediaDetail;
    isLoading: boolean;
}

interface IDispatchToProps {
    // getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
}

interface MovieDetailProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ data, isLoading }) => {
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
    } = data;

    const classes = useStyles({ bannerBg: banner });

    return !isLoading ? (
        <Box display="flex" className={classes.backdrop} style={{ backgroundSize: 'cover' }}>
            <Box display="flex" flex="1" className={classes.backdropOverlay}>
                <Container disableGutters maxWidth="lg">
                    <Box display="flex" flexDirection="row" p={4}>
                        <Box display="flex" flexDirection="column">
                            <img src={poster} alt="PAT MDb" className={classes.poster} />
                        </Box>
                        <Box display="flex" flex="1" flexDirection="column" pl={5}>
                            <Typography variant="h3" style={{ fontWeight: 700 }}>
                                {title}
                            </Typography>
                            <Typography>
                                <span>{genres?.join(', ')}</span>
                                <span style={{ marginLeft: 12 }}>
                                    &bull;&nbsp;&nbsp;{formatHours(runtime)}
                                </span>
                            </Typography>

                            <Box display="flex" flexDirection="column" mt={1} mb={2}>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Typography variant="h4" style={{ fontWeight: 700 }}>
                                        {vote_average}&nbsp;
                                    </Typography>
                                    <Typography variant="h6">/&nbsp;10</Typography>
                                </Box>
                                <Typography>{formatNumWithComma(vote_count)} votes</Typography>
                            </Box>

                            <Typography
                                style={{
                                    fontStyle: 'italic',
                                    fontWeight: 600,
                                    marginBottom: 6
                                }}
                            >
                                {tagline}
                            </Typography>
                            <Typography variant="h6" style={{ fontWeight: 700, marginBottom: 6 }}>
                                Overview
                            </Typography>
                            <Typography>{overview}</Typography>

                            <Box display="flex" flexWrap="wrap" mt={4}>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>Director</Typography>
                                    <Typography>{director?.join(', ')}</Typography>
                                </Box>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>
                                        Release date
                                    </Typography>
                                    <Typography>{formatDate(release_date)}</Typography>
                                </Box>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>Budget</Typography>
                                    <Typography>${formatNumWithComma(budget)}</Typography>
                                </Box>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>Revenue</Typography>
                                    <Typography>${formatNumWithComma(revenue)}</Typography>
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

const mapStateToProps = (state: interfaces.TState) => ({
    data: state.movieDetail,
    isLoading: state.loaders.isMovieDetailLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoivieDetail));
