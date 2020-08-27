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

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    demo: {
        backgroundColor: theme.palette.background.paper
        // backgroundColor: 'red'
    },
    root: {
        display: 'flex'
    },
    cover: {
        width: 151,
        height: '225px'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        background: 'khaki',
        justifyContent: 'space-between'

        // alignItems: 'center',
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
                        <Box
                            display="flex"
                            flexDirection="column"
                            style={{
                                background: '#fff',
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: '8px'
                            }}
                        >
                            {/*  style={{ background: 'salmon' }} */}
                            <Box style={{ padding: '8px 16px' }}>
                                <Typography variant="h6">Search result</Typography>
                            </Box>
                            {/* style={{ background: 'khaki' }} */}
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
                        </Box>
                    </Grid>

                    {/* results */}
                    <Grid item xs={9}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            ml={3}
                            style={{ border: '1px solid gray' }}
                        >
                            <Card className={classes.root}>
                                <CardMedia
                                    className={classes.cover}
                                    image="https://via.placeholder.com/150x225/767c77/fabea7"
                                    title="Live from space album cover"
                                />
                                <CardContent className={classes.content}>
                                    <Typography variant="h5">Live From Space</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default withRouter(SearchPage);
