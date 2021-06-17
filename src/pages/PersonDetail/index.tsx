import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';

import { actions } from '../../store/person.slice';
import LeftContainer from './LeftContainer';
import RigthContainer from './RightContainer';
import useStyles from './styles';

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match, location }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        dispatch(actions.getPersonDetail({ id: match.params.id }));
    }, [match.params.id]);

    return (
        <>
            <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content} disableGutters maxWidth="lg">
                    <Box className={classes.leftContainer}>
                        <LeftContainer />
                    </Box>
                    <Box className={classes.rightContainer}>
                        <RigthContainer />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withRouter(MoivieDetail);
