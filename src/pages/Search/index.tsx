import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';
// import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Pagination from '@material-ui/lab/Pagination';

import MovieCard from './MovieCard';
import PeopleCard from './PeopleCard';

// const useStyles = makeStyles({});

interface SearchProps extends RouteComponentProps {}

enum MediaType {
    Movie = 'Movie',
    TVShow = 'TVShow',
    People = 'People'
}

const SearchPage: React.FC<SearchProps> = (props) => {
    // const classes = useStyles();

    const searchTxt: string = QSParse(props.location.search).query as string;

    const [searchQuery, setSearchQuery] = useState<string>(searchTxt);
    const [mediaType, setMediaType] = useState<MediaType>(MediaType.Movie);

    return (
        <Box display="flex" mt={3}>
            <Container disableGutters maxWidth="lg">
                <Grid container>
                    <Grid item xs={2}>
                        <Box mb={3} display="flex" bgcolor="#fff" boxShadow={1} borderRadius={4}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel>Search</InputLabel>
                                <FilledInput
                                    value={searchQuery}
                                    disableUnderline
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ background: 'none' }}
                                />
                            </FormControl>
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            bgcolor="#fff"
                            boxShadow={1}
                            borderRadius={4}
                            border="1px solid rgba(0, 0, 0, 0.12)"
                        >
                            <Box px={2} py={1}>
                                <Typography variant="h6">Search result</Typography>
                            </Box>
                            <List disablePadding>
                                <ListItem
                                    button
                                    selected={mediaType === MediaType.Movie}
                                    onClick={() => {
                                        setMediaType(MediaType.Movie);
                                    }}
                                >
                                    <ListItemText primary="Movies" />
                                    <ListItemSecondaryAction>
                                        <Typography>22</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={mediaType === MediaType.TVShow}
                                    onClick={() => {
                                        setMediaType(MediaType.TVShow);
                                    }}
                                >
                                    <ListItemText primary="TV Shows" />
                                    <ListItemSecondaryAction>
                                        <Typography>0</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={mediaType === MediaType.TVShow}
                                    onClick={() => {
                                        setMediaType(MediaType.People);
                                    }}
                                >
                                    <ListItemText primary="People" />
                                    <ListItemSecondaryAction>
                                        <Typography>3</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>

                    {/* results */}
                    <Grid item xs={10}>
                        <Box display="flex" flexDirection="column" ml={3}>
                            {[...new Array(20)].map(() => (
                                <MovieCard
                                    image="https://via.placeholder.com/94x141/767c77/fabea7"
                                    title="Movie title"
                                    subtitle="July 10, 2020"
                                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet quae quibusdam nam veniam laborum iusto magnam inventore voluptate officia voluptatibus! Sit, vel omnis enim ex sunt dolores officiis velit molestiae."
                                />
                                // <PeopleCard
                                //     image="https://via.placeholder.com/70x70/767c77/fabea7"
                                //     name="Tom Holland"
                                //     details="Acting • Avengers: Infinity War, Captain America: Civil War, Spider-Man: Homecoming"
                                // />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={2} />
                    <Grid item xs={10}>
                        <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
                            <Pagination count={10} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default withRouter(SearchPage);
