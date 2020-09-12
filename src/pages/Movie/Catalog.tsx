import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Divider from '@material-ui/core/Divider';

import Chip from '@material-ui/core/Chip';

import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import KeywordsAutocomplete from './KeywordsAutocomplete';

const Catalog: React.FC<{}> = ({}) => {
    const [selectedDate, setSelectedDate] = useState<any>(null);

    return (
        <Box display="flex" mt={3}>
            <Container disableGutters maxWidth="lg">
                <Grid container>
                    {/* Sort & Filter sidebar */}
                    <Grid item xs={2}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            bgcolor="#fff"
                            boxShadow={1}
                            borderRadius={4}
                            border="1px solid rgba(0, 0, 0, 0.12)"
                        >
                            {/* p={2} */}
                            <Box display="flex" flexDirection="column" px={2} py={1}>
                                <Typography variant="h6">Filter & Sort</Typography>
                            </Box>

                            <Divider />
                            <Box display="flex" flexDirection="column" px={2} py={1}>
                                <FormControl variant="filled">
                                    <InputLabel id="sort-select">Sort result by</InputLabel>
                                    <Select
                                        labelId="sort-select"
                                        id="demo-simple-select"
                                        value="10"
                                        onChange={() => {}}
                                        disableUnderline
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Divider />
                            <Box display="flex" flexDirection="column" px={2} py={1}>
                                <Typography style={{ marginBottom: 8 }}>Genres</Typography>
                                <Box display="flex" flexWrap="wrap">
                                    <Chip label="Action" onClick={() => {}} style={{ margin: 4 }} />
                                    <Chip
                                        label="Adventure"
                                        onClick={() => {}}
                                        style={{ margin: 4 }}
                                    />
                                    <Chip
                                        label="Romance"
                                        onClick={() => {}}
                                        style={{ margin: 4 }}
                                    />
                                    <Chip label="Horror" onClick={() => {}} style={{ margin: 4 }} />
                                    <Chip label="SciFi" onClick={() => {}} style={{ margin: 4 }} />
                                    <Chip
                                        label="Thriller"
                                        onClick={() => {}}
                                        style={{ margin: 4 }}
                                    />
                                </Box>
                            </Box>

                            <Divider />
                            <Box display="flex" flexDirection="column" px={2} py={1}>
                                <Typography>Release date</Typography>

                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        id="start-release-date"
                                        inputVariant="filled"
                                        margin="normal"
                                        label="From"
                                        format="MM/DD/yyyy"
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        KeyboardButtonProps={{ 'aria-label': 'change date' }}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        id="end-release-date"
                                        inputVariant="filled"
                                        margin="normal"
                                        label="To"
                                        format="MM/DD/yyyy"
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        KeyboardButtonProps={{ 'aria-label': 'change date' }}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>

                            <Divider />
                            <Box display="flex" flexDirection="column" px={2} py={1}>
                                <KeywordsAutocomplete />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Catalog */}
                    <Grid item xs={10}></Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Catalog;
