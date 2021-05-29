import React, { useState } from 'react';
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

import { selectors } from '../../../store/movie.slice';

import CardComp from '../../../components/CardList/Card';

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
        '& .items-container': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: theme.spacing(-3),
            marginBottom: theme.spacing(-3)

            // '& .card-container': {
            //     width: 138,
            //     marginLeft: theme.spacing(3),
            //     marginBottom: theme.spacing(3)
            // },
            // '& .media': {
            //     height: 175
            // },
            // '& .card-content': {
            //     padding: theme.spacing(1)
            // }
        }
    },
    collectionContainer: {
        '& .items-container': {
            display: 'flex',
            flexDirection: 'column'

            // '& .card-container': {
            //     '&:not(:last-child)': {
            //         marginBottom: theme.spacing(3)
            //     },
            //     '& .MuiCardActionArea-root': {
            //         display: 'flex',
            //         flexDirection: 'row',
            //         justifyContent: 'flex-start'
            //     }
            // },
            // '& .media': {
            //     height: 175,
            //     width: 120
            // },
            // '& .card-content': {
            //     flex: 1,
            //     height: 175,
            //     display: 'flex',
            //     flexDirection: 'column',
            //     justifyContent: 'space-between',
            //     padding: theme.spacing(2)
            // }
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
    } = useSelector(selectors.movieDetailSelector);

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
                <Box className="items-container">
                    {cast.map((person) => (
                        <CardComp
                            onClick={() => {
                                handleCastClick(person.id);
                            }}
                            poster={person.poster}
                            title={person.name}
                            subtitle={person.character}
                        />
                    ))}
                </Box>
            </Box>

            <Divider className={classes.divider} />

            {collection.length !== 0 && (
                <>
                    <Box className={classes.collectionContainer}>
                        <Typography className={classes.title} variant="h5">
                            Collections
                        </Typography>
                        <Box className="items-container">
                            {collection.map((movie) => (
                                <CardComp
                                    variant="horizontal"
                                    onClick={() => {
                                        handleCollectionClick(movie.id);
                                    }}
                                    poster={movie.poster}
                                    title={movie.title}
                                    subtitle={`${new Date(movie.release_date).getFullYear()}`}
                                    description={movie.overview}
                                />
                                // <Card className="card-container">
                                //     <CardActionArea onClick={() => handleCollectionClick(movie.id)}>
                                //         <CardMedia
                                //             className="media"
                                //             image={movie.poster}
                                //             title="asd"
                                //         />
                                //         <CardContent className="card-content">
                                //             <div>
                                //                 <Typography variant="body1">
                                //                     {movie.title}
                                //                 </Typography>
                                //                 <Typography variant="body2" color="textSecondary">
                                //                     {new Date(movie.release_date).getFullYear()}
                                //                 </Typography>
                                //             </div>

                                //             <Typography className="line-clamp" variant="body2">
                                //                 {movie.overview}
                                //             </Typography>
                                //         </CardContent>
                                //     </CardActionArea>
                                // </Card>
                            ))}
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
        </>
    );
};

export default withRouter(LeftSection);
