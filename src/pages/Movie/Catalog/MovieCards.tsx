import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

import { actions, interfaces, types } from '../../../ducks';

import Card, { CardSkeleton, CardFiller } from './Card';

const useStyles = makeStyles({});

interface IStateToProps {
    catalogMovies: interfaces.IMediaCatalog;
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getCatalogMovies: (
        queries: interfaces.IGetCatalogMoviesPayload
    ) => interfaces.IGetCatalogMovies;
}

interface MovieProps extends IStateToProps, IDispatchToProps {}

const MovieCards: React.FC<MovieProps> = ({ catalogMovies, loaders }) => {
    const classes = useStyles();

    const { movies = [] } = catalogMovies;
    const { isCatalogLoading } = loaders;

    return (
        <>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {!isCatalogLoading
                    ? movies.map((movie) => {
                          const {
                              id,
                              poster: image,
                              title,
                              genres: subtitle,
                              release_date
                          } = movie;

                          return (
                              <Card
                                  key={id}
                                  image={image}
                                  title={title}
                                  subtitle={subtitle.join(', ')}
                                  // subtitle={`${moment(release_date).format('MMM DD, YYYY')}`}
                                  onClick={() => alert(`${id}`)}
                              />
                          );
                      })
                    : [...Array(12)].map(() => <CardSkeleton />)}

                {/* fillers */}
                {[...Array(4)].map(() => (
                    <CardFiller />
                ))}
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Pagination
                    count={10}
                    variant="outlined"
                    shape="rounded"
                    size="large"
                    onChange={(event: object, page: number) => {
                        console.log(page);
                    }}
                />
            </Box>
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    catalogMovies: state.catalogMovies,
    loaders: state.loaders
});

const mapDispatchToProps = {
    getCatalogMovies: actions.getCatalogMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCards);
