import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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
import { selectors } from '../../../store/tvShow.slice';
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
    collectionContainer: {
        '& .cast-items-container': {
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 500,
            overflow: 'auto',
            paddingRight: theme.spacing(2),

            '& .card-container': {
                minHeight: 175,
                // marginBottom: theme.spacing(3),
                '&:not(:last-child)': {
                    marginBottom: theme.spacing(3)
                },
                '&:last-child': {
                    marginBottom: 2
                },
                '& .MuiCardActionArea-root': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }
            },
            '& .media': {
                height: 175,
                width: 120
            },
            '& .card-content': {
                flex: 1,
                height: 175,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: theme.spacing(2)
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
                maxHeight: 500,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: theme.spacing(-3),
                marginTop: theme.spacing(2)
                // marginBottom: theme.spacing(-3)
            },
            '& .card-container': {
                width: 241,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3)
            },
            '& .media': {
                height: 160
            },
            '& .desc-overlay': {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: '#DCE1DE',
                background: 'rgba(0,0,0,0.6)',
                padding: theme.spacing(1, 2)
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

interface IOwnProps extends RouteComponentProps {}

const LeftSection: React.FC<IOwnProps> = ({ history }) => {
    const classes = useStyles();
    const {
        data: { cast = [], collection = [], photos = [], videos = [] },
        fetching: loading
    } = useSelector(selectors.tvShowDetailSelector);

    const [selectedTab, setSelectedTab] = useState(1);

    const handleCastClick = (id: string) => {
        history.push(`/person/${id}`);
    };

    const handleCollectionClick = (id: string) => {
        history.push(`/movie/${id}`);
    };

    return (
        <>
            <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    Cast
                </Typography>
                <Box className="cast-items-container">
                    {cast.map((person) => (
                        <Card className="card-container">
                            <CardActionArea onClick={() => handleCastClick(person.id)}>
                                <CardMedia className="media" image={person.poster} title="asd" />
                                <CardContent className="card-content">
                                    <Typography variant="body1">{person.name}</Typography>
                                    <Typography
                                        className="line-clamp-2"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {person.character}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {person.episodes} Episode
                                        {person.episodes || 0 > 1 ? 's' : ''}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Divider className={classes.divider} />

            {collection.length !== 0 && (
                <>
                    <Box className={classes.collectionContainer}>
                        <Typography className={classes.title} variant="h5">
                            Seasons
                        </Typography>
                        <Box className="cast-items-container">
                            {collection
                                .filter((i) => {
                                    const release = new Date(i.release_date) as any;
                                    const today = new Date() as any;
                                    return release - today <= 0; // filter released seasons only
                                })
                                .map((movie) => {
                                    const {
                                        id,
                                        title,
                                        overview,
                                        release_date,
                                        poster,
                                        episode_count = 0
                                    } = movie;

                                    return (
                                        <Card className="card-container">
                                            <CardActionArea
                                                onClick={() => handleCollectionClick(id)}
                                            >
                                                <CardMedia
                                                    className="media"
                                                    image={poster}
                                                    title="asd"
                                                />
                                                <CardContent className="card-content">
                                                    <div>
                                                        <Typography variant="body1">
                                                            {title}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            {new Date(release_date).getFullYear()} |{' '}
                                                            {episode_count} Episode
                                                            {episode_count > 1 ? 's' : ''}
                                                        </Typography>
                                                    </div>

                                                    <Typography
                                                        className="line-clamp"
                                                        variant="body2"
                                                    >
                                                        {overview}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    );
                                })}
                        </Box>
                    </Box>

                    <Divider className={classes.divider} />
                </>
            )}

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
                    <TabPanel className="tab-item" value={selectedTab} index={1}>
                        {photos.map((photo) => (
                            <Card className="card-container">
                                <CardActionArea onClick={() => {}}>
                                    <CardMedia className="media" image={photo} title="asd" />
                                </CardActionArea>
                            </Card>
                        ))}
                    </TabPanel>
                    <TabPanel className="tab-item" value={selectedTab} index={2}>
                        {videos.map((video) => (
                            <Card className="card-container">
                                <CardActionArea onClick={() => {}}>
                                    <CardMedia
                                        className="media"
                                        image={video.thumbnail}
                                        title="asd"
                                    />
                                    <Box className="desc-overlay">
                                        <Typography variant="body1" noWrap>
                                            {video.description}
                                        </Typography>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        ))}
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
};

export default withRouter(LeftSection);
