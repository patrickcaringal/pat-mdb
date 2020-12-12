import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

import { actions, interfaces, types } from '../../../ducks';
import { getQueryString } from '../../../utils/http';

import Card, { CardSkeleton, CardFiller } from './Card';

const useStyles = makeStyles({});

interface IStateToProps {
    catalogTVShows: interfaces.ITVShowCatalog;
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {}

interface MatchParams {
    id: string;
}

interface MovieProps extends IStateToProps, IDispatchToProps, RouteComponentProps<MatchParams> {}

const MovieCards: React.FC<MovieProps> = ({
    catalogTVShows,
    loaders,
    history,
    location,
    match
}) => {
    const classes = useStyles();

    const [selectedPage, setSelectedPage] = useState<number>(1);

    const { id: tvShowCategory } = match.params;
    const currentQuery = QSParse(location.search);

    const { tvShows = [], total_pages } = catalogTVShows;
    const { isCatalogLoading } = loaders;
    const paginationPages = (total_pages as unknown) as number;

    const handlePaginationChange = (page: number) => {
        const currentQueryObj = currentQuery;
        delete currentQueryObj.page;

        const query = getQueryString(currentQueryObj as { [key: string]: string });
        const newQuery = query ? `?${query}&page=${page}` : `?page=${page}`;

        history.push({
            pathname: location.pathname,
            search: newQuery
        });
    };

    useEffect(() => {
        const { page = 1 } = currentQuery;

        setSelectedPage(Number(page as number));
    }, [currentQuery.page]);

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
                        page={selectedPage}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieCards));
