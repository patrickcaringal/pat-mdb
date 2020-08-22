import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Typography from '@material-ui/core/Typography';

import Card from './Card';
import { Popular as PopularMovies, Genres } from './mockData';
import landingImg from '../../asset/img/landing-bg.jpg';
// import useIntersect from '../../customhooks/useIntersect';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1
//     },
//     paper: {
//         background: 'khaki',
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary
//     }
// }));

const Home: React.FC = (props) => {
    // const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container>
                {/* Banner */}
                <Grid
                    item
                    xs={12}
                    style={{
                        minHeight: '300px',
                        height: 'calc(100vh / 2.5)',
                        maxHeight: '360px',
                        background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75)), url(${landingImg}) repeat`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                    }}
                >
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            mb={3}
                            style={{ color: '#fff' }}
                        >
                            <Typography variant="h3" component="h1" style={{ fontWeight: 700 }}>
                                Discover lots of movies and TV series.
                            </Typography>
                            <Typography variant="h4" style={{ fontWeight: 600 }}>
                                Keep track of your favorite shows.
                            </Typography>
                        </Box>
                        <Box display="flex" width="70%">
                            <FormControl variant="filled" fullWidth>
                                <InputLabel style={{ paddingLeft: '20px' }}>
                                    Search for a movie, tv show series, person
                                </InputLabel>
                                <FilledInput
                                    value=""
                                    disableUnderline
                                    // onChange={handleChange}
                                    style={{
                                        background: 'white',
                                        borderRadius: '30px',
                                        paddingLeft: '16px'
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>

                {/* Popular 83A0A0*/}
                <Grid item xs={12}>
                    <Box display="flex" p={3}>
                        <Container disableGutters maxWidth="lg">
                            <Box display="flex" py={1}>
                                <Typography variant="h5" style={{ fontWeight: 600 }}>
                                    Popular
                                </Typography>
                            </Box>

                            <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                                {PopularMovies.map((m) => {
                                    const image = `https://image.tmdb.org/t/p/w185/${m.poster_path}`;
                                    const genre = m.genre_ids
                                        .map((g) => Genres.find((i) => i.id === g)?.name)
                                        .join(', ');

                                    return (
                                        <Card
                                            image={image}
                                            title={m.original_title}
                                            subtitle={genre}
                                        />
                                    );
                                })}
                            </Box>
                        </Container>
                    </Box>
                </Grid>

                {/* Top Rated */}
                <Grid item xs={12}>
                    <Box display="flex" p={3}>
                        <Container disableGutters maxWidth="lg">
                            <Box display="flex" py={1}>
                                <Typography variant="h5" style={{ fontWeight: 600 }}>
                                    Top Rated
                                </Typography>
                            </Box>

                            <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                                {PopularMovies.map((m) => {
                                    const image = `https://image.tmdb.org/t/p/w154/${m.poster_path}`;
                                    const genre = m.genre_ids
                                        .map((g) => Genres.find((i) => i.id === g)?.name)
                                        .join(', ');

                                    return (
                                        <Card
                                            image={image}
                                            title={m.original_title}
                                            subtitle={genre}
                                        />
                                    );
                                })}
                            </Box>
                        </Container>
                    </Box>
                </Grid>

                {/* Upcoming */}
                <Grid item xs={12}>
                    <Box display="flex" p={3}>
                        <Container disableGutters maxWidth="lg">
                            <Box display="flex" py={1}>
                                <Typography variant="h5" style={{ fontWeight: 600 }}>
                                    Upcoming
                                </Typography>
                            </Box>

                            <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                                {PopularMovies.map((m) => {
                                    const image = `https://image.tmdb.org/t/p/w154/${m.poster_path}`;
                                    const genre = m.genre_ids
                                        .map((g) => Genres.find((i) => i.id === g)?.name)
                                        .join(', ');

                                    return (
                                        <Card
                                            image={image}
                                            title={m.original_title}
                                            subtitle={genre}
                                        />
                                    );
                                })}
                            </Box>
                        </Container>
                    </Box>
                </Grid>

                {/* Trending */}
                <Grid item xs={12}>
                    <Box display="flex" p={3}>
                        <Container disableGutters maxWidth="lg">
                            <Box display="flex" py={1}>
                                <Typography variant="h5" style={{ fontWeight: 600 }}>
                                    Trending
                                </Typography>
                            </Box>

                            <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                                {PopularMovies.map((m) => {
                                    const image = `https://image.tmdb.org/t/p/w154/${m.poster_path}`;
                                    const genre = m.genre_ids
                                        .map((g) => Genres.find((i) => i.id === g)?.name)
                                        .join(', ');

                                    return (
                                        <Card
                                            image={image}
                                            title={m.original_title}
                                            subtitle={genre}
                                        />
                                    );
                                })}
                            </Box>
                        </Container>
                    </Box>
                </Grid>

                {/* ETC */}
                {/* <Grid item xs={12}>
                    <Box
                        display="flex"
                        mt={50}
                        p={3}
                        style={{ background: isShown ? 'khaki' : 'salmon' }}
                        {...({ ref: ref } as any)}
                    >
                        Load
                    </Box>
                </Grid> */}
            </Grid>
        </React.Fragment>
    );
};

export default Home;
