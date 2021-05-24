import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { selectors } from '../../../store/person.slice';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
    container: {
        '& .poster-image': {
            width: 200,
            height: 'auto',
            borderRadius: 8,
            marginBottom: theme.spacing(2)
        },
        '& .title': {
            fontWeight: 600
            // marginBottom: theme.spacing(2)
        },
        '& .bold-text': {
            fontWeight: 700
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: theme.spacing(2)
        }
    }
}));

interface IOwnProps extends RouteComponentProps {}

const LeftSection: React.FC<IOwnProps> = ({ history }) => {
    const classes = useStyles();
    const {
        data: { birthday, department, place_of_birth, poster },
        fetching: loading
    } = useSelector(selectors.personDetailSelector);

    return (
        <div className={classes.container}>
            <img src={poster} alt="PAT MDb" className="poster-image" />

            <Box>
                <Typography className="title" variant="h5" gutterBottom>
                    Personal Info
                </Typography>

                <Typography className="bold-text">Known For</Typography>
                <Typography gutterBottom>{department}</Typography>

                <Typography className="bold-text">Birthdate</Typography>
                <Typography gutterBottom>{birthday}</Typography>

                <Typography className="bold-text">Place of Birth</Typography>
                <Typography gutterBottom>{place_of_birth}</Typography>
            </Box>
        </div>
    );
};

export default withRouter(LeftSection);
