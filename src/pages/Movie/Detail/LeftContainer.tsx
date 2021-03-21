import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

// import { actions, interfaces } from '../../../ducks';

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

const LeftContainer: React.FC = () => {
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
                    {[...Array(8)].map((i) => (
                        <Card className={classes.cardCont}>
                            <CardMedia
                                className={classes.cardImg}
                                // https://image.tmdb.org/t/p/w138_and_h175_face/wZkK15LnloSAhzs1jxI3AZbR6f0.jpg
                                image="https://image.tmdb.org/t/p/w185/2TGPhdpRC5wjdFEJqnLYiN5kbwg.jpg"
                                title="title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.title}>Úrsula Corberó</Typography>
                                <Typography variant="body2" className={classes.subtitle}>
                                    Tokyo
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
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

export default LeftContainer;
