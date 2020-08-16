import React, { useState, useRef } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Card from './Card';

import Typography from '@material-ui/core/Typography';
import useIntersect from '../../customhooks/useIntersect';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1
//     },
//     paper: {
//         background: 'khaki',
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary
//     }
// }));

const Home: React.FC = (props) => {
    // const classes = useStyles();
    const [isShown, setIsShown] = useState(false);

    const refPopularBox = useRef<any>(null);

    const [ref] = useIntersect(
        {
            threshold: 0
        },
        (isIntersecting: boolean) => {
            setIsShown(isIntersecting);
        }
    );

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
                            {/* <Typography variant="h4">Keep track of your favorite shows.</Typography> */}
                            <Typography variant="h4">
                                {`${!!window.IntersectionObserver}`}
                            </Typography>
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
                            <Box display="flex" py={1}>
                                <Typography variant="h5">Popular</Typography>
                            </Box>

                            <Box
                                display="flex"
                                style={{ overflow: 'auto' }}
                                pt={1}
                                pb={3}
                                {...({ ref: refPopularBox } as any)}
                            >
                                {[...new Array(20)].map((i: Number, index: number) => (
                                    <Card />
                                ))}
                            </Box>
                        </Container>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        mt={50}
                        p={3}
                        style={{ background: isShown ? 'khaki' : 'salmon' }}
                        {...({ ref: ref } as any)}
                    >
                        Load
                    </Box>
                </Grid>
                {/* <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid> */}
            </Grid>
        </React.Fragment>
    );
};

export default Home;
