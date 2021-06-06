import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { selectors as movieSelectors } from '../../store/movie.slice';
import { selectors as tvShowSelectors } from '../../store/tvShow.slice';
import { actions as movieActions } from '../../store/movie.slice';
import { actions as tvShowActions } from '../../store/tvShow.slice';
import * as i from '../../store/interfaces';

import { formatNumWithComma } from '../../utils/helpers';

import Banner, { IMediaDetailComponentProps } from './Banner';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4)
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
    mediaType: i.media_type;
}

const MoivieDetail: React.FC<MovieDetailProps> = ({ mediaType, history, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { data: movieDetail, fetching: movieDetailLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.IMediaDetail>
    >(movieSelectors.movieDetailSelector);

    const { data: tvShowDetail, fetching: tvShowDetailLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.IMediaDetail>
    >(tvShowSelectors.tvShowDetailSelector);

    const { id: mediaId } = match.params;
    const isMovie = mediaType === i.media_type.MOVIE;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (isMovie) {
            dispatch(movieActions.getMovieDetail({ id: mediaId }));
        } else {
            dispatch(tvShowActions.getTVShowDetail({ id: mediaId }));
        }
    }, [mediaId]);

    // #region data mapping
    const loading = isMovie ? movieDetailLoading : tvShowDetailLoading;

    // Banner props
    const propsForBanner = [
        'banner',
        'genres',
        'overview',
        'poster',
        'release_date',
        'runtime',
        'tagline',
        'title',
        'vote_average',
        'vote_count'
    ];
    const bannerProps = isMovie
        ? {
              ...(_.pick(movieDetail, propsForBanner) as IMediaDetailComponentProps),
              others: {
                  Director: movieDetail.director.join(', '),
                  Budget: `$${formatNumWithComma(movieDetail.budget)}`,
                  Revenue: `$${formatNumWithComma(movieDetail.revenue)}`
              }
          }
        : {
              ...(_.pick(tvShowDetail, propsForBanner) as IMediaDetailComponentProps),
              others: {
                  Director: tvShowDetail.director.join(', '),
                  Seasons: `${tvShowDetail.number_of_seasons || ''}`,
                  Episodes: `${tvShowDetail.number_of_episodes || ''}`
              }
          };

    // Cast
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

    // Collection
    const mappedCollection = isMovie
        ? movieDetail.collection &&
          movieDetail.collection.map((movie) => ({
              onClick: () => {
                  handleCollectionClick(movie.id, i.media_type.MOVIE);
              },
              poster: movie.poster,
              title: movie.title,
              subtitle: `${new Date(movie.release_date).getFullYear()}`,
              description: movie.overview
          }))
        : tvShowDetail.collection &&
          tvShowDetail.collection.map((tvShow) => ({
              onClick: () => {
                  handleCollectionClick(tvShow.id, i.media_type.TV);
              },
              poster: tvShow.poster,
              title: tvShow.title,
              subtitle: `${new Date(tvShow.release_date).getFullYear()}`,
              description: tvShow.overview
          }));

    // Photos
    const mappedPhotos = isMovie
        ? movieDetail.photos.map((photo) => ({
              onClick: () => {},
              poster: photo
          }))
        : tvShowDetail.photos.map((photo) => ({
              onClick: () => {},
              poster: photo
          }));
    // Videos
    const mappedVideos = isMovie
        ? movieDetail.videos.map((video) => ({
              onClick: () => {},
              poster: video.thumbnail,
              subtitle: video.description
          }))
        : tvShowDetail.videos.map((video) => ({
              onClick: () => {},
              poster: video.thumbnail,
              subtitle: video.description
          }));

    // Companies
    const mappedProdCompany = isMovie
        ? movieDetail.production_companies
        : tvShowDetail.production_companies;

    // Keywords
    const mappedKeywords = isMovie ? movieDetail.keywords : tvShowDetail.keywords;

    // Recommendations
    const mappedRecommendations = isMovie
        ? movieDetail.recommendations.map((movie) => ({
              onClick: () => {
                  handleRecommendationClick(movie.id, movie.media);
              },
              poster: movie.poster,
              title: movie.title,
              subtitle: movie.genres.join(', ')
          }))
        : tvShowDetail.recommendations.map((tvShow) => ({
              onClick: () => {
                  handleRecommendationClick(tvShow.id, tvShow.media);
              },
              poster: tvShow.poster,
              title: tvShow.title,
              subtitle: tvShow.genres.join(', ')
          }));
    // #endregion data mapping

    const handleCastClick = (id: string) => {
        history.push(`/person/${id}`);
    };

    const handleCollectionClick = (id: string, media: i.media_type) => {
        // TODO: diff page for tv show season click
        history.push(`/${media}/${id}`);
    };

    const handleRecommendationClick = (id: string, media: i.media_type) => {
        history.push(`/${media}/${id}`);
    };

    return (
        <>
            {/* <Banner {...bannerProps} loading={loading} /> */}
            <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content} disableGutters maxWidth="lg">
                    <Box className={classes.left}>
                        <LeftContainer
                            loading={loading}
                            cast={mappedCast}
                            collection={mappedCollection}
                            photos={mappedPhotos}
                            videos={mappedVideos}
                        />
                    </Box>
                    <Box className={classes.right}>
                        <RightContainer
                            loading={loading}
                            productionCompanies={mappedProdCompany}
                            keywords={mappedKeywords}
                            recommendations={mappedRecommendations}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withRouter(MoivieDetail);
