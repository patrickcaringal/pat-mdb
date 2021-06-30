import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { selectors as mediaSelectors, actions as mediaActions } from '../../store/media.slice';
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

    const { data: mediaDetail, fetching: mediaDetailLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.IMediaDetail>
    >(mediaSelectors.mediaDetailSelector);

    const { id: mediaId } = match.params;
    const isMovie = mediaType === i.media_type.MOVIE;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        dispatch(mediaActions.getMediaDetail({ id: mediaId, media: mediaType }));
    }, [mediaId]);

    const mapData = () => {
        const {
            cast,
            collection = [],
            photos,
            videos,
            production_companies,
            keywords,
            recommendations
        } = mediaDetail;
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

        const bannerProps: any = {
            ...(_.pick(mediaDetail, propsForBanner) as IMediaDetailComponentProps),
            others: isMovie
                ? {
                      Director: mediaDetail.director.join(', '),
                      Budget: mediaDetail.budget ? `$${formatNumWithComma(mediaDetail.budget)}` : 0,
                      Revenue: mediaDetail.revenue
                          ? `$${formatNumWithComma(mediaDetail.revenue)}`
                          : 0
                  }
                : {
                      Director: mediaDetail.director.join(', '),
                      Seasons: `${mediaDetail.number_of_seasons || ''}`,
                      Episodes: `${mediaDetail.number_of_episodes || ''}`
                  }
        };

        // Cast
        const mappedCast = cast.map((person) => ({
            onClick: () => {
                handleCastClick(person.id);
            },
            poster: person.poster,
            title: person.name,
            subtitle: person.character,
            subtitle2: !isMovie
                ? `${person.episodes} Episode${person.episodes || 0 > 1 ? 's' : ''}`
                : ''
        }));

        // Collection
        const mappedCollection = collection.map((movie) => ({
            onClick: () => {
                if (isMovie) {
                    handleCollectionClick(movie.id, mediaType);
                } else {
                    handleCollectionClick(mediaId, mediaType, movie.seasonNumber);
                }
            },
            poster: movie.poster,
            title: movie.title,
            subtitle: `${new Date(movie.release_date).getFullYear()}`,
            description: movie.overview
        }));

        // Photos
        const mappedPhotos = photos.map((photo) => ({
            onClick: () => {},
            poster: photo
        }));

        // Videos
        const mappedVideos = videos.map((video) => ({
            onClick: () => {},
            poster: video.thumbnail,
            subtitle: video.description
        }));

        // Recommendations
        const mappedRecommendations = recommendations.map((movie) => ({
            onClick: () => {
                handleRecommendationClick(movie.id, movie.media);
            },
            poster: movie.poster,
            title: movie.title,
            subtitle: movie.genres.join(', ')
        }));

        return {
            bannerProps,
            cast: mappedCast,
            collection: mappedCollection,
            photos: mappedPhotos,
            videos: mappedVideos,
            production_companies,
            keywords,
            recommendations: mappedRecommendations
        };
    };
    // Banner props

    const {
        bannerProps,
        cast,
        collection,
        photos,
        videos,
        production_companies,
        keywords,
        recommendations
    } = mapData();

    const handleViewCreditsClick = () => {
        history.push(`/${mediaType}/${mediaId}/credits`);
    };

    const handleCastClick = (id: string) => {
        history.push(`/person/${id}`);
    };

    const handleCollectionClick = (id: string, media: i.media_type, seasonNumber?: number) => {
        if (isMovie) {
            history.push(`/${media}/${id}`);
        } else {
            history.push(`/${media}/${id}/season/${seasonNumber}`);
        }
    };

    const handleRecommendationClick = (id: string, media: i.media_type) => {
        history.push(`/${media}/${id}`);
    };

    return (
        <>
            <Banner {...bannerProps} loading={mediaDetailLoading} />
            <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content}>
                    <Box className={classes.left}>
                        <LeftContainer
                            mediaType={mediaType}
                            loading={mediaDetailLoading}
                            cast={cast}
                            collection={collection}
                            photos={photos}
                            videos={videos}
                            onViewCredits={handleViewCreditsClick}
                        />
                    </Box>
                    <Box className={classes.right}>
                        <RightContainer
                            loading={mediaDetailLoading}
                            productionCompanies={production_companies}
                            keywords={keywords}
                            recommendations={recommendations}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withRouter(MoivieDetail);
