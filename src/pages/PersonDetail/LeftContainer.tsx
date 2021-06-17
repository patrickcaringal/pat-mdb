import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { selectors } from '../../store/person.slice';

interface IOwnProps {}

const LeftContainer: React.FC<IOwnProps> = () => {
    const {
        data: { birthday, department, place_of_birth, poster },
        fetching: personDetailLoading
    } = useSelector(selectors.personDetailSelector);

    if (personDetailLoading) return <LeftContainerSkeleton />;

    return (
        <>
            <img src={poster} alt="PAT MDb" className="poster-image" />

            <Box>
                <Typography className="semibold-text" variant="h5" gutterBottom>
                    Personal Info
                </Typography>

                <Typography className="bold-text">Known For</Typography>
                <Typography gutterBottom>{department}</Typography>

                <Typography className="bold-text">Birthdate</Typography>
                <Typography gutterBottom>{birthday}</Typography>

                <Typography className="bold-text">Place of Birth</Typography>
                <Typography gutterBottom>{place_of_birth}</Typography>
            </Box>
        </>
    );
};

export default LeftContainer;

const LeftContainerSkeleton: React.FC = () => (
    <>
        <Skeleton variant="rect" className="poster-image" />

        <Box>
            <Typography variant="h5" gutterBottom>
                <Skeleton variant="text" width={160} />
            </Typography>

            <Typography>
                <Skeleton variant="text" width={160} />
            </Typography>
            <Typography gutterBottom>
                <Skeleton variant="text" width={120} />
            </Typography>

            <Typography>
                <Skeleton variant="text" width={160} />
            </Typography>
            <Typography gutterBottom>
                <Skeleton variant="text" width={120} />
            </Typography>

            <Typography>
                <Skeleton variant="text" width={160} />
            </Typography>
            <Typography gutterBottom>
                <Skeleton variant="text" width={120} />
            </Typography>
        </Box>
    </>
);
