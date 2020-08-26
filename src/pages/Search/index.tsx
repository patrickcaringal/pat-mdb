import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752
    },
    demo: {
        backgroundColor: theme.palette.background.paper
        // backgroundColor: 'red'
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    }
}));

interface SearchProps extends RouteComponentProps {}

const SearchPage: React.FC<SearchProps> = (props) => {
    const classes = useStyles();

    // console.log(QSParse(props.location.search));
    // return <h1>{QSParse(props.location.search).query}</h1>;

    return (
        <Box display="flex" p={3}>
            <Container disableGutters maxWidth="lg">
                <Grid container>
                    <Grid item xs={2}>
                        <div className={classes.demo}>
                            <Typography variant="h5" className={classes.title}>
                                Search result
                            </Typography>
                            <List disablePadding>
                                <ListItem>
                                    <ListItemText primary="Movies" />
                                    <ListItemSecondaryAction>
                                        <Typography>22</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="TV Shows" />
                                    <ListItemSecondaryAction>
                                        <Typography>0</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="People" />
                                    <ListItemSecondaryAction>
                                        <Typography>3</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={9}></Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default withRouter(SearchPage);
