import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        background: 'khaki',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

const Home: React.FC = (props) => {
    const classes = useStyles();
    // spacing={3}
    return (
        <React.Fragment>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    style={{
                        background: 'salmon',
                        minHeight: '300px',
                        height: 'calc(100vh / 2.5)',
                        maxHeight: '360px'
                    }}
                >
                    <Box
                        style={{
                            height: '100%'
                        }}
                        display="flex"
                        alignItems="center"
                    >
                        Discover millions of movies and TV series and Keep track of your favorite
                        shows.
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        minHeight: '300px' // temp
                        // height: 'calc(100vh / 2.5)',
                        // maxHeight: '360px'
                    }}
                >
                    <Box
                        style={{
                            height: '100%'
                        }}
                        display="flex"
                        p={3}
                    >
                        <Container disableGutters maxWidth="lg">
                            <Typography variant="h5" gutterBottom>
                                Popular
                            </Typography>
                            <Box display="flex">
                                <Card
                                    style={{
                                        minWidth: '150px',
                                        height: '300px',
                                        background: 'transparent',
                                        marginRight: '20px'
                                    }}
                                    elevation={0}
                                    square
                                >
                                    <CardMedia
                                        style={{
                                            height: '225px'
                                        }}
                                        image="https://via.placeholder.com/150x225"
                                        title="Twice"
                                    />
                                    <CardContent style={{ padding: '8px 0 0' }}>
                                        <Typography>Red Velvet</Typography>
                                        <Typography variant="caption">Action, Thriller</Typography>
                                    </CardContent>
                                </Card>

                                <Card
                                    style={{
                                        minWidth: '150px',
                                        height: '300px',
                                        background: 'transparent',
                                        marginRight: '20px'
                                    }}
                                    elevation={0}
                                    square
                                >
                                    <CardMedia
                                        style={{
                                            height: '225px'
                                        }}
                                        image="https://via.placeholder.com/150x225"
                                        title="Twice"
                                    />
                                    <CardContent style={{ padding: '8px 0 0' }}>
                                        <Typography>Twice</Typography>
                                        <Typography variant="caption">Action, Thriller</Typography>
                                    </CardContent>
                                </Card>

                                <Card
                                    style={{
                                        minWidth: '150px',
                                        height: '300px',
                                        background: 'transparent',
                                        marginRight: '20px'
                                    }}
                                    elevation={0}
                                    square
                                >
                                    <CardMedia
                                        style={{
                                            height: '225px'
                                        }}
                                        image="https://via.placeholder.com/150x225"
                                        title="Twice"
                                    />
                                    <CardContent style={{ padding: '8px 0 0' }}>
                                        <Typography>Blackpink</Typography>
                                        <Typography variant="caption">Action, Thriller</Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Container>
                    </Box>
                </Grid>
                {/* <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid> */}
            </Grid>
            {/* <Box>
                {[...new Array(50)]
                    .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                    )
                    .join('\n')}
            </Box> */}
        </React.Fragment>
    );
};

export default Home;
