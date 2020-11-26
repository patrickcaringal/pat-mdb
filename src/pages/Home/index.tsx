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

import { actions, interfaces, types } from '../../ducks';

import CardList from './CardList';
import Toggle from './Toggle';

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
    popularMedias: interfaces.IMedia[];
    trendingMedias: interfaces.IMedia[];
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getPopularMedias: (media: types.media) => interfaces.IGetPopularMedias;
    getTrendingMedias: (media: types.media) => interfaces.IGetTrendingMedias;
}

interface HomeProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const Home: React.FC<HomeProps> = ({
    loaders,
    popularMedias,
    trendingMedias,
    getPopularMedias,
    getTrendingMedias,
    history
}) => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [popularMediaType, setPopularMediaType] = useState('movie');
    const [trendingMediaType, setTrendingMediaType] = useState('movie');

    const { isPopularLoading, isTrendingLoading } = loaders;

    const toggleButtons = [
        { label: 'Movies', value: 'movie' },
        { label: 'TV shows', value: 'tv' }
    ];

    const mapToCardData = (data: interfaces.IMedia[]) => {
        return data.map((i: interfaces.IMedia) => {
            const { id, poster: image, title, genres: subtitle } = i;
            return {
                id,
                image,
                title,
                subtitle: subtitle.join(', ')
            };
        });
    };

    useEffect(() => {
        getTrendingMedias(trendingMediaType as types.media);
    }, [trendingMediaType, getTrendingMedias]);

    useEffect(() => {
        getPopularMedias(popularMediaType as types.media);
    }, [popularMediaType, getPopularMedias]);

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
            <CardList
                header={
                    <>
                        <Typography variant="h5" style={{ fontWeight: 600, marginRight: 16 }}>
                            Popular
                        </Typography>
                        <Toggle
                            buttons={toggleButtons}
                            selected={popularMediaType}
                            onToggleChange={(value: string) => {
                                setPopularMediaType(value);
                            }}
                        />
                    </>
                }
                data={mapToCardData(popularMedias)}
                loading={isPopularLoading}
                onCardClick={handleCardClick}
            />

            {/* Trending */}
            <CardList
                header={
                    <>
                        <Typography variant="h5" style={{ fontWeight: 600, marginRight: 16 }}>
                            Trending
                        </Typography>
                        <Toggle
                            buttons={toggleButtons}
                            selected={trendingMediaType}
                            onToggleChange={(value: string) => {
                                setTrendingMediaType(value);
                            }}
                        />
                    </>
                }
                data={mapToCardData(trendingMedias)}
                loading={isTrendingLoading}
                onCardClick={handleCardClick}
            />
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => {
    return {
        popularMedias: state.popularMedias,
        trendingMedias: state.trendingMedias,
        loaders: state.loaders
    };
};

const mapDispatchToProps = {
    getPopularMedias: actions.getPopularMedias,
    getTrendingMedias: actions.getTrendingMedias
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
