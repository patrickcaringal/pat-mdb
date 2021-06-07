import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { selectors as movieSelectors } from '../../store/movie.slice';
import { selectors as tvShowSelectors } from '../../store/tvShow.slice';
import { actions as movieActions } from '../../store/movie.slice';
import { actions as tvShowActions } from '../../store/tvShow.slice';
import * as i from '../../store/interfaces';

import { formatNumWithComma } from '../../utils/helpers';

// import Banner, { IMediaDetailComponentProps } from './Banner';
// import LeftContainer from './LeftContainer';
// import RightContainer from './RightContainer';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        marginRight: theme.spacing(8)
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        width: 320,
        minWidth: 320
    }
}));

interface MatchParams {
    id: string;
}

interface CreditProps extends RouteComponentProps<MatchParams> {
    mediaType: i.media_type;
}

const Credit: React.FC<CreditProps> = ({ mediaType, history, match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return <>Credits {mediaType}</>;
};

export default withRouter(Credit);
