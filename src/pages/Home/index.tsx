import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Card from './Card';
import { Popular as PopularMovies, Genres } from './mockData';
import landingImg from '../../asset/img/landing-bg.jpg';

const useStyles = makeStyles((theme) => ({
    bannerGrid: {
        minHeight: '300px',
        height: 'calc(100vh / 2.5)',
        maxHeight: '360px',
        background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75)), url(${landingImg}) repeat`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
    },
    bannerHeader: { color: '#fff', fontWeight: 700 },
    bannerSubheader: { color: '#fff', fontWeight: 600 },
    searchForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    searchContainer: {
        display: 'flex',
        background: 'white',
        width: '65%',
        paddingLeft: '15px',
        borderRadius: '30px'
    },
    searchInput: {
        background: 'transparent',
        '&:hover': { background: 'transparent' },
        '&.Mui-focused': { background: 'transparent' }
    },
    seachBtn: {
        width: '75px',
        '&:hover': { background: 'transparent' }
    }
}));

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = (props) => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const doSearch = () => {
        if (!searchQuery) return;

        props.history.push({
            pathname: '/search',
            search: `?query=${searchQuery}`
        });
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        doSearch();
    };

    return (
        <Grid container>
            {/* Banner */}
            <Grid item xs={12} className={classes.bannerGrid}>
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Typography variant="h3" component="h2" className={classes.bannerHeader}>
                            Discover lots of movies and TV series.
                        </Typography>
                        <Typography variant="h4" className={classes.bannerSubheader}>
                            Keep track of your favorite shows.
                        </Typography>
                    </Box>

                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.searchForm}
                        onSubmit={handleOnSubmit}
                    >
                        <Paper className={classes.searchContainer}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel>Search for a movie, tv show series, person</InputLabel>
                                <FilledInput
                                    value={searchQuery}
                                    disableUnderline
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    classes={{ root: classes.searchInput }}
                                />
                            </FormControl>
                            <IconButton
                                type="submit"
                                className={classes.seachBtn}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </form>
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
                                        key={m.id}
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
                                        key={m.id}
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
                                        key={m.id}
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
                                        key={m.id}
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
    );
};

export default withRouter(Home);
