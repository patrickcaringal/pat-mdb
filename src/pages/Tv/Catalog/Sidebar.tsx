import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import KeywordsAutocomplete from './KeywordsAutocomplete';

const sortOptions = {
    'popularity.desc': 'Popularity Descending',
    'popularity.asc': 'Popularity Ascending',
    'primary_release_date.desc': 'Release Date Descending',
    'primary_release_date.asc': 'Release Date Ascending',
    'original_title.asc': 'Title (A-Z)',
    'vote_average.desc': 'Title (Z-A)'
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

interface MatchParams {
    id: string;
}

interface CatalogProps extends RouteComponentProps<MatchParams> {}

const Catalog: React.FC<CatalogProps> = ({ match }) => {
    const [selectedSort, setSelectedSort] = useState<string>('popularity.desc');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [releaseStartDate, setReleaseStartDate] = useState<any>(null);
    const [releaseEndDate, setReleaseEndDate] = useState<any>(null);

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedSort(event.target.value as string);
    };

    const isGenreSelected = (genre: string) => selectedGenres.includes(genre);

    const handleGenreChipClick = (genre: string) => {
        if (!isGenreSelected(genre)) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        }
    };

    return (
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
                        value={selectedSort}
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
                        value={releaseStartDate}
                        onChange={setReleaseStartDate}
                        KeyboardButtonProps={{ 'aria-label': 'change date' }}
                        InputProps={{ disableUnderline: true }}
                        maxDate={releaseEndDate ? new Date(releaseEndDate) : new Date('2100-01-01')}
                    />
                    <KeyboardDatePicker
                        id="end-release-date"
                        inputVariant="filled"
                        margin="normal"
                        label="To"
                        format="MM/DD/yyyy"
                        value={releaseEndDate}
                        onChange={setReleaseEndDate}
                        KeyboardButtonProps={{ 'aria-label': 'change date' }}
                        InputProps={{ disableUnderline: true }}
                        minDate={
                            releaseStartDate ? new Date(releaseStartDate) : new Date('1900-01-01')
                        }
                    />
                </MuiPickersUtilsProvider>
            </Box>

            <Divider />
            <Box display="flex" flexDirection="column" p={2}>
                <KeywordsAutocomplete />
            </Box>
        </Box>
    );
};

export default withRouter(Catalog);
