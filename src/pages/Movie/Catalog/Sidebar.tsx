import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { parse as QSParse } from 'query-string';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import {
    Sidebar as FilterSidebar,
    SidebarHeader,
    SidebarDropdown,
    SidebarChips,
    SidebarChip,
    SidebarDateRangePicker
} from '../../../components/Sidebar';

import { interfaces } from '../../../ducks';
import { getQueryString } from '../../../utils/http';

// import KeywordsAutocomplete from './KeywordsAutocomplete';

const sortOptions = {
    'popularity.desc': 'Popularity Descending',
    'popularity.asc': 'Popularity Ascending',
    'primary_release_date.desc': 'Release Date Descending',
    'primary_release_date.asc': 'Release Date Ascending',
    'original_title.asc': 'Title (A-Z)',
    'original_title.desc': 'Title (Z-A)'
};

const genres = {
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
interface IStateToProps {
    // loaders: { [key: string]: boolean };
}

interface IDispatchToProps {}

interface IMatchParams {
    id: string;
}

interface ISidebarProps
    extends IStateToProps,
        IDispatchToProps,
        RouteComponentProps<IMatchParams> {}
// loaders,
const Sidebar: React.FC<ISidebarProps> = React.memo(
    ({ history, location }) => {
        const renders = React.useRef(0);
        const [selectedSort, setSelectedSort] = useState<string>('popularity.desc');
        // const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
        const [selectedGenres, setSelectedGenres] = useState<{ [key: string]: boolean }>({});
        const [releaseStartDate, setReleaseStartDate] = useState<any>(null);
        const [releaseEndDate, setReleaseEndDate] = useState<any>(null);
        const [sidebarQuery, setSidebarQuery] = useState<string>('');

        const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

        const currentQuery = location.search;
        // const { isCatalogLoading } = loaders;

        // const isGenreSelected = useMemo((genre: string) => selectedGenres.includes(genre), []);

        // const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        //     setSelectedSort(event.target.value as string);
        // };

        const handleSortChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
            setSelectedSort(event.target.value as string);
        }, []);

        const handleGenreChipClick = (genre: string) => {
            setSelectedGenres((prevState) => {
                if (prevState[genre]) {
                    delete prevState[genre];
                    return { ...prevState };
                }

                return {
                    ...prevState,
                    [genre]: true
                };
            });
        };

        const handleStartDateChange = useCallback((date: any) => {
            setReleaseStartDate(date);
        }, []);

        const handleEndDateChange = useCallback((date: any) => {
            setReleaseEndDate(date);
        }, []);

        const handleSearchClick = () => {
            window.scrollTo(0, 0);

            // check if query changed
            if (currentQuery === `?${sidebarQuery}`) return;

            setIsSearchClicked(true);

            history.push({
                pathname: location.pathname,
                search: sidebarQuery && `?${sidebarQuery}`
            });
        };

        // url query (sidebar & pagination) changes
        useEffect(() => {
            const { sort = 'popularity.desc', genres = '', from = null, to = null } = QSParse(
                currentQuery
            );

            setSelectedSort(sort as string);
            // setSelectedGenres((prevState) => {
            //     prevState.concat((genres as string).split(',').filter((i) => i));
            //     return prevState;
            // });
            setReleaseStartDate(from);
            setReleaseEndDate(to);
        }, [currentQuery]);

        // sidebar changes
        // useEffect(() => {
        //     const sort = selectedSort !== 'popularity.desc' ? selectedSort : '';
        //     const from = releaseStartDate ? moment(releaseStartDate).format('YYYY-MM-DD') : '';
        //     const to = releaseEndDate ? moment(releaseEndDate).format('YYYY-MM-DD') : '';
        //     const genres = selectedGenres.join(',');

        //     const query = getQueryString({ sort, genres, from, to });
        //     setSidebarQuery(query);
        // }, [selectedSort, selectedGenres, releaseStartDate, releaseEndDate]);

        // search req loading done
        // useEffect(() => {
        //     if (!isCatalogLoading) setIsSearchClicked(false);
        // }, [isCatalogLoading]);

        const chipRender = useCallback(
            (item) => {
                const [key, value] = item;

                return (
                    <SidebarChip
                        key={key}
                        label={value}
                        onClick={() => handleGenreChipClick(value)}
                        isSelected={selectedGenres[value]}
                    />
                );
            },
            [selectedGenres]
        );

        return (
            <>
                {renders.current++}

                <FilterSidebar>
                    <SidebarHeader title="Filter & Sort" />
                    <SidebarDropdown
                        label="Sort result by"
                        value={selectedSort}
                        onChange={handleSortChange}
                        options={sortOptions}
                    />
                    <SidebarChips label="Genres" options={genres} chipRender={chipRender} />
                    <SidebarDateRangePicker
                        label="Release date"
                        startDate={releaseStartDate}
                        onStartDateChange={handleStartDateChange}
                        endDate={releaseEndDate}
                        onEndDateChange={handleEndDateChange}
                    />
                </FilterSidebar>
            </>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.location.search === nextProps.location.search;
    }
);

const mapStateToProps = (state: interfaces.TState) => ({
    // loaders: state.loaders
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
