import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { actions, interfaces } from '../../../ducks';
import { convertUrlToWord } from '../../../utils/helpers';

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

interface IMovieProps extends IStateToProps, IDispatchToProps, RouteComponentProps<IMatchParams> {}

const Catalog: React.FC<IMovieProps> = ({ getCatalogTVShows, match }) => {
    const { id: tvShowCategory } = match.params;

    console.log(tvShowCategory);

    // parent copy of sidebar state, used by Movie component paginaation
    const [selectedSort, setSelectedSort] = useState<string>('popularity.desc');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [releaseStartDate, setReleaseStartDate] = useState<any>(null);
    const [releaseEndDate, setReleaseEndDate] = useState<any>(null);

    // modify sidebar state on movie category navigate
    useEffect(() => {
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

        getCatalogTVShows({
            'air_date.gte': releaseStartDateInitValue,
            'air_date.lte': releaseEndDateInitValue
        } as interfaces.IGetCatalogTVShowsPayload);
    }, [tvShowCategory]);

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
                            onSortChange={setSelectedSort}
                            onSelectedGenres={setSelectedGenres}
                            onReleaseStartDateChange={setReleaseStartDate}
                            onReleaseEndDateChange={setReleaseEndDate}
                        />
                    </Grid>

                    {/* Catalog */}
                    <Grid item xs={9}>
                        <MovieCards
                            selectedSort={selectedSort}
                            selectedGenres={selectedGenres}
                            releaseStartDate={releaseStartDate}
                            releaseEndDate={releaseEndDate}
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
