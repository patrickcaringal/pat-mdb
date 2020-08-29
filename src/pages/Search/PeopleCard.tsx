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
        marginBottom: 18,
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

interface IPeopleCard {
    image: string;
    name: string;
    details: string;
}

const PeopleCard: React.FC<IPeopleCard> = ({ image, name, details }) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const classes = useStyles();

    const IOOptions = { rootMargin: '176px 0px 0px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <Card className={classes.root} {...({ ref: IOref } as any)}>
            {isShown ? (
                <CardMedia className={classes.cover} image={image} title={name} />
            ) : (
                <Skeleton variant="rect" animation="pulse" className={classes.cover} />
            )}
            <CardContent className={classes.content} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                    {name}
                </Typography>
                <Typography>{details}</Typography>
            </CardContent>
        </Card>
    );
};

export default PeopleCard;
