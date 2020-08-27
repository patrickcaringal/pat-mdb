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
    },
    root: {
        display: 'flex',
        marginBottom: '18px'
    },
    cover: {
        width: 94,
        height: 141
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'space-between'
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
                                borderRadius: '4px'
                            }}
                        >
                            <Box style={{ padding: '8px 16px' }}>
                                <Typography variant="h6">Search result</Typography>
                            </Box>
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
                        <Box display="flex" flexDirection="column" ml={3}>
                            {[...new Array(10)].map(() => (
                                <Card className={classes.root}>
                                    <CardMedia
                                        className={classes.cover}
                                        image="https://via.placeholder.com/94x141/767c77/fabea7"
                                        title="Live from space album cover"
                                    />
                                    <CardContent
                                        className={classes.content}
                                        style={{ paddingBottom: 10, paddingTop: 10 }}
                                    >
                                        <Box>
                                            <Typography variant="h6" style={{ fontWeight: 600 }}>
                                                Movie title
                                            </Typography>
                                            <Typography color="textSecondary">
                                                July 10, 2020
                                            </Typography>
                                        </Box>
                                        <Typography
                                            style={{
                                                display: 'box',
                                                lineClamp: 1,
                                                boxOrient: 'vertical',
                                                textOverflow: 'ellipsis'
                                            }}
                                            className="line-clamp"
                                        >
                                            Lorem ipsum, dolor sit amet consectetur adipisicing
                                            elit. Amet quae quibusdam nam veniam laborum iusto
                                            magnam inventore voluptate officia voluptatibus! Sit,
                                            vel omnis enim ex sunt dolores officiis velit molestiae.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default withRouter(SearchPage);
