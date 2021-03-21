import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Banner from './Banner';
import BodyContainer from './BodyContainer';
import LeftContainer from './LeftContainer';
import RigthContainer from './RigthContainer';

import { actions, interfaces } from '../../../ducks';

const useStyles = makeStyles({
    movieConent: {},
    leftSidebar: {
        width: 260,
        minWidth: 260
        // border: '1px solid red'
    },

    cardCont: {
        minWidth: 138,
        marginRight: 14
    },
    cardImg: {
        height: 175
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    },

    recommendationCard: {
        width: 120,
        marginBottom: 16
    },
    recommendationCardImg: {
        height: 195
    },
    recommendationCardContent: {
        '&.MuiCardContent-root': {
            padding: 10
        }
    },

    mediaTab: {
        '&.MuiTab-root': {
            textTransform: 'none'
        },
        '&.Mui-selected': {
            fontWeight: 600
        }
    },

    photoCard: {
        minWidth: 533,
        borderRadius: 0,
        marginRight: 14
    },
    photoCardImg: {
        height: 300
    },

    posterCard: {
        minWidth: 200,
        borderRadius: 0,
        marginRight: 14
    },
    posterCardImg: {
        height: 300
    }
});

interface MatchParams {
    id: string;
}

interface IStateToProps {}

interface IDispatchToProps {
    getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
}

interface MovieDetailProps
    extends IStateToProps,
        IDispatchToProps,
        RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match, getMovieDetail, location }) => {
    const classes = useStyles();

    const { id: movieId } = match.params;

    useEffect(() => {
        getMovieDetail({ id: movieId });
    }, []);

    return (
        <>
            <Banner />
            <BodyContainer>
                <LeftContainer />
                <RigthContainer />
            </BodyContainer>
        </>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    getMovieDetail: actions.getMovieDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoivieDetail));
