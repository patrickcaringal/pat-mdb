import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { selectors as mediaSelectors, actions as mediaActions } from '../../store/media.slice';
import * as i from '../../store/interfaces';
import { formatDate } from '../../utils/helpers';

import Banner from './Banner';
import Body from './Body';
import useStyles from './styles';

interface MatchParams {
    id: string;
}

interface CreditProps extends RouteComponentProps<MatchParams> {
    mediaType: i.media_type;
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
                        handleCreditClick(person.id);
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
                handleCreditClick(person.id);
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

    const handleCreditClick = (id: string) => {
        history.push(`/person/${id}`);
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
            <Body loading={creditsLoading} cast={cast} crew={crew} />
        </>
    );
};

export default withRouter(Credit);
