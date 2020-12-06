import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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

import { actions, interfaces, types } from '../../../ducks';

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
    catalogMovies: interfaces.IMovieCatalog;
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getCatalogMovies: (
        queries: interfaces.IGetCatalogMoviesPayload
    ) => interfaces.IGetCatalogMovies;
}

interface IMatchParams {
    id: string;
}

interface ISidebarProps extends IStateToProps, IDispatchToProps, RouteComponentProps<IMatchParams> {
    selectedSort: string;
    selectedGenres: string[];
    releaseStartDate: any;
    releaseEndDate: any;
    onSortChange: React.Dispatch<React.SetStateAction<string>>;
    onSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
    onReleaseStartDateChange: React.Dispatch<any>;
    onReleaseEndDateChange: React.Dispatch<any>;
}

const Sidebar: React.FC<ISidebarProps> = ({
    selectedSort,
    selectedGenres,
    releaseStartDate,
    releaseEndDate,
    onSortChange,
    onSelectedGenres,
    onReleaseStartDateChange,
    onReleaseEndDateChange,
    catalogMovies,
    loaders,
    getCatalogMovies
}) => {
    const [UIselectedSort, setUISelectedSort] = useState<string>('popularity.desc');
    const [UIselectedGenres, setUISelectedGenres] = useState<string[]>([]);
    const [UIreleaseStartDate, setUIReleaseStartDate] = useState<any>(null);
    const [UIreleaseEndDate, setUIReleaseEndDate] = useState<any>(null);

    const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

    const { page } = catalogMovies;
    const { isCatalogLoading } = loaders;

    const isGenreSelected = (genre: string) => UIselectedGenres.includes(genre);

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUISelectedSort(event.target.value as string);
    };

    const handleGenreChipClick = (genre: string) => {
        const selected = !isGenreSelected(genre)
            ? [...UIselectedGenres, genre]
            : UIselectedGenres.filter((g) => g !== genre);

        setUISelectedGenres(selected);
    };

    const handleSearchClick = () => {
        setIsSearchClicked(true);

        const startDate = UIreleaseStartDate ? moment(UIreleaseStartDate).format('YYYY-MM-DD') : '';
        const endDate = UIreleaseEndDate ? moment(UIreleaseEndDate).format('YYYY-MM-DD') : '';
        const payload = {
            sort_by: UIselectedSort,
            with_genres: UIselectedGenres.join(','),
            'primary_release_date.gte': startDate,
            'primary_release_date.lte': endDate
        };

        getCatalogMovies(payload);

        // update parent state only if search is triggered
        onSortChange(UIselectedSort);
        onSelectedGenres(UIselectedGenres);
        onReleaseStartDateChange(UIreleaseStartDate);
        onReleaseEndDateChange(UIreleaseEndDate);
    };

    useEffect(() => {
        if (!isCatalogLoading) setIsSearchClicked(false);
    }, [isCatalogLoading]);

    // resets sidebar state to default state (navigating through categories)
    // resets sidebar state to parent's copy state (changed sidebar but navigated on pagination)
    useEffect(() => {
        setUISelectedSort(selectedSort);
        setUISelectedGenres(selectedGenres);
        setUIReleaseStartDate(releaseStartDate);
        setUIReleaseEndDate(releaseEndDate);
    }, [selectedSort, selectedGenres, releaseStartDate, releaseEndDate, page]);

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                bgcolor="#fff"
                boxShadow={1}
                borderRadius={4}
                border="1px solid rgba(0, 0, 0, 0.12)"
            >
                <Box display="flex" flexDirection="column" p={2}>
                    <Typography variant="h6">Filter & Sort</Typography>
                </Box>

                <Divider />

                <Box display="flex" flexDirection="column" p={2}>
                    <FormControl variant="filled">
                        <InputLabel id="sort-select">Sort result by</InputLabel>
                        <Select
                            labelId="sort-select"
                            id="demo-simple-select"
                            value={UIselectedSort}
                            onChange={handleSortChange}
                            disableUnderline
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left'
                                },
                                getContentAnchorEl: null
                            }}
                        >
                            {Object.entries(sortOptions).map(([key, value]) => (
                                <MenuItem value={key} key={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider />

                <Box display="flex" flexDirection="column" p={2}>
                    <Typography style={{ marginBottom: 8 }}>Genres</Typography>
                    <Box display="flex" flexWrap="wrap">
                        {Object.entries(genres).map(([key, value]) => (
                            <Chip
                                key={key}
                                label={value}
                                onClick={() => handleGenreChipClick(key)}
                                variant={isGenreSelected(key) ? 'default' : 'outlined'}
                                size="small"
                                style={{ margin: 4 }}
                            />
                        ))}
                    </Box>
                </Box>

                <Divider />

                <Box display="flex" flexDirection="column" p={2}>
                    <Typography>Release date</Typography>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            id="start-release-date"
                            inputVariant="filled"
                            margin="normal"
                            label="From"
                            format="MM/DD/yyyy"
                            value={UIreleaseStartDate}
                            onChange={setUIReleaseStartDate}
                            KeyboardButtonProps={{ 'aria-label': 'change date' }}
                            InputProps={{ disableUnderline: true }}
                            maxDate={
                                UIreleaseEndDate
                                    ? new Date(UIreleaseEndDate)
                                    : new Date('2100-01-01')
                            }
                        />
                        <KeyboardDatePicker
                            id="end-release-date"
                            inputVariant="filled"
                            margin="normal"
                            label="To"
                            format="MM/DD/yyyy"
                            value={UIreleaseEndDate}
                            onChange={setUIReleaseEndDate}
                            KeyboardButtonProps={{ 'aria-label': 'change date' }}
                            InputProps={{ disableUnderline: true }}
                            minDate={
                                UIreleaseStartDate
                                    ? new Date(UIreleaseStartDate)
                                    : new Date('1900-01-01')
                            }
                        />
                    </MuiPickersUtilsProvider>
                </Box>

                {/* <Divider />
                <Box display="flex" flexDirection="column" p={2}>
                    <KeywordsAutocomplete />
                </Box> */}

                <Divider />
            </Box>

            <Box display="flex" flexDirection="column" mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                    disabled={isCatalogLoading}
                >
                    {!isSearchClicked ? 'Search' : <CircularProgress size={20} thickness={5} />}
                </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
