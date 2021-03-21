import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Chip from '@material-ui/core/Chip';

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
            </Box>
            <Box>
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
        </>
    );
};

export default LeftContainer;
