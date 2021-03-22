import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { actions, interfaces } from '../../../ducks';

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

const LeftContainer: React.FC<LeftContainerProps> = ({ cast = [], isLoading }) => {
    const classes = useStyles();

    return (
        <>
            <Box>
                <Typography variant="h5" style={{ fontWeight: 600 }}>
                    Cast
                </Typography>

                <Box
                    display="flex"
                    flexDirection="row"
                    mt={2}
                    mb={4}
                    pb={2}
                    style={{ width: '100%', overflow: 'auto' }}
                >
                    {cast.map((person: interfaces.ICast) => {
                        const { character, name, poster } = person;
                        return (
                            <Card className={classes.cardCont}>
                                <CardMedia
                                    className={classes.cardImg}
                                    image={poster}
                                    title="title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.title}>{name}</Typography>
                                    <Typography variant="body2" className={classes.subtitle}>
                                        {character}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
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
                            <Card className={classes.photoCard}>
                                <CardMedia
                                    className={classes.photoCardImg}
                                    image="https://image.tmdb.org/t/p/w533_and_h300_bestv2/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg"
                                    title="title"
                                />
                            </Card>
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
