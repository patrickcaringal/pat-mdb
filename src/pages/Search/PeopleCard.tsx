import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Skeleton from '@material-ui/lab/Skeleton';

import useIntersect from '../../customhooks/useIntersect';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginBottom: '18px',
        background: 'none',
        boxShadow: 'none',
        height: 70
    },
    cover: {
        width: 70,
        height: 70,
        borderRadius: 4
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'center'
    }
});

interface IPeopleCard {}

const PeopleCard: React.FC<IPeopleCard> = ({}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image="https://via.placeholder.com/70x70/767c77/fabea7"
                title="Lord"
            />
            <CardContent className={classes.content} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Tom Holland
                </Typography>
                <Typography>
                    Acting • Avengers: Infinity War, Captain America: Civil War, Spider-Man:
                    Homecoming
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PeopleCard;
