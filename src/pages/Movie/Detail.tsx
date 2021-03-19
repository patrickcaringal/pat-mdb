import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Chip from '@material-ui/core/Chip';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles({
    backdrop: {
        background:
            'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg) no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'right -200px top',
        color: '#fff'
    },
    backdropOverlay: {
        background:
            'linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)'
    },
    poster: {
        width: 300,
        height: 450,
        borderRadius: 8
    },
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

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match }) => {
    const classes = useStyles();

    return (
        <>
            <Box display="flex" className={classes.backdrop}>
                <Box display="flex" flex="1" className={classes.backdropOverlay}>
                    <Container disableGutters maxWidth="lg">
                        <Box display="flex" flexDirection="row" p={4}>
                            {/* style={{ height: 570 + 46 }} */}
                            <Box display="flex" flexDirection="column">
                                <img
                                    src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/MoEKaPFHABtA1xKoOteirGaHl1.jpg"
                                    alt="PAT MDb"
                                    className={classes.poster}
                                />
                            </Box>
                            <Box display="flex" flex="1" flexDirection="column" pl={5}>
                                <Typography variant="h3" style={{ fontWeight: 700 }}>
                                    Money Heist
                                </Typography>
                                <Typography>Action, Crime, Drama - 2h 4m</Typography>

                                <Box display="flex" flexDirection="column" mt={1} mb={2}>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography variant="h4" style={{ fontWeight: 700 }}>
                                            8.4
                                        </Typography>
                                        <Typography variant="h6">&nbsp;/&nbsp;10</Typography>
                                    </Box>
                                    <Typography>15,081 votes</Typography>
                                </Box>

                                <Typography
                                    style={{
                                        fontStyle: 'italic',
                                        fontWeight: 600,
                                        marginBottom: 6
                                    }}
                                >
                                    Lorem ipsum dolor sit amet.
                                </Typography>
                                <Typography
                                    variant="h6"
                                    style={{ fontWeight: 700, marginBottom: 6 }}
                                >
                                    Overview
                                </Typography>
                                <Typography>
                                    To carry out the biggest heist in history, a mysterious man
                                    called The Professor recruits a band of eight robbers who have a
                                    single characteristic: none of them has anything to lose. Five
                                    months of seclusion - memorizing every step, every detail, every
                                    probability - culminate in eleven days locked up in the National
                                    Coinage and Stamp Factory of Spain, surrounded by police forces
                                    and with dozens of hostages in their power, to find out whether
                                    their suicide wager will lead to everything or nothing.
                                </Typography>

                                <Box display="flex" flexWrap="wrap" mt={4}>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>
                                            Director
                                        </Typography>
                                        <Typography>Joe Russo</Typography>
                                    </Box>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>
                                            Release date
                                        </Typography>
                                        <Typography>April 24, 2019</Typography>
                                    </Box>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>Budget</Typography>
                                        <Typography>$356,000,000.00</Typography>
                                    </Box>
                                    <Box flex="4">
                                        <Typography style={{ fontWeight: 700 }}>Revenue</Typography>
                                        <Typography>$2,797,800,564.00</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>

            <Container disableGutters maxWidth="lg">
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={4}
                    mx={4}
                    className={classes.movieConent}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        flex="1"
                        style={{ overflow: 'hidden' }}
                        mr={3}
                    >
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
                                        <Typography className={classes.title}>
                                            Úrsula Corberó
                                        </Typography>
                                        <Typography variant="body2" className={classes.subtitle}>
                                            Tokyo
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        <Typography variant="h5" style={{ fontWeight: 600 }}>
                            Media
                        </Typography>

                        {/* style={{ border: '1px solid khaki' }} */}
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

                    <Box display="flex" className={classes.leftSidebar}>
                        <Box display="flex" flexDirection="column">
                            <Typography style={{ fontWeight: 700 }}>Keywords</Typography>
                            <Box display="flex" flexWrap="wrap" mt={2} mb={3}>
                                {[...Array(8)].map((i) => (
                                    <Chip
                                        // key={key}
                                        label="Keyword"
                                        onClick={() => {}}
                                        // variant={isGenreSelected(key) ? 'default' : 'outlined'}
                                        size="small"
                                        style={{ margin: 4 }}
                                    />
                                ))}
                            </Box>

                            <Typography style={{ fontWeight: 700 }}>You may also like</Typography>
                            <Box
                                display="flex"
                                flexDirection="row"
                                flexWrap="wrap"
                                justifyContent="space-around"
                                mt={2}
                            >
                                {[...Array(4)].map((i) => (
                                    <Card className={classes.recommendationCard}>
                                        <CardMedia
                                            className={classes.recommendationCardImg}
                                            image="https://image.tmdb.org/t/p/w130_and_h195_bestv2/1GEp7DDQhIHlw0vgBdQGiF4WhgS.jpg"
                                            title="yeah"
                                        />
                                        <CardContent className={classes.recommendationCardContent}>
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                className={classes.title}
                                            >
                                                Úrsula Corberó Úrsula Corberó
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                className={classes.subtitle}
                                            >
                                                Tokyo
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default withRouter(MoivieDetail);
