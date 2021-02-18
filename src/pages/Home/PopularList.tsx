import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { actions, interfaces, types } from '../../ducks';

import Card, { CardSkeleton } from './Card';
import HeaderComponent from './HeaderComponent';

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

    const HeaderRender = useMemo(
        () => (
            <HeaderComponent
                buttons={toggleButtons}
                selected={mediaType}
                onToggleChange={onMediaTypeChange}
            />
        ),
        [mediaType]
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

    const handleCardClick = (id: string) => {
        console.log('handleCardClick');
        // history.push(`movie/${id}`);
    };

    return (
        <Box display="flex" p={3}>
            <Container disableGutters maxWidth="lg">
                <Box display="flex" py={1}>
                    <HeaderComponent
                        buttons={toggleButtons}
                        selected={mediaType}
                        onToggleChange={onMediaTypeChange}
                    />
                </Box>
                <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                    {!isLoading && mappedPopularMedia.length
                        ? mappedPopularMedia.map((i: ICard) => {
                              const { id, ...rest } = i;
                              return (
                                  <Card
                                      key={id}
                                      {...rest}
                                      //   onClick={() => onCardClick(`${id}`)}
                                  />
                              );
                          })
                        : [...Array(10)].map(() => <CardSkeleton />)}
                </Box>
            </Container>
        </Box>
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
