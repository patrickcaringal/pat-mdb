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
        marginBottom: '18px'
    },
    cover: {
        width: 94,
        height: 141
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'space-between'
    }
});

interface IMovieCard {
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

const MovieCard: React.FC<IMovieCard> = ({ image, title, subtitle, description }) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    const classes = useStyles();

    const IOOptions = { rootMargin: '282px 0px 0px 0px' };
    const [IOref] = useIntersect(IOOptions, (shown: boolean) => setIsShown(shown));

    return (
        <Card className={classes.root} {...({ ref: IOref } as any)}>
            {isShown ? (
                <CardMedia className={classes.cover} image={image} title={title} />
            ) : (
                <Skeleton variant="rect" animation="pulse" className={classes.cover} />
            )}
            <CardContent className={classes.content} style={{ paddingBottom: 10, paddingTop: 10 }}>
                <Box>
                    <Typography variant="h6" style={{ fontWeight: 600 }}>
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
