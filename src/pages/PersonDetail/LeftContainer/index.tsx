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

import { IMediaDetail } from '../../../store/interfaces';
import { selectors } from '../../../store/tvShow.slice';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
    container: {
        '& .poster-image': {
            width: 200,
            height: 'auto',
            borderRadius: 8,
            marginBottom: theme.spacing(2)
        },
        '& .title': {
            fontWeight: 600
            // marginBottom: theme.spacing(2)
        },
        '& .bold-text': {
            fontWeight: 700
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: theme.spacing(2)
        }
    }
}));

interface IOwnProps extends RouteComponentProps {}

const LeftSection: React.FC<IOwnProps> = ({ history }) => {
    const classes = useStyles();
    const {
        data: { cast = [], collection = [], photos = [], videos = [] },
        fetching: loading
    } = useSelector(selectors.tvShowDetailSelector);

    const [selectedTab, setSelectedTab] = useState(1);

    const handleCastClick = (id: string) => {
        console.log(id);
        // history.push(`/person/${id}`);
    };

    const handleCollectionClick = (id: string) => {
        history.push(`/movie/${id}`);
    };

    return (
        <div className={classes.container}>
            <img
                src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
                alt="PAT MDb"
                className="poster-image"
            />

            <Box>
                <Typography className="title" variant="h5" gutterBottom>
                    Personal Info
                </Typography>

                <Typography className="bold-text">Known For</Typography>
                <Typography gutterBottom>Acting</Typography>

                <Typography className="bold-text">Birthdate</Typography>
                <Typography gutterBottom>1970-02-03 (51 years old)</Typography>

                <Typography className="bold-text">Place of Birth</Typography>
                <Typography gutterBottom>Cleveland, Ohio, USA</Typography>
            </Box>
            {/* <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    Cast
                </Typography>
                <Box className="cast-items-container">
                    {cast.map((person) => (
                        <Card className="card-container">
                            <CardActionArea
                                onClick={() => {
                                    handleCastClick(person.id);
                                }}
                            >
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
            </Box> */}
        </div>
    );
};

export default withRouter(LeftSection);
