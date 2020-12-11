import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';
import { parse as QSParse } from 'query-string';
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

interface MatchParams {
    id: string;
}

interface MovieProps extends IStateToProps, IDispatchToProps, RouteComponentProps<MatchParams> {
    // selectedSort: string;
    // selectedGenres: string[];
    // releaseStartDate: any;
    // releaseEndDate: any;
}

const MovieCards: React.FC<MovieProps> = ({
    // selectedSort,
    // selectedGenres,
    // releaseStartDate,
    // releaseEndDate,
    catalogTVShows,
    loaders,
    getCatalogTVShows,
    history,
    location,
    match
}) => {
    const classes = useStyles();
    const { tvShows = [], total_pages, page } = catalogTVShows;
    const { isCatalogLoading } = loaders;

    const { id: tvShowCategory } = match.params;

    const currentPage: number = ((QSParse(location.search).page as unknown) as number) || 1;
    // const currectQueries: number = ((QSParse(location.search).page as unknown) as number) || 1;

    // console.log(currentPage, typeof currentPage);

    const paginationPages = (total_pages as unknown) as number;

    const handlePaginationChange = (page: number) => {
        // history.push({
        //     pathname: `/tv-show/${tvShowCategory}`,
        //     search: `?page=${page}`,
        //     state: { ...location.state }
        // });
        // console.log(`/tv-show/on-the-air?page=${page}`);
        // return <Redirect to={`/tv-show/on-the-air?page=${page}`} />;
    };

    // useEffect(() => {
    //     const startDate = releaseStartDate ? moment(releaseStartDate).format('YYYY-MM-DD') : '';
    //     const endDate = releaseEndDate ? moment(releaseEndDate).format('YYYY-MM-DD') : '';

    //     getCatalogTVShows({
    //         sort_by: selectedSort,
    //         with_genres: selectedGenres.join(','),
    //         'air_date.gte': startDate,
    //         'air_date.lte': endDate,
    //         page: currentPage
    //     });
    // }, [currentPage]);

    return (
        <>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {!isCatalogLoading ? (
                    tvShows.length ? (
                        tvShows.map((tvShow) => {
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
                    ) : (
                        <h1>No data</h1>
                    )
                ) : (
                    [...Array(12)].map(() => <CardSkeleton />)
                )}

                {/* fillers */}
                {[...Array(4)].map(() => (
                    <CardFiller />
                ))}
            </Box>

            {paginationPages > 1 && (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Pagination
                        count={paginationPages}
                        page={Number(currentPage)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieCards));