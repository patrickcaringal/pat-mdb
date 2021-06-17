import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

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
            height: 300,
            borderRadius: 8,
            marginBottom: theme.spacing(2),
            backgroundColor: '#dbdbdb'
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

interface IOwnProps {}

const LeftSection: React.FC<IOwnProps> = () => {
    const classes = useStyles();
    const {
        data: { birthday, department, place_of_birth, poster },
        fetching: personDetailLoading
    } = useSelector(selectors.personDetailSelector);

    if (personDetailLoading) return <LeftSectionSkeleton />;

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

export default LeftSection;

const LeftSectionSkeleton: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Skeleton variant="rect" className="poster-image" />

            <Box>
                <Typography className="title" variant="h5" gutterBottom>
                    <Skeleton variant="text" width={160} />
                </Typography>

                <Typography className="bold-text">
                    <Skeleton variant="text" width={160} />
                </Typography>
                <Typography gutterBottom>
                    <Skeleton variant="text" width={120} />
                </Typography>

                <Typography className="bold-text">
                    <Skeleton variant="text" width={160} />
                </Typography>
                <Typography gutterBottom>
                    <Skeleton variant="text" width={120} />
                </Typography>

                <Typography className="bold-text">
                    <Skeleton variant="text" width={160} />
                </Typography>
                <Typography gutterBottom>
                    <Skeleton variant="text" width={120} />
                </Typography>
            </Box>
        </div>
    );
};
