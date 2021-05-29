import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import { actions } from '../../store/movie.slice';

import Banner from './Banner';
import LeftContainer from './LeftContainer';
import RigthContainer from './RightContainer';

const useStyles = makeStyles((theme) => {
    return {
        content: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
            marginRight: theme.spacing(8)
            // border: '1px solid khaki'
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            width: 320,
            minWidth: 320
            // border: '1px solid red'
        }
    };
});

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        dispatch(actions.getMovieDetail({ id: match.params.id }));
    }, [match.params.id]);

    return (
        <>
            <Banner />
            <Box style={{ background: '#F3F8F3' }}>
                <Container className={classes.content} disableGutters maxWidth="lg">
                    <Box className={classes.left}>
                        <LeftContainer />
                    </Box>

                    <Box className={classes.right}>
                        <RigthContainer />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withRouter(MoivieDetail);
