import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';

import Chip from '@material-ui/core/Chip';

import { actions, interfaces } from '../../../ducks';

import { Card, CardSkeleton, CardInterfaces } from '../../../components/Card';

import { formatNumWithComma, formatDate, formatHours } from '../../../utils/helpers';

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
    },
    detailsCont: {
        '& .MuiTypography-body2:not(.MuiTypography-gutterBottom)': {
            fontWeight: 700
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: '0.75em'
        }
    }
});

interface IStateToProps {
    data: interfaces.IMediaDetail;
    recommendations: interfaces.IMedia[];
    isLoading: boolean;
}

interface IDispatchToProps {
    // getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
}

interface IOwnProps extends IStateToProps, IDispatchToProps {}

const RightContainer: React.FC<IOwnProps> = ({ data }) => {
    const classes = useStyles();

    const { budget, production_companies = [], recommendations = [], revenue } = data;

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
            <Box mb={3} pt={1} className={classes.detailsCont}>
                <Typography variant="body2">Production Companies</Typography>
                <Box display="flex" flexDirection="row" flexWrap="wrap" mx={-1} mb={1}>
                    {production_companies.map((company) => {
                        return (
                            <Box
                                p={1}
                                m={1}
                                display="flex"
                                alignItems="center"
                                width={40}
                                boxShadow={2}
                                boxSizing="content-box"
                            >
                                <img
                                    alt={company.name}
                                    src={company.logo}
                                    style={{ width: 'inherit' }}
                                />
                            </Box>
                        );
                    })}
                </Box>

                <Typography variant="body2">Budget</Typography>
                <Typography variant="body2" gutterBottom>
                    ${formatNumWithComma(budget)}
                </Typography>

                <Typography variant="body2">Revenue</Typography>
                <Typography variant="body2" gutterBottom>
                    ${formatNumWithComma(revenue)}
                </Typography>

                <Typography variant="body2">Keywords</Typography>
                <Box display="flex" flexWrap="wrap" mt={1}>
                    {[...Array(8)].map((i) => (
                        <Chip
                            label="Keyword"
                            onClick={() => {}}
                            size="small"
                            style={{ margin: 4 }}
                        />
                    ))}
                </Box>
            </Box>

            <Divider />

            <Box mt={3} mb={2}>
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
    data: state.movieDetail,
    recommendations: state.movieDetail.recommendations,
    isLoading: state.loaders.isMovieDetailLoading
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
