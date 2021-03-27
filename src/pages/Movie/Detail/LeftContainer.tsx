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

import { Card, CardSkeleton, CardInterfaces } from '../../../components/Card';
import { CardList, CardHeader, CardItems } from '../../../components/HorizontalCarList';

const useStyles = makeStyles({
    movieConent: {},
    leftSidebar: {
        width: 260,
        minWidth: 260
        // border: '1px solid red'
    },

    cardCont: {
        minWidth: 138,
        marginRight: 14
    },
    cardImg: {
        height: 175
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    },

    recommendationCard: {
        width: 120,
        marginBottom: 16
    },
    recommendationCardImg: {
        height: 195
    },
    recommendationCardContent: {
        '&.MuiCardContent-root': {
            padding: 10
        }
    },

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
    isLoading: boolean;
}

interface IDispatchToProps {
    // getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
}

interface LeftContainerProps extends IStateToProps, IDispatchToProps {}

const cardStyle = { width: 138, imgHeight: 175, marginRight: 14 };

const LeftContainer: React.FC<LeftContainerProps> = ({ cast = [], isLoading }) => {
    const classes = useStyles();

    const mappedPopularMedia = useMemo(
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

    const itemRender = useCallback(
        (item: CardInterfaces.ICard) => {
            return <Card {...item} style={cardStyle} />;
        },
        [cast]
    );

    const skeletonRender = useCallback(
        () => [...Array(20)].map(() => <CardSkeleton style={cardStyle} />),
        []
    );

    return (
        <>
            <Box display="flex">
                <CardList<CardInterfaces.ICard> items={mappedPopularMedia} isLoading={isLoading}>
                    <CardHeader title="Cast" />
                    <CardItems itemRender={itemRender} skeletonRender={skeletonRender} />
                </CardList>
            </Box>

            <Box>
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
                        {/* Poster */}
                        {/* {[...Array(8)].map((i) => (
                                    <Card className={classes.posterCard}>
                                        <CardMedia
                                            className={classes.posterCardImg}
                                            image="https://image.tmdb.org/t/p/w220_and_h330_face/4LjPjtfaxEn2W61ORPeytr5Qq7j.jpg"
                                            title="title"
                                        />
                                    </Card>
                                ))} */}

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
            </Box>
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    cast: state.movieDetail.cast,
    isLoading: state.loaders.isMovieDetailLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
