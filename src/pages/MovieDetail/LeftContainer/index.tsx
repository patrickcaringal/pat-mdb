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
    cardContainer: {
        width: 138
    },
    media: {
        height: 175
    },
    cardContent: {
        padding: theme.spacing(1)
    }
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
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                {/* {
        "poster": "https://image.tmdb.org/t/p/w138_and_h175_face/lkW8gh20BuwzHecXqYH1eRVuWpb.jpg",
        "character": "Cole Young",
        "name": "Lewis Tan"
    } */}
                {cast.map((actor) => (
                    <Card className={classes.cardContainer}>
                        <CardActionArea onClick={() => {}}>
                            <CardMedia className={classes.media} image={actor.poster} title="asd" />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="body1">{actor.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {actor.character}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
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
