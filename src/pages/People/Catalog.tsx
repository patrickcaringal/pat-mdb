import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Popular as PopularPeople } from './mockData';

const useStyles = makeStyles({
    cardCont: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: 200,
        marginLeft: 15,
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

const PeopleCatalog: React.FC<{}> = ({}) => {
    const classes = useStyles();

    return (
        <Box display="flex" mx={4} my={3}>
            <Container disableGutters maxWidth="lg">
                <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginBottom: 16, textTransform: 'capitalize' }}
                >
                    Popular People
                </Typography>

                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    style={{ marginLeft: '-15px' }}
                >
                    {PopularPeople.map((p) => {
                        const image = `https://image.tmdb.org/t/p/w185/${p.profile_path}`;
                        const movies = p.known_for
                            .map((m) => m.original_title || m.original_name)
                            .join(', ');

                        return (
                            <Card className={classes.cardCont}>
                                <CardMedia
                                    className={classes.cardImg}
                                    image={image}
                                    title={p.name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.title}>{p.name}</Typography>
                                    <Typography variant="body2" className={classes.subtitle} noWrap>
                                        {movies}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}

                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                </Box>
            </Container>
        </Box>
    );
};

export default PeopleCatalog;
