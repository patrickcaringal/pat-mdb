import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Popular as PopularMovies, Genres } from '../../Home/mockData';

const useStyles = makeStyles({
    cardCont: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: 200,
        marginLeft: 30,
        marginBottom: 30
    },
    cardImg: {
        height: 'calc((((100vw - 80px - 260px - 128px) / 4)) * 1.5)',
        maxHeight: 'calc(208px * 1.5)'
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    }
});

interface TvShowProps {}

const TvShowCards: React.FC<TvShowProps> = ({}) => {
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {PopularMovies.map((m) => {
                const image = `https://image.tmdb.org/t/p/w300/${m.poster_path}`;
                const genre = m.genre_ids
                    .map((g) => Genres.find((i) => i.id === g)?.name)
                    .join(', ');

                return (
                    <Card className={classes.cardCont}>
                        <CardMedia
                            className={classes.cardImg}
                            image={image}
                            title={m.original_title}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.title}>{m.original_title}</Typography>
                            <Typography variant="body2" className={classes.subtitle}>
                                {genre}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}

            {/* fillers */}
            <div className={classes.cardCont} />
            <div className={classes.cardCont} />
            <div className={classes.cardCont} />
        </Box>
    );
};

export default TvShowCards;
