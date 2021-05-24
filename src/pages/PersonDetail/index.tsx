import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { actions } from '../../store/person.slice';

import Banner from './Banner';
import BodyContainer from './BodyContainer';
import LeftContainer from './LeftContainer';
import RigthContainer from './RightContainer';

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match, location }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(actions.getPersonDetail({ id: match.params.id }));
    }, [match.params.id]);

    return (
        <>
            {/* <Banner /> */}
            <BodyContainer>
                <LeftContainer />
                <RigthContainer />
            </BodyContainer>
        </>
    );
};

export default withRouter(MoivieDetail);
