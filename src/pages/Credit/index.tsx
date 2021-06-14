import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@material-ui/core';

import { selectors as mediaSelectors, actions as mediaActions } from '../../store/media.slice';
import * as i from '../../store/interfaces';

import { formatNumWithComma, formatDate, formatHours } from '../../utils/helpers';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

const useStyles = makeStyles((theme) => ({
    container: {
        color: '#fff',
        display: 'flex',
        flex: 1,
        background:
            'linear-gradient(to right, rgba(31, 36, 33, 0.95) 150px, rgba(38, 102, 69, 0.9) 100%)',
        '& .flex-row': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        '& .flex-column': {
            display: 'flex',
            flexDirection: 'column'
        },
        '& .poster-image': {
            // minWidth: 300,
            // width: 300,
            height: 140,
            borderRadius: 8
        },
        '& .subtitle > span:not(:first-child)': {
            marginLeft: theme.spacing(1),
            '&::before': {
                content: '"\\2022"',
                marginRight: theme.spacing(1)
            }
        }
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4)
        // flex: 1,
        // overflow: 'hidden',
        // marginRight: theme.spacing(8)
    },
    mediaContainer: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
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
            '& .crew-tab-item': {
                maxHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                '& .card-items': {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(-3),
                    marginBottom: theme.spacing(2)
                }
            },
            '& .MuiCard-root': {
                width: 340,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3),
                '& .media': {
                    height: 100,
                    width: 100
                },
                '& .card-content': {
                    height: 100
                }
            }
        }
    }
}));

interface MatchParams {
    id: string;
}

interface CreditProps extends RouteComponentProps<MatchParams> {
    mediaType: i.media_type;
}

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

const Credit: React.FC<CreditProps> = ({ mediaType, history, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);

    const { data: mediaDetail, fetching: mediaDetailLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.IMediaDetail>
    >(mediaSelectors.mediaDetailSelector);

    const { data: rawCredits, fetching: creditsLoading } = useSelector<
        i.TState,
        i.IStateEntity<i.ICastCrew>
    >(mediaSelectors.mediaCreditsSelector);

    const { id: mediaId } = match.params;
    const isMovie = mediaType === i.media_type.MOVIE;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        dispatch(mediaActions.getMediaDetail({ id: mediaId, media: mediaType }));
        dispatch(mediaActions.getMediaCredits({ id: mediaId, media: mediaType }));
    }, [mediaId]);

    const mapData = () => {
        const { cast, crew } = rawCredits;

        let groupedCrew = _.chain(crew)
            .groupBy('department')
            .map((value, key) => ({
                department: key,
                crew: value.map((person) => ({
                    onClick: () => {
                        // handleCastClick(person.id);
                    },
                    poster: person.poster,
                    title: person.name,
                    subtitle: person.character,
                    subtitle2: !isMovie
                        ? `${person.episodes} Episode${person.episodes || 0 > 1 ? 's' : ''}`
                        : ''
                }))
            }))
            .sortBy('department')
            .value();

        const mappedCast = cast.map((person) => ({
            onClick: () => {
                // handleCastClick(person.id);
            },
            poster: person.poster,
            title: person.name,
            subtitle: person.character,
            subtitle2: !isMovie
                ? `${person.episodes} Episode${person.episodes || 0 > 1 ? 's' : ''}`
                : ''
        }));

        return { cast: mappedCast, crew: groupedCrew };
    };

    const { cast, crew } = mapData();

    return (
        <>
            {/* BANNER */}
            <Box className={classes.container} style={{ backgroundSize: 'cover' }}>
                <Container disableGutters maxWidth="lg">
                    <Box className="flex-row" p={4}>
                        <img src={mediaDetail.poster} alt="PAT MDb" className="poster-image" />

                        <Box className="flex-column" pl={5}>
                            <Typography variant="h3" className="semibold-text">
                                {mediaDetail.title}
                            </Typography>
                            <Typography className="subtitle">
                                <span>{formatDate(mediaDetail.release_date)}</span>
                                <span>{mediaDetail.genres.join(', ')}</span>
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* BODY */}
            <Container disableGutters maxWidth="lg">
                {!creditsLoading ? (
                    <Box className={classes.mediaContainer}>
                        <Tabs
                            value={selectedTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(event, newValue) => setSelectedTab(newValue)}
                        >
                            <Tab label="Cast" disableRipple />
                            <Tab label="Crew" disableRipple />
                        </Tabs>
                        <Divider />

                        <Box className="media-items-container">
                            <TabPanel
                                className="tab-item overflow-overlay"
                                value={selectedTab}
                                index={0}
                            >
                                {cast.map((props) => (
                                    <Card variant="horizontal" {...props} />
                                ))}
                            </TabPanel>
                            <TabPanel
                                className="crew-tab-item overflow-overlay"
                                value={selectedTab}
                                index={1}
                            >
                                {crew.map(({ department, crew: departmentCrew }) => (
                                    <>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            className="semibold-text"
                                        >
                                            {department}
                                        </Typography>
                                        <Box className="card-items">
                                            {departmentCrew.map((props) => (
                                                <Card variant="horizontal" {...props} />
                                            ))}
                                        </Box>
                                    </>
                                ))}
                            </TabPanel>
                        </Box>
                    </Box>
                ) : (
                    <>Loading</>
                )}
            </Container>
        </>
    );
};

export default withRouter(Credit);
