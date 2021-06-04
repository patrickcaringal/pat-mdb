import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { selectors as movieSelectors } from '../../store/movie.slice';
import { selectors as tvShowSelectors } from '../../store/tvShow.slice';
import { actions as movieActions } from '../../store/movie.slice';
import { actions as tvShowActions } from '../../store/tvShow.slice';
import { media_type, IPerson, IStateEntity, IMediaDetail, TState } from '../../store/interfaces';

import Card, { ICardComponentProps } from '../../components/CardList/Card';

import MovieBanner from './Movie/Banner';
import MovieDetailRight from './Movie/RightContainer';

import TvShowBanner from './TvShow/Banner';
import TvShowDetailRight from './TvShow/RightContainer';

import LeftContainer from './LeftContainer';

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

const MoivieDetail: React.FC<MovieDetailProps> = ({ mediaType, history, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { data: movieDetail, fetching: movieDetailLoading } = useSelector<
        TState,
        IStateEntity<IMediaDetail>
    >(movieSelectors.movieDetailSelector);

    const { data: tvShowDetail, fetching: tvShowDetailLoading } = useSelector<
        TState,
        IStateEntity<IMediaDetail>
    >(tvShowSelectors.tvShowDetailSelector);

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

    const mappedCast = isMovie
        ? movieDetail.cast.map((person) => ({
              onClick: () => {
                  handleCastClick(person.id);
              },
              poster: person.poster,
              title: person.name,
              subtitle: person.character
          }))
        : tvShowDetail.cast.map((person) => ({
              onClick: () => {
                  handleCastClick(person.id);
              },
              poster: person.poster,
              title: person.name,
              subtitle: person.character,
              subtitle2: `${person.episodes} Episode${person.episodes || 0 > 1 ? 's' : ''}`
          }));

    const handleCastClick = (id: string) => {
        history.push(`/person/${id}`);
    };

    return (
        <>
            {isMovie ? <MovieBanner /> : <TvShowBanner />}
            <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content} disableGutters maxWidth="lg">
                    <Box className={classes.left}>
                        <LeftContainer cast={mappedCast} />
                    </Box>
                    <Box className={classes.right}>
                        {/* {isMovie ? <MovieDetailRight /> : <TvShowDetailRight />} */}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withRouter(MoivieDetail);
