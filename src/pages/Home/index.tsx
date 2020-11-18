import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

import { actions, interfaces } from '../../ducks';

import Card from './Card';
import SkeletonCard from './SkeletonCard';
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

interface IStateToProps {
    popularMovies: interfaces.IMovie[];
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getPopularMovies: () => interfaces.TAction;
}

interface HomeProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const Home: React.FC<HomeProps> = ({ loaders, popularMovies, getPopularMovies, history }) => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { isPopularLoading } = loaders;

    useEffect(() => {
        getPopularMovies();
    }, [getPopularMovies]);

    // console.log(JSON.stringify(loaders, null, 4));

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchQuery) return;

        history.push({
            pathname: '/search',
            search: `?query=${searchQuery}`
        });
    };

    const handleCardClick = (id: string) => {
        history.push(`movie/${id}`);
    };

    return (
        <>
            {/* Banner */}
            <Box
                className={classes.bannerGrid}
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
                    onSubmit={handleSearchSubmit}
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
                        <IconButton type="submit" className={classes.seachBtn} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </form>
            </Box>

            {/* Popular */}
            <Box display="flex" p={3}>
                <Container disableGutters maxWidth="lg">
                    <Box display="flex" py={1}>
                        <Typography variant="h5" style={{ fontWeight: 600 }}>
                            Popular
                        </Typography>
                    </Box>

                    <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={2}>
                        {!isPopularLoading
                            ? popularMovies.map((m: interfaces.IMovie) => {
                                  const { id, poster, title, genres } = m;

                                  return (
                                      <Card
                                          key={id}
                                          image={poster}
                                          title={title}
                                          subtitle={genres.join(', ')}
                                          onClick={() => handleCardClick(`${id}`)}
                                      />
                                  );
                              })
                            : [...Array(10)].map(() => <SkeletonCard />)}
                    </Box>
                </Container>
            </Box>

            {/* Top Rated */}
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
                                    onClick={() => handleCardClick(`${m.id}`)}
                                />
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* Upcoming */}
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
                                    onClick={() => handleCardClick(`${m.id}`)}
                                />
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* Trending */}
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
                                    onClick={() => handleCardClick(`${m.id}`)}
                                />
                            );
                        })}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => {
    return {
        popularMovies: state.popularMovies,
        loaders: state.loaders
    };
};

const mapDispatchToProps = {
    getPopularMovies: actions.getPopularMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
