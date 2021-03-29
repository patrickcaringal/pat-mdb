import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import BannerSkeleton from './BannerSkeleton';
import { bannerUseStyles as useStyles } from './styles';

import { interfaces } from '../../../../ducks';
import { formatNumWithComma, formatDate, formatHours } from '../../../../utils/helpers';

interface IStateToProps {
    data: interfaces.IMediaDetail;
    isLoading: boolean;
}

interface IDispatchToProps {}

interface MovieDetailProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ data, isLoading }) => {
    const {
        banner,
        director,
        genres,
        overview,
        poster,
        release_date,
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
                            <Typography variant="h3" className={classes.boldText}>
                                {title}
                            </Typography>
                            <Typography>
                                <span>{genres?.join(', ')}</span>
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
                                    <Typography className={classes.boldText}>
                                        Release date
                                    </Typography>
                                    <Typography>{formatDate(release_date)}</Typography>
                                </Box>
                                <Box flex="2">
                                    <Typography className={classes.boldText}>Runtime</Typography>
                                    <Typography>{formatHours(runtime)}</Typography>
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
