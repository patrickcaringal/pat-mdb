import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import { actions, interfaces, types } from '../../ducks';

import { Card, CardSkeleton } from '../../components/Card';
import { CardList, CardHeader, CardItems } from '../../components/HorizontalCarList';

interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
}

interface IStateToProps {
    data: interfaces.IMedia[];
    isLoading: boolean;
}

interface IDispatchToProps {
    getMedias: (media: types.media) => interfaces.IGetTrendingMedias;
}

interface HomeProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const cardStyle = { width: 150, imgHeight: 225, marginRight: 16 };

const PopularList: React.FC<HomeProps> = ({ isLoading, data, getMedias, history }) => {
    const [mediaType, setMediaType] = useState('movie');

    const toggleButtons = useMemo(
        () => [
            { label: 'Movies', value: 'movie' },
            { label: 'TV shows', value: 'tv' }
        ],
        []
    );

    const mappedPopularMedia = useMemo(
        () =>
            data.map((i: interfaces.IMedia) => {
                const { id, poster: image, title, genres: subtitle } = i;
                return {
                    id,
                    image,
                    title,
                    subtitle: subtitle.join(', ')
                };
            }),
        [data]
    );

    // toggle button change
    const onMediaTypeChange = useCallback((value: string) => {
        setMediaType(value);
    }, []);

    useEffect(() => {
        getMedias(mediaType as types.media);
    }, [mediaType]);

    // rendering
    const handleCardClick = (id: string) => {
        history.push(`movie/${id}`);
    };

    const itemRender = useCallback(
        (item: ICard) => {
            const { id, ...rest } = item;
            return <Card {...rest} onClick={() => handleCardClick(id)} style={cardStyle} />;
        },
        [data, isLoading]
    );

    const skeletonRender = useCallback(
        () => [...Array(20)].map(() => <CardSkeleton style={cardStyle} />),
        []
    );

    return (
        <Box display="flex" p={3}>
            <CardList<ICard> items={mappedPopularMedia} isLoading={isLoading}>
                <CardHeader
                    title="Trending"
                    buttons={toggleButtons}
                    selected={mediaType}
                    onToggleChange={onMediaTypeChange}
                />
                <CardItems itemRender={itemRender} skeletonRender={skeletonRender} />
            </CardList>
        </Box>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    data: state.trendingMedias,
    isLoading: state.loaders.isTrendingLoading
});

const mapDispatchToProps = {
    getMedias: actions.getTrendingMedias
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PopularList));
