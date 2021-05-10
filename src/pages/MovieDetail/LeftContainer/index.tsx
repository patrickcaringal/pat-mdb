import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Divider,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';

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
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
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
    mediaContainer: {
        '& .MuiTabs-flexContainer': {
            alignItems: 'center',
            '& .tab-title': {
                fontWeight: 600,
                marginRight: theme.spacing(4)
            },
            '& .MuiTab-root': {
                minWidth: 120
            }
        },

        '& .media-items-container': {
            '& .tab-item': {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: theme.spacing(-3),
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(-3)
            },
            '& .card-container': {
                width: 241,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3)
            },
            '& .media': {
                height: 160
            }
        }
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

interface IOwnProps {}

const LeftSection: React.FC<IOwnProps> = () => {
    const classes = useStyles();
    const {
        data: { cast = [], photos = [] },
        fetching: loading
    } = useSelector(selectors.movieDetailSelector);

    const [selectedTab, setSelectedTab] = useState(1);

    return (
        <>
            <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    Cast
                </Typography>
                <Divider />
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

            <Divider className={classes.divider} />

            <Box className={classes.mediaContainer}>
                <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => setSelectedTab(newValue)}
                >
                    <Typography className="tab-title" variant="h5">
                        Medias
                    </Typography>
                    <Tab label="Photos" disableRipple />
                    <Tab label="Videos" disableRipple />
                </Tabs>
                <Divider />

                <Box className="media-items-container">
                    <TabPanel value={selectedTab} index={1} className="tab-item">
                        {photos.map((photo) => (
                            <Card className="card-container">
                                <CardActionArea onClick={() => {}}>
                                    <CardMedia className="media" image={photo} title="asd" />
                                </CardActionArea>
                            </Card>
                        ))}
                    </TabPanel>
                    <TabPanel value={selectedTab} index={2}>
                        Item Two
                    </TabPanel>
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
};

// const mapStateToProps = (state: interfaces.TState) => ({
//     cast: state.movieDetail.cast,
//     collection: (state.movieDetail?.collection as interfaces.IMedia[]) || [],
//     isLoading: state.loaders.isMovieDetailLoading
// });

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(LeftSection);
export default LeftSection;
