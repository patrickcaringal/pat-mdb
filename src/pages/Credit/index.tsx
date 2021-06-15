import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@material-ui/core';

import { selectors as mediaSelectors, actions as mediaActions } from '../../store/media.slice';
import * as i from '../../store/interfaces';

import { formatNumWithComma, formatDate, formatHours } from '../../utils/helpers';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';
import Banner from './Banner';

import useStyles from './styles';

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
            <Banner
                loading={mediaDetailLoading}
                poster={mediaDetail.poster}
                title={mediaDetail.title}
                subtitle1={formatDate(mediaDetail.release_date)}
                subtitle2={mediaDetail.genres.join(', ')}
            />

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
