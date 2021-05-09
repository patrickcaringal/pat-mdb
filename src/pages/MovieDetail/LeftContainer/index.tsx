import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardMedia, CardActionArea, Typography } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import Card2 from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';

// import { useStyles, cardStyle, horizontalCardStyle } from './styles';

import { IMediaDetail } from '../../../store/interfaces';
import { selectors } from '../../../store/movie.slice';
// import Skeleton from './Skeleton';
// import { actions, interfaces } from '../../../../ducks';
// import { formatDate } from '../../../../utils/helpers';

// import { Card, CardInterfaces } from '../../../../components/Card';
// import { CardList, CardHeader, CardItems } from '../../../../components/HorizontalCarList';

// interface IStateToProps {
//     cast: interfaces.ICast[];
//     collection: interfaces.IMedia[];
//     isLoading: boolean;
// }

// interface IDispatchToProps {}
const useStyles = makeStyles((theme) => ({
    castContainer: {
        '& .cast-items-container': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: theme.spacing(-3),
            marginBottom: theme.spacing(-3),

            '& .card-container': {
                width: 138,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3)
            },
            '& .media': {
                height: 175
            },
            '& .card-content': {
                padding: theme.spacing(1)
            }
        }
    },
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(3)
    }

    // cardContainer: {
    //     width: 138
    // },
    // media: {
    //     height: 175
    // },
    // cardContent: {
    //     padding: theme.spacing(1)
    // }
}));

interface IOwnProps {}

const LeftSection: React.FC<IOwnProps> = () => {
    const classes = useStyles();
    const {
        data: { cast = [] },
        fetching: loading
    } = useSelector(selectors.movieDetailSelector);

    // console.log(JSON.stringify(cast, null, 4));

    // const mappedCastItems = useMemo(
    //     () =>
    //         cast.map((i: interfaces.ICast) => {
    //             const { poster: image, name: title, character: subtitle } = i;
    //             return {
    //                 id: title,
    //                 image,
    //                 title,
    //                 subtitle
    //             };
    //         }),
    //     [cast]
    // );

    // const castItemRender = useCallback(
    //     (item: CardInterfaces.ICard) => {
    //         return <Card {...item} style={cardStyle} />;
    //     },
    //     [cast]
    // );

    // const mappedCollectionItems = useMemo(
    //     () =>
    //         collection.map((i: interfaces.IMedia) => {
    //             const {
    //                 id,
    //                 poster: image,
    //                 title,
    //                 release_date: subtitle,
    //                 overview: description
    //             } = i;

    //             return {
    //                 id,
    //                 image,
    //                 title,
    //                 subtitle: formatDate(subtitle),
    //                 description
    //             };
    //         }),
    //     [collection]
    // );

    // const collectionItemRender = useCallback(
    //     (item: CardInterfaces.ICard) => {
    //         return <Card {...item} variant="horizontal" style={horizontalCardStyle} />;
    //     },
    //     [collection]
    // );

    // if (isLoading) {
    //     return <Skeleton />;
    // }

    return (
        <>
            <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    Cast
                </Typography>
                <Box className="cast-items-container">
                    {cast.map((actor) => (
                        <Card className="card-container">
                            <CardActionArea onClick={() => {}}>
                                <CardMedia className="media" image={actor.poster} title="asd" />
                                <CardContent className="card-content">
                                    <Typography variant="body1">{actor.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {actor.character}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>
            {/* <CardList<CardInterfaces.ICard> items={mappedCastItems} className={classes.containers}>
                <CardHeader title="Cast" />
                <CardItems itemRender={castItemRender} className={classes.castList} />
            </CardList>

            <CardList<CardInterfaces.ICard>
                items={mappedCollectionItems}
                hideOnBlankItems
                className={classes.containers}
            >
                <CardHeader title="Collections" />
                <CardItems itemRender={collectionItemRender} className={classes.collectionList} />
            </CardList> */}
        </>
    );
};

// const mapStateToProps = (state: interfaces.TState) => ({
//     cast: state.movieDetail.cast,
//     collection: (state.movieDetail?.collection as interfaces.IMedia[]) || [],
//     isLoading: state.loaders.isMovieDetailLoading
// });

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(LeftSection);
export default LeftSection;
