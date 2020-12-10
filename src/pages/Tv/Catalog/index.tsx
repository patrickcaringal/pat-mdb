import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { parse as QSParse } from 'query-string';
import * as _ from 'lodash';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { actions, interfaces } from '../../../ducks';
import { convertUrlToWord } from '../../../utils/helpers';
import { useIsMount } from './isFirstRender';
import { usePrevious } from './usePrevious';

import Sidebar from './Sidebar';
import MovieCards from './MovieCards';

interface IStateToProps {}

interface IDispatchToProps {
    getCatalogTVShows: (
        queries: interfaces.IGetCatalogTVShowsPayload
    ) => interfaces.IGetCatalogTVShows;
}

interface IMatchParams {
    id: string;
}

interface IMovieProps
    extends IStateToProps,
        IDispatchToProps,
        RouteComponentProps<
            IMatchParams,
            {},
            {
                sort_by: string;
                with_genres: string[];
                'air_date.gte': any;
                'air_date.lte': any;
            }
        > {}

const Catalog: React.FC<IMovieProps> = ({ getCatalogTVShows, history, location, match }) => {
    const { id: tvShowCategory } = match.params;
    const isFirstRender = useIsMount();

    const currentPage: number = Number((QSParse(location.search).page as unknown) as number) || 1;

    // parent copy of sidebar state, used by Movie component paginaation
    const [selectedSort, setSelectedSort] = useState<string>('popularity.desc');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [releaseStartDate, setReleaseStartDate] = useState<any>(null);
    const [releaseEndDate, setReleaseEndDate] = useState<any>(null);

    const prevCurrentPage = usePrevious(currentPage);
    const prevTVShowCategory = usePrevious(tvShowCategory);
    const prevSidebarstate = usePrevious(location.state);

    // modify sidebar state on movie category navigate
    useEffect(() => {
        let payload = {} as interfaces.IGetCatalogTVShowsPayload;

        // console.log(location.state);

        if (prevTVShowCategory !== tvShowCategory) {
            let releaseStartDateInitValue = null;
            let releaseEndDateInitValue = null;

            if (tvShowCategory === 'on-the-air') {
                releaseStartDateInitValue = moment().format('YYYY-MM-DD');
                releaseEndDateInitValue = moment().format('YYYY-MM-DD');
            } else if (tvShowCategory === 'upcoming') {
                releaseStartDateInitValue = moment().add(1, 'days').format('YYYY-MM-DD');
                releaseEndDateInitValue = moment().add(1, 'months').format('YYYY-MM-DD');
            }

            // set to default
            setSelectedSort('popularity.desc');
            setSelectedGenres([]);
            // set to specific date defaults based on category
            setReleaseStartDate(releaseStartDateInitValue);
            setReleaseEndDate(releaseEndDateInitValue);

            payload = {
                sort_by: 'popularity.desc',
                with_genres: '',
                'air_date.gte': releaseStartDateInitValue,
                'air_date.lte': releaseEndDateInitValue,
                page: currentPage
            } as interfaces.IGetCatalogTVShowsPayload;

            console.log('render tvShowCategory');
        } else if (prevCurrentPage !== currentPage) {
            payload = {
                sort_by: selectedSort,
                with_genres: selectedGenres.join(','),
                'air_date.gte': releaseStartDate,
                'air_date.lte': releaseEndDate,
                page: currentPage
            } as interfaces.IGetCatalogTVShowsPayload;

            console.log('render currentPage');
        } else if (location.state && !_.isEqual(prevSidebarstate, location.state)) {
            console.log('render sidebar');

            setSelectedSort(location.state.sort_by);
            setSelectedGenres(location.state.with_genres);
            setReleaseStartDate(location.state['air_date.gte']);
            setReleaseEndDate(location.state['air_date.lte']);

            payload = {
                sort_by: location.state.sort_by,
                with_genres: location.state.with_genres.join(','),
                'air_date.gte': location.state['air_date.gte'],
                'air_date.lte': location.state['air_date.lte'],
                page: 1
            } as interfaces.IGetCatalogTVShowsPayload;
        }

        getCatalogTVShows(payload);
    }, [tvShowCategory, currentPage, location.state]);

    return (
        <Box display="flex" mx={4} my={3}>
            <Container disableGutters maxWidth="lg">
                <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginBottom: 16, textTransform: 'capitalize' }}
                >
                    {convertUrlToWord(tvShowCategory)}
                </Typography>

                <Grid container>
                    {/* Sort & Filter sidebar */}
                    <Grid item xs={3}>
                        <Sidebar
                            selectedSort={selectedSort}
                            selectedGenres={selectedGenres}
                            releaseStartDate={releaseStartDate}
                            releaseEndDate={releaseEndDate}
                            // onSortChange={setSelectedSort}
                            // onSelectedGenres={setSelectedGenres}
                            // onReleaseStartDateChange={setReleaseStartDate}
                            // onReleaseEndDateChange={setReleaseEndDate}
                        />
                    </Grid>

                    {/* Catalog */}
                    <Grid item xs={9}>
                        <MovieCards
                        // selectedSort={selectedSort}
                        // selectedGenres={selectedGenres}
                        // releaseStartDate={releaseStartDate}
                        // releaseEndDate={releaseEndDate}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    getCatalogTVShows: actions.getCatalogTVShows
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Catalog));
