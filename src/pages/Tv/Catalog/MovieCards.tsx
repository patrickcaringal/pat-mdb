import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

import { actions, interfaces, types } from '../../../ducks';

import Card, { CardSkeleton, CardFiller } from './Card';

const useStyles = makeStyles({});

interface IStateToProps {
    catalogTVShows: interfaces.ITVShowCatalog;
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getCatalogTVShows: (
        queries: interfaces.IGetCatalogTVShowsPayload
    ) => interfaces.IGetCatalogTVShows;
}

interface MovieProps extends IStateToProps, IDispatchToProps {
    selectedSort: string;
    selectedGenres: string[];
    releaseStartDate: any;
    releaseEndDate: any;
}

const MovieCards: React.FC<MovieProps> = ({
    selectedSort,
    selectedGenres,
    releaseStartDate,
    releaseEndDate,
    catalogTVShows,
    loaders,
    getCatalogTVShows
}) => {
    const classes = useStyles();
    const { tvShows = [], total_pages, page } = catalogTVShows;
    const { isCatalogLoading } = loaders;

    const paginationPages = (total_pages as unknown) as number;

    const handlePaginationChange = (page: number) => {
        const startDate = releaseStartDate ? moment(releaseStartDate).format('YYYY-MM-DD') : '';
        const endDate = releaseEndDate ? moment(releaseEndDate).format('YYYY-MM-DD') : '';

        getCatalogTVShows({
            sort_by: selectedSort,
            with_genres: selectedGenres.join(','),
            'air_date.gte': startDate,
            'air_date.lte': endDate,
            page
        });
    };

    return (
        <>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {!isCatalogLoading
                    ? tvShows.map((tvShow) => {
                          const {
                              id,
                              poster: image,
                              title,
                              genres: subtitle,
                              release_date
                          } = tvShow;

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

            {paginationPages > 1 && (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Pagination
                        count={paginationPages}
                        page={(page as unknown) as number}
                        variant="outlined"
                        shape="rounded"
                        size="large"
                        disabled={isCatalogLoading}
                        onChange={(event: object, page: number) => {
                            window.scrollTo(0, 0);
                            handlePaginationChange(page);
                        }}
                    />
                </Box>
            )}
        </>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    catalogTVShows: state.catalogTVShows,
    loaders: state.loaders
});

const mapDispatchToProps = {
    getCatalogTVShows: actions.getCatalogTVShows
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCards);
