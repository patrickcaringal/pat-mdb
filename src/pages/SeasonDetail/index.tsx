import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { selectors as mediaSelectors, actions as mediaActions } from '../../store/media.slice';
import * as i from '../../store/interfaces';

import { formatNumWithComma, formatDate, formatHours } from '../../utils/helpers';

import Banner, { ISeasonDetailComponentProps } from './Banner';
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
    seasonNumber: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ history, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { data: seasonDetail, fetching: seasonDetailLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.ISeasonDetail>
    >(mediaSelectors.seasonDetailSelector);

    const { id: mediaId, seasonNumber } = match.params;
    // const isMovie = mediaType === i.media_type.MOVIE;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        dispatch(mediaActions.getSeasonDetail({ id: mediaId, seasonNumber }));
    }, [mediaId]);

    const mapData = () => {
        // const {
        //     cast,
        //     collection = [],
        //     photos,
        //     videos,
        //     production_companies,
        //     keywords,
        //     recommendations
        // } = mediaDetail;
        // const propsForBanner = [
        //     'banner',
        //     'genres',
        //     'overview',
        //     'poster',
        //     'release_date',
        //     'runtime',
        //     'tagline',
        //     'title',
        //     'vote_average',
        //     'vote_count'
        // ];

        const bannerProps = {
            title: seasonDetail.title,
            poster: seasonDetail.poster,
            release_date: formatDate(seasonDetail.release_date),
            overview: seasonDetail.overview,
            episodeCount: seasonDetail.episodes.length,
            seasonNumber: seasonDetail.seasonNumber,
            genres: seasonDetail.genres.join(', ')
        };
        // // Cast
        // const mappedCast = cast.map((person) => ({
        //     onClick: () => {
        //         handleCastClick(person.id);
        //     },
        //     poster: person.poster,
        //     title: person.name,
        //     subtitle: person.character,
        //     subtitle2: !isMovie
        //         ? `${person.episodes} Episode${person.episodes || 0 > 1 ? 's' : ''}`
        //         : ''
        // }));
        // // Collection
        // const mappedCollection = collection.map((movie) => ({
        //     onClick: () => {
        //         handleCollectionClick(movie.id, mediaType);
        //     },
        //     poster: movie.poster,
        //     title: movie.title,
        //     subtitle: `${new Date(movie.release_date).getFullYear()}`,
        //     description: movie.overview
        // }));
        // // Photos
        // const mappedPhotos = photos.map((photo) => ({
        //     onClick: () => {},
        //     poster: photo
        // }));
        // // Videos
        // const mappedVideos = videos.map((video) => ({
        //     onClick: () => {},
        //     poster: video.thumbnail,
        //     subtitle: video.description
        // }));
        // // Recommendations
        // const mappedRecommendations = recommendations.map((movie) => ({
        //     onClick: () => {
        //         handleRecommendationClick(movie.id, movie.media);
        //     },
        //     poster: movie.poster,
        //     title: movie.title,
        //     subtitle: movie.genres.join(', ')
        // }));
        return {
            bannerProps
            // cast: mappedCast,
            // collection: mappedCollection,
            // photos: mappedPhotos,
            // videos: mappedVideos,
            // production_companies,
            // keywords,
            // recommendations: mappedRecommendations
        };
    };
    // Banner props

    const {
        bannerProps
        // cast,
        // collection,
        // photos,
        // videos,
        // production_companies,
        // keywords,
        // recommendations
    } = mapData();

    // const handleViewCreditsClick = () => {
    //     history.push(`/${mediaType}/${mediaId}/credits`);
    // };

    // const handleCastClick = (id: string) => {
    //     history.push(`/person/${id}`);
    // };

    // const handleCollectionClick = (id: string, media: i.media_type) => {
    //     // TODO: diff page for tv show season click
    //     history.push(`/${media}/${id}`);
    // };

    // const handleRecommendationClick = (id: string, media: i.media_type) => {
    //     history.push(`/${media}/${id}`);
    // };

    return (
        <>
            <Banner {...bannerProps} loading={seasonDetailLoading} />
            {/* <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content} disableGutters maxWidth="lg">
                    <Box className={classes.left}>
                        <LeftContainer
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
            </Box> */}
        </>
    );
};

export default withRouter(MoivieDetail);
