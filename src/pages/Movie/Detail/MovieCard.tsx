import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Skeleton from '@material-ui/lab/Skeleton';

import useIntersect from '../../../customhooks/useIntersect';

const useStyles = makeStyles({
    cardCont: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 18,
        height: 141
    },
    cardImg: {
        width: 94
        // height: 141
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10
    },
    title: {
        fontWeight: 600
    }
});

interface IMediaCard {
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

const MovieCard: React.FC<IMediaCard> = ({ image, title, subtitle, description }) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const classes = useStyles();

    const IOOptions = { rootMargin: '318px 0px 0px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <Card className={classes.cardCont} {...({ ref: IOref } as any)}>
            {isShown ? (
                <CardMedia className={classes.cardImg} image={image} title={title} />
            ) : (
                <Skeleton variant="rect" animation="pulse" className={classes.cardImg} />
            )}
            <CardContent className={classes.cardContent}>
                <Box>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Typography color="textSecondary">{subtitle}</Typography>
                </Box>
                <Typography className="line-clamp">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
