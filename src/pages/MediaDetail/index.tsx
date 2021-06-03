import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { actions as movieActions } from '../../store/movie.slice';
import { actions as tvShowActions } from '../../store/tvShow.slice';
import { media_type } from '../../store/interfaces';

import MovieBanner from './Movie/Banner';
import MovieDetailLeft from './Movie/LeftContainer';
import MovieDetailRight from './Movie/RightContainer';

import TvShowBanner from './TvShow/Banner';
import TvShowDetailLeft from './TvShow/LeftContainer';
import TvShowDetailRight from './TvShow/RightContainer';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        marginRight: theme.spacing(8)
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        width: 320,
        minWidth: 320
    }
}));

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {
    mediaType: media_type;
}

const MoivieDetail: React.FC<MovieDetailProps> = ({ mediaType, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { id: mediaId } = match.params;
    const isMovie = mediaType === media_type.MOVIE;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (isMovie) {
            dispatch(movieActions.getMovieDetail({ id: mediaId }));
        } else {
            dispatch(tvShowActions.getTVShowDetail({ id: mediaId }));
        }
    }, [mediaId]);

    return (
        <>
            {isMovie ? <MovieBanner /> : <TvShowBanner />}
            <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content} disableGutters maxWidth="lg">
                    <Box className={classes.left}>
                        {isMovie ? <MovieDetailLeft /> : <TvShowDetailLeft />}
                    </Box>
                    <Box className={classes.right}>
                        {isMovie ? <MovieDetailRight /> : <TvShowDetailRight />}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withRouter(MoivieDetail);
