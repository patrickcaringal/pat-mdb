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
    getPopularMedias: (media: types.media) => interfaces.IGetPopularMedias;
}

interface HomeProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const PopularList: React.FC<HomeProps> = ({ isLoading, data, getPopularMedias, history }) => {
    const [mediaType, setMediaType] = useState('movie');

    const toggleButtons = useMemo(
        () => [
            { label: 'Movies', value: 'movie' },
            { label: 'TV shows', value: 'tv' }
        ],
        []
    );

    const onMediaTypeChange = useCallback((value: string) => {
        setMediaType(value);
    }, []);

    useEffect(() => {
        getPopularMedias(mediaType as types.media);
    }, [mediaType]);

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

    const itemRender = useCallback(
        (item: ICard) => {
            const { id, ...rest } = item;
            return <Card {...rest} onClick={() => {}} />;
        },
        [data]
    );

    const skeletonRender = useCallback(
        () => (
            <>
                {[...Array(10)].map(() => (
                    <CardSkeleton />
                ))}
            </>
        ),
        []
    );

    const handleCardClick = (id: string) => {
        history.push(`movie/${id}`);
    };

    return (
        <>
            <Box display="flex" p={3}>
                <CardList<ICard> items={mappedPopularMedia} isLoading={isLoading}>
                    <CardHeader
                        title="Popular"
                        buttons={toggleButtons}
                        selected={mediaType}
                        onToggleChange={onMediaTypeChange}
                    />
                    <CardItems itemRender={itemRender} skeletonRender={skeletonRender} />
                </CardList>
            </Box>

            {/* <Box display="flex" p={3}>
                <Container disableGutters maxWidth="lg">
                    <Box display="flex" py={1}>
                        <HeaderComponent
                            title="Popular"
                            buttons={toggleButtons}
                            selected={mediaType}
                            onToggleChange={onMediaTypeChange}
                        />
                    </Box>

                    <Box
                        display="flex"
                        style={{ overflow: 'auto', border: '1px solid red' }}
                        pt={1}
                        pb={2}
                    >
                        {!isLoading && mappedPopularMedia.length
                            ? mappedPopularMedia.map((i: ICard) => {
                                  const { id, ...rest } = i;
                                  return (
                                      <Card
                                          key={id}
                                          {...rest}
                                          onClick={() => handleCardClick(`${id}`)}
                                      />
                                  );
                              })
                            : [...Array(10)].map(() => <CardSkeleton />)}
                    </Box>
                </Container>
            </Box> */}
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => {
    return {
        data: state.popularMedias,
        isLoading: state.loaders.isPopularLoading
    };
};

const mapDispatchToProps = {
    getPopularMedias: actions.getPopularMedias
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PopularList));
