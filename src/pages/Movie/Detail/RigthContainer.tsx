import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';

import Chip from '@material-ui/core/Chip';

import { actions, interfaces } from '../../../ducks';

import { Card, CardSkeleton, CardInterfaces } from '../../../components/Card';

const useStyles = makeStyles({
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
    }
});

interface IStateToProps {
    recommendations: interfaces.IMedia[];
    isLoading: boolean;
}

interface IDispatchToProps {
    // getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
}

interface IOwnProps extends IStateToProps, IDispatchToProps {}

const RightContainer: React.FC<IOwnProps> = ({ recommendations = [] }) => {
    const classes = useStyles();

    const mappedRecommendations = useMemo(
        () =>
            recommendations?.map((i: interfaces.IMedia) => {
                const { id, poster: image, title, genres: subtitle } = i;
                return {
                    id: title,
                    image,
                    title,
                    subtitle: subtitle.join(', ')
                };
            }),
        [recommendations]
    );

    return (
        <>
            <Box>
                <Typography style={{ fontWeight: 700 }}>Keywords</Typography>
                <Box display="flex" flexWrap="wrap" mt={2} mb={3}>
                    {[...Array(16)].map((i) => (
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
                    justifyContent="space-between"
                    mt={2}
                >
                    {mappedRecommendations?.map((i) => (
                        <Card {...i} style={{ width: 140, imgHeight: 210, marginBottom: 16 }} />
                        // <Card className={classes.recommendationCard}>
                        //     <CardMedia
                        //         className={classes.recommendationCardImg}
                        //         image="https://image.tmdb.org/t/p/w130_and_h195_bestv2/1GEp7DDQhIHlw0vgBdQGiF4WhgS.jpg"
                        //         title="yeah"
                        //     />
                        //     <CardContent className={classes.recommendationCardContent}>
                        //         <Typography
                        //             variant="caption"
                        //             display="block"
                        //             // className={classes.title}
                        //         >
                        //             Úrsula Corberó Úrsula Corberó
                        //         </Typography>
                        //         <Typography
                        //             variant="caption"
                        //             display="block"
                        //             // className={classes.subtitle}
                        //         >
                        //             Tokyo
                        //         </Typography>
                        //     </CardContent>
                        // </Card>
                    ))}
                </Box>
            </Box>
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    recommendations: state.movieDetail.recommendations,
    isLoading: state.loaders.isMovieDetailLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
