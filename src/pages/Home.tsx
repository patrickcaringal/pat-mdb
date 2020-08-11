import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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

    return (
        <React.Fragment>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    style={{
                        minHeight: '300px',
                        height: 'calc(100vh / 2.5)',
                        maxHeight: '360px'
                    }}
                >
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        // bgcolor="primary.main"
                    >
                        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                            <Typography variant="h3" component="h1">
                                Discover lots of movies and TV series.
                            </Typography>
                            <Typography variant="h4">Keep track of your favorite shows.</Typography>
                        </Box>
                        {/*  bgcolor="primary.main" */}
                        <Box display="flex" width="70%">
                            <FormControl variant="filled" fullWidth>
                                <InputLabel style={{ paddingLeft: '20px' }}>
                                    Search for a movie, tv show series, person
                                </InputLabel>
                                <FilledInput
                                    value=""
                                    disableUnderline
                                    // onChange={handleChange}
                                    style={{
                                        background: 'white',
                                        borderRadius: '30px',
                                        paddingLeft: '16px'
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" p={3}>
                        <Container disableGutters maxWidth="lg">
                            {/* bgcolor="primary.main" */}
                            <Box display="flex" py={1}>
                                <Typography variant="h5">Popular</Typography>
                            </Box>

                            {/* bgcolor="secondary.main" */}
                            <Box display="flex" style={{ overflow: 'auto' }} pt={1} pb={3}>
                                {[...new Array(10)].map((i) => (
                                    <Card
                                        style={{
                                            minWidth: '150px',
                                            // height: '300px',
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
                                            <Typography>Item</Typography>
                                            <Typography variant="caption">
                                                Action, Thriller
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
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
