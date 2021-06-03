import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Tab, Tabs, Typography } from '@material-ui/core';

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
        }
    },
    collectionContainer: {
        '& .items-container': {
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 500,
            overflow: 'auto',
            paddingRight: theme.spacing(2),
            '& .MuiCard-root ': {
                minHeight: 175
            },
            '&:last-child': {
                marginBottom: 2
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
            '& .MuiCard-root': {
                width: 241,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3)
            },
            '& .videos-tab': {
                '& .MuiCardContent-root': {
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    color: '#DCE1DE',
                    background: 'rgba(0,0,0,0.6)',
                    padding: theme.spacing(1, 2),
                    '& .MuiTypography-root': {
                        color: '#DCE1DE'
                    }
                }
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
                            <CardComp onClick={() => {}} poster={photo} />
                        ))}
                    </TabPanel>
                    <TabPanel className="tab-item videos-tab" value={selectedTab} index={2}>
                        {videos.map((video) => (
                            <CardComp
                                onClick={() => {}}
                                poster={video.thumbnail}
                                subtitle={video.description}
                            />
                        ))}
                    </TabPanel>
                </Box>
            </Box>
        </>
    );
};

export default withRouter(LeftSection);
