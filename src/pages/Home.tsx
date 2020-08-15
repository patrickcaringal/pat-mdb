import React, { useState, useRef } from 'react';
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

import useIntersect from '../customhooks/intersectobserver';

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

    const parentEl = useRef<Element | null>(null);

    // const [ref, entry] = useIntersect(
    //     {
    //         root: parentEl.current,
    //         threshold: 1
    //         // rootMargin: '0px 150px 100px 0px'
    //     },
    //     (isIntersecting: boolean) => {
    //         console.log(isIntersecting);
    //     }
    // );

    const CheckIntersect = ({ i }: { i: Number }) => {
        // let isX = false;
        const [isShown, setIsShown] = useState(false);

        const [ref, entry] = useIntersect(
            {
                root: parentEl.current,
                threshold: 1
                // rootMargin: '0px 150px 100px 0px'
            },
            (isIntersecting: boolean) => {
                console.log(isIntersecting);
                setIsShown(isIntersecting);
            }
        );

        return (
            <Card
                style={{
                    minWidth: '150px',
                    background: 'transparent',
                    marginRight: '20px'
                }}
                elevation={0}
                square
                {...({ ref: ref } as any)}
            >
                <CardMedia
                    style={{
                        height: '225px'
                    }}
                    image={
                        isShown
                            ? 'https://via.placeholder.com/150x225/767c77/fabea7'
                            : 'https://via.placeholder.com/150x225'
                    }
                    title="Twice"
                />
                <CardContent style={{ padding: '8px 0 0' }}>
                    <Typography>
                        {/* Item {i} {`${isShown}`} */}
                        {isShown ? 'Loaded' : 'Not Loaded'}
                    </Typography>
                    {/* <Typography variant="caption">Action, Thriller</Typography> */}
                </CardContent>
            </Card>
        );
    };

    return (
        <React.Fragment>
            {/* style={{ background: 'khaki' }} */}
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
                {/* style={{ background: 'salmon' }} */}
                <Grid item xs={12}>
                    <Box display="flex" p={3}>
                        <Container disableGutters maxWidth="lg">
                            {/* bgcolor="primary.main" */}
                            <Box display="flex" py={1}>
                                {/* <Typography variant="h5">Popular</Typography> */}
                            </Box>

                            {/* bgcolor="secondary.main" */}
                            <Box
                                display="flex"
                                style={{ overflow: 'auto' }}
                                pt={1}
                                pb={3}
                                {...({ ref: parentEl } as any)}
                            >
                                {[...new Array(20)].map((i: Number, index: number) => (
                                    <CheckIntersect i={index} />
                                ))}
                            </Box>
                        </Container>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" mt={50} p={3} bgcolor="primary.main">
                        Load
                    </Box>
                </Grid>
                {/* <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
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
