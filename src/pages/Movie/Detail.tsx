import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match }) => {
    return <h1>Detail {match.params.id}</h1>;
};

export default withRouter(MoivieDetail);
