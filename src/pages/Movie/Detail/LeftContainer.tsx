import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card2 from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { actions, interfaces } from '../../../ducks';
import { formatDate } from '../../../utils/helpers';

import { Card, CardSkeleton, CardInterfaces } from '../../../components/Card';
import { CardList, CardHeader, CardItems } from '../../../components/HorizontalCarList';

const useStyles = makeStyles({
    mediaTab: {
        '&.MuiTab-root': {
            textTransform: 'none'
        },
        '&.Mui-selected': {
            fontWeight: 600
        }
    },
    photoCard: {
        minWidth: 533,
        borderRadius: 0,
        marginRight: 14
    },
    photoCardImg: {
        height: 300
    },

    posterCard: {
        minWidth: 200,
        borderRadius: 0,
        marginRight: 14
    },
    posterCardImg: {
        height: 300
    }
});

interface IStateToProps {
    cast: interfaces.ICast[];
    collection: interfaces.IMedia[];
    isLoading: boolean;
}

interface IDispatchToProps {
    // getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
}

interface LeftContainerProps extends IStateToProps, IDispatchToProps {}

const cardStyle = {
    cardContainer: { minWidth: 138, width: 138, marginRight: 14 },
    cardImage: { height: 175 }
};

const horizontalCardStyle = {
    cardContainer: { marginBottom: 18 },
    cardImage: { height: 141, width: 94 },
    cardContent: { paddingBottom: '10px !important', paddingTop: 10 }
};

const LeftContainer: React.FC<LeftContainerProps> = ({ cast = [], collection = [], isLoading }) => {
    const classes = useStyles();

    const mappedCastItems = useMemo(
        () =>
            cast.map((i: interfaces.ICast) => {
                const { poster: image, name: title, character: subtitle } = i;
                return {
                    id: title,
                    image,
                    title,
                    subtitle
                };
            }),
        [cast]
    );

    const castItemRender = useCallback(
        (item: CardInterfaces.ICard) => {
            return <Card {...item} style={cardStyle} />;
        },
        [cast]
    );

    const skeletonRender = useCallback(
        () => [...Array(20)].map(() => <CardSkeleton style={cardStyle} />),
        []
    );

    const mappedCollectionItems = useMemo(
        () =>
            collection.map((i: interfaces.IMedia) => {
                const {
                    id,
                    poster: image,
                    title,
                    release_date: subtitle,
                    overview: description
                } = i;

                return {
                    id,
                    image,
                    title,
                    subtitle: formatDate(subtitle),
                    description
                };
            }),
        [collection]
    );

    const collectionItemRender = useCallback(
        (item: CardInterfaces.ICard) => {
            return <Card {...item} variant="horizontal" style={horizontalCardStyle} />;
        },
        [collection]
    );

    const collectionSkeletonRender = useCallback(
        () =>
            [...Array(3)].map(() => (
                <CardSkeleton variant="horizontal" style={horizontalCardStyle} />
            )),
        []
    );

    return (
        <>
            <Box display="flex" mb={4}>
                <CardList<CardInterfaces.ICard> items={mappedCastItems} isLoading={isLoading}>
                    <CardHeader title="Cast" />
                    <CardItems
                        itemRender={castItemRender}
                        skeletonRender={skeletonRender}
                        // Box props
                        display="flex"
                        flexDirection="row"
                        overflow="auto"
                        pt={1}
                        pb={2}
                    />
                </CardList>
            </Box>

            <Box display="flex" mb={4}>
                <CardList<CardInterfaces.ICard> items={mappedCollectionItems} isLoading={isLoading}>
                    <CardHeader title="Collections" />
                    <CardItems
                        itemRender={collectionItemRender}
                        skeletonRender={collectionSkeletonRender}
                        // Box props
                        display="flex"
                        flexDirection="column"
                        pt={1}
                    />
                </CardList>
            </Box>

            {/* <Box>
                <Typography variant="h5" style={{ fontWeight: 600 }}>
                    Media
                </Typography>

                <Box>
                    <Tabs
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={() => {}}
                        aria-label="tabs example"
                    >
                        <Tab className={classes.mediaTab} label="Photos" />
                        <Tab className={classes.mediaTab} label="Videos" />
                        <Tab className={classes.mediaTab} label="Posters" />
                    </Tabs>
                    <Box
                        display="flex"
                        flexDirection="row"
                        mt={2}
                        // mb={4}
                        pb={2}
                        style={{ width: '100%', overflow: 'auto' }}
                    >
                        {[...Array(8)].map((i) => (
                            <Card2 className={classes.photoCard}>
                                <CardMedia
                                    className={classes.photoCardImg}
                                    image="https://image.tmdb.org/t/p/w533_and_h300_bestv2/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg"
                                    title="title"
                                />
                            </Card2>
                        ))}
                    </Box>
                </Box>
            </Box> */}
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    cast: state.movieDetail.cast,
    collection: (state.movieDetail?.collection as interfaces.IMedia[]) || [],
    isLoading: state.loaders.isMovieDetailLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
