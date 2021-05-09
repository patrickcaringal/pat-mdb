import React, { useCallback, useMemo } from 'react';

// import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

// import Chip from '@material-ui/core/Chip';

import { useStyles, cardStyle } from './styles';
// import Skeleton from './Skeleton';
// import { Card, CardInterfaces } from '../../../../components/Card';
// import { CardList, CardHeader, CardItems } from '../../../../components/HorizontalCarList';

// import { actions, interfaces } from '../../../../ducks';
// import { formatNumWithComma } from '../../../../utils/helpers';

// interface IStateToProps {
//     data: interfaces.IMediaDetail;
//     recommendations: interfaces.IMedia[];
//     isLoading: boolean;
// }

interface IDispatchToProps {}

interface IOwnProps {}

const RightContainer: React.FC<IOwnProps> = () => {
    const classes = useStyles();

    // const { production_companies = [], recommendations = [] } = data;

    // const mappedRecommendationItems = useMemo(
    //     () =>
    //         recommendations?.map((i: interfaces.IMedia) => {
    //             const { id, poster: image, title, genres: subtitle } = i;
    //             return {
    //                 id: title,
    //                 image,
    //                 title,
    //                 subtitle: subtitle.join(', ')
    //             };
    //         }),
    //     [recommendations]
    // );

    // const recommendationItemRender = useCallback(
    //     (item: CardInterfaces.ICard) => {
    //         return <Card {...item} style={cardStyle} />;
    //     },
    //     [recommendations]
    // );

    // if (isLoading) {
    //     return <Skeleton />;
    // }

    return (
        <>
            right content
            {/* <Box mb={3} pt={1} className={classes.detailsCont}>
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
                    <CardList<CardInterfaces.ICard> items={mappedRecommendationItems}>
                        <CardHeader title="You may also like" titleVariant="body1" />
                        <CardItems
                            itemRender={recommendationItemRender}
                            // Box props
                            display="flex"
                            py={2}
                            flexWrap="wrap"
                            justifyContent="space-between"
                        />
                    </CardList>
                </Box>
            </Box> */}
        </>
    );
};

// const mapStateToProps = (state: interfaces.TState) => ({
//     data: state.movieDetail,
//     recommendations: state.movieDetail.recommendations,
//     isLoading: state.loaders.isMovieDetailLoading
// });

// const mapDispatchToProps = {};

export default RightContainer;
