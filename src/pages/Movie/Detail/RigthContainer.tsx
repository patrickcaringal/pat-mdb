import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Chip from '@material-ui/core/Chip';

import { actions, interfaces } from '../../../ducks';

import { Card, CardSkeleton, CardInterfaces } from '../../../components/Card';
import { CardList, CardHeader, CardItems } from '../../../components/HorizontalCarList';

import { formatNumWithComma } from '../../../utils/helpers';

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

interface IDispatchToProps {}

interface IOwnProps extends IStateToProps, IDispatchToProps {}

const cardStyle = {
    cardContainer: {
        minWidth: 140,
        width: 140,
        marginBottom: 16
    },
    cardImage: { height: 210 }
};

const RightContainer: React.FC<IOwnProps> = ({ data, isLoading }) => {
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

    const itemRender = useCallback(
        (item: CardInterfaces.ICard) => {
            return <Card {...item} style={cardStyle} />;
        },
        [recommendations]
    );

    const skeletonRender = useCallback(
        () => [...Array(20)].map(() => <CardSkeleton style={cardStyle} />),
        []
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
                <Box display="flex" flexDirection="row">
                    {/* {mappedRecommendations?.map((i) => (
                        <Card {...i} style={{ width: 140, imgHeight: 210, marginBottom: 16 }} />
                    ))} */}
                    <CardList<CardInterfaces.ICard>
                        items={mappedRecommendations}
                        isLoading={isLoading}
                    >
                        <CardHeader title="You may also like" titleVariant="body1" />
                        <CardItems
                            itemRender={itemRender}
                            skeletonRender={skeletonRender}
                            // Box props
                            display="flex"
                            py={2}
                            flexWrap="wrap"
                            justifyContent="space-between"
                        />
                    </CardList>
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
