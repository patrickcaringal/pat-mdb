import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from '../../store/movie.slice';

import Banner from './Banner';
import BodyContainer from './BodyContainer';
import LeftContainer from './LeftContainer';
import RigthContainer from './RightContainer';

// import { actions, interfaces } from '../../../ducks';

interface MatchParams {
    id: string;
}

interface IStateToProps {}

// interface IDispatchToProps {
//     getMovieDetail: (queries: interfaces.IGetMovieDetailPayload) => interfaces.IGetMovieDetail;
// }

// interface MovieDetailProps
//     extends IStateToProps,
//         IDispatchToProps,
//         RouteComponentProps<MatchParams> {}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match, location }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getMovieDetail({ id: match.params.id }));
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

export default withRouter(MoivieDetail);

// const mapStateToProps = () => ({});

// const mapDispatchToProps = {
//     getMovieDetail: actions.getMovieDetail
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoivieDetail));