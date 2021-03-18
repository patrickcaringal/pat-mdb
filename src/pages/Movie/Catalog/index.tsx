import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { parse as QSParse } from 'query-string';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { actions, interfaces } from '../../../ducks';
import { convertStringChars } from '../../../utils/helpers';

import Sidebar from './Sidebar';
import MovieCards from './MovieCards';

const genresList = {
    '12': 'Adventure',
    '14': 'Fantasy',
    '16': 'Animation',
    '18': 'Drama',
    '27': 'Horror',
    '28': 'Action',
    '35': 'Comedy',
    '36': 'History',
    '37': 'Western',
    '53': 'Thriller',
    '80': 'Crime',
    '99': 'Documentary',
    '878': 'Science Fiction',
    '9648': 'Mystery',
    '10402': 'Music',
    '10749': 'Romance',
    '10751': 'Family',
    '10752': 'War',
    '10770': 'TV Movie'
};

interface IStateToProps {}

interface IDispatchToProps {
    getCatalogMovies: (
        queries: interfaces.IGetCatalogMoviesPayload
    ) => interfaces.IGetCatalogMovies;
}

interface IMatchParams {
    id: string;
}

interface IOwnProps extends IStateToProps, IDispatchToProps, RouteComponentProps<IMatchParams> {}

const Catalog: React.FC<IOwnProps> = ({ getCatalogMovies, location, match }) => {
    const renders = React.useRef(0);

    const { id: movieCategory } = match.params;
    const currentQuery = location.search;

    // url query (sidebar & pagination) changes
    useEffect(() => {
        const {
            sort = 'popularity.desc',
            genres: genres_word = '',
            from = null,
            to = null,
            page = 1
        } = QSParse(currentQuery);

        const genres_id = (genres_word as string)
            .split(',')
            .filter((i) => i)
            .map((i) => {
                const [genreId] = Object.entries(genresList).find((g) => g[1] === i)!;
                return genreId;
            });

        const payload = {
            sort_by: sort,
            with_genres: genres_id.join(','),
            'primary_release_date.gte': from,
            'primary_release_date.lte': to,
            page
        } as interfaces.IGetCatalogMoviesPayload;

        getCatalogMovies(payload);
    }, [currentQuery, getCatalogMovies]);

    return (
        <Box display="flex" mx={4} my={3}>
            <Container disableGutters maxWidth="lg">
                <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginBottom: 16, textTransform: 'capitalize' }}
                >
                    {convertStringChars(movieCategory, '-', ' ')}
                </Typography>

                <Grid container>
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={9}>
                        <MovieCards />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    getCatalogMovies: actions.getCatalogMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Catalog));
