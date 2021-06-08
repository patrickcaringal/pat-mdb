import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

import { selectors as movieSelectors } from '../../store/movie.slice';
import { selectors as tvShowSelectors } from '../../store/tvShow.slice';
import { actions as movieActions } from '../../store/movie.slice';
import { actions as tvShowActions } from '../../store/tvShow.slice';
import * as i from '../../store/interfaces';

import { formatNumWithComma } from '../../utils/helpers';

// import Banner, { IMediaDetailComponentProps } from './Banner';
// import LeftContainer from './LeftContainer';
// import RightContainer from './RightContainer';

const useStyles = makeStyles((theme) => ({
    container: {
        color: '#fff',
        display: 'flex',
        flex: 1,
        background:
            'linear-gradient(to right, rgba(31, 36, 33, 0.95) 150px, rgba(38, 102, 69, 0.9) 100%)',
        '& .flex-row': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        '& .flex-column': {
            display: 'flex',
            flexDirection: 'column'
        },
        '& .poster-image': {
            // minWidth: 300,
            // width: 300,
            height: 140,
            borderRadius: 8
        }
    }
}));

interface MatchParams {
    id: string;
}

interface CreditProps extends RouteComponentProps<MatchParams> {
    mediaType: i.media_type;
}

const Credit: React.FC<CreditProps> = ({ mediaType, history, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { data: movieCredits, fetching: movieDetailLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.ICastCrew>
    >(movieSelectors.movieCreditsSelector);

    const { id: mediaId } = match.params;
    const isMovie = mediaType === i.media_type.MOVIE;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (isMovie) {
            dispatch(movieActions.getMovieCredits({ id: mediaId }));
        } else {
            // dispatch(tvShowActions.getTVShowDetail({ id: mediaId }));
        }
    }, [mediaId]);

    return (
        <Box className={classes.container} style={{ backgroundSize: 'cover' }}>
            <Container disableGutters maxWidth="lg">
                <Box className="flex-row" p={4}>
                    <img
                        src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg"
                        alt="PAT MDb"
                        className="poster-image"
                    />

                    <Box className="flex-column" pl={5}>
                        <Typography variant="h3" className="semibold-text">
                            F9 {/* Lorem ipsum dolor sit amet consectetur. */}
                        </Typography>
                        <Typography variant="h4">(2021)</Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default withRouter(Credit);
