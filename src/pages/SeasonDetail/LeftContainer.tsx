import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Tab, Tabs, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

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

            paddingRight: theme.spacing(4),
            '& .MuiCard-root ': {
                minHeight: 127,
                '& .media': {
                    width: 227,
                    height: 127
                },
                '& .card-content': {
                    height: 127
                }
            },
            '& .MuiCard-root:last-child': {
                marginBottom: 1
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
            },
            '& .Mui-selected': {
                fontWeight: 700
            }
        },

        '& .media-items-container': {
            '& .tab-item': {
                maxHeight: 500,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: theme.spacing(2),
                marginLeft: theme.spacing(-3)
            },
            '& .MuiCard-root': {
                width: 241
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

const TabPanel = ({ children, value, index, ...other }) => (
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

interface IOwnProps
    extends RouteComponentProps<{
        id: string;
    }> {
    cast: ICardComponentProps[];
    collection?: ICardComponentProps[];
    // photos: ICardComponentProps[];
    // videos: ICardComponentProps[];
    loading: boolean;
    onViewCredits: () => void;
}

const LeftSection: React.FC<IOwnProps> = ({
    cast,
    collection = [],
    // photos,
    // videos,
    loading,
    onViewCredits,
    match
}) => {
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(1);
    const mediaId = match.params.id;

    if (loading) return <LeftSectionSkeleton />;

    return (
        <>
            <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    Cast
                </Typography>
                <Box className="items-container">
                    {cast.map((props) => (
                        <Card {...props} />
                    ))}

                    <Card variant="blank" onClick={onViewCredits}>
                        <Typography
                            variant="body1"
                            style={{ textAlign: 'center', fontWeight: 600 }}
                            color="textSecondary"
                        >
                            See all
                            <br />
                            Cast & Crew
                        </Typography>
                    </Card>
                </Box>
            </Box>

            <Divider className={classes.divider} />

            {collection.length !== 0 && (
                <>
                    <Box className={classes.collectionContainer}>
                        <Typography className={classes.title} variant="h5">
                            Collections
                        </Typography>
                        <Box className="items-container overflow-overlay">
                            {collection.map((props) => (
                                <Card variant="horizontal" {...props} />
                            ))}
                        </Box>
                    </Box>

                    <Divider className={classes.divider} />
                </>
            )}
            {/*
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
                    <TabPanel className="tab-item overflow-overlay" value={selectedTab} index={1}>
                        {photos.map((props) => (
                            <Card {...props} />
                        ))}
                    </TabPanel>
                    <TabPanel
                        className="tab-item videos-tab overflow-overlay"
                        value={selectedTab}
                        index={2}
                    >
                        {videos.map((props) => (
                            <Card {...props} />
                        ))}
                    </TabPanel>
                </Box>
            </Box> */}
        </>
    );
};

export default withRouter(LeftSection);

const LeftSectionSkeleton: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    <Skeleton variant="text" width={140} />
                </Typography>
                <Box className="items-container">
                    {_.range(10).map(() => (
                        <CardSkeleton />
                    ))}
                </Box>
            </Box>

            <Divider className={classes.divider} />

            <Box className={classes.collectionContainer}>
                <Typography className={classes.title} variant="h5">
                    <Skeleton variant="text" width={140} />
                </Typography>
                <Box className="items-container">
                    {_.range(2).map(() => (
                        <CardSkeleton variant="horizontal" />
                    ))}
                </Box>
            </Box>

            <Divider className={classes.divider} />
            <Box className={classes.mediaContainer}>
                <Typography className={classes.title} variant="h5">
                    <Skeleton variant="text" width={140} />
                </Typography>

                <Divider />

                <Box className="media-items-container">
                    <TabPanel className="tab-item" value={1} index={1}>
                        {_.range(9).map(() => (
                            <CardSkeleton hasContent={false} />
                        ))}
                    </TabPanel>
                </Box>
            </Box>
        </>
    );
};
