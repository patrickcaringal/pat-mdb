import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Banner from './Banner';
import BodyContainer from './BodyContainer';
import LeftContainer from './LeftContainer';
import RigthContainer from './RigthContainer';

import { actions, interfaces } from '../../../ducks';

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
