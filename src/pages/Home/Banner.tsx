import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import landingImg from '../../asset/img/landing-bg.jpg';

const useStyles = makeStyles((theme) => ({
    bannerGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        height: 660,
        background: `linear-gradient(rgba(31, 36, 33, 0.95), rgba(73, 160, 120, 0.85)), url(${landingImg}) repeat`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
    },
    bannerContent: {},
    title: {
        lineHeight: 'initial',
        color: '#DCE1DE',
        alignSelf: 'flex-start',
        marginBottom: 50
    },
    cardCont: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -30,
        marginBottom: 60
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    root: {
        width: 232,
        marginLeft: 30
    },
    media: {
        height: 343
    }
    // bannerHeader: { color: '#fff', fontWeight: 700 },
    // bannerSubheader: { color: '#fff', fontWeight: 600 },
    // searchForm: {
    //     width: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center'
    // },
    // searchContainer: {
    //     display: 'flex',
    //     background: 'white',
    //     width: '65%',
    //     paddingLeft: '15px',
    //     borderRadius: '30px'
    // },
    // searchInput: {
    //     background: 'transparent',
    //     '&:hover': { background: 'transparent' },
    //     '&.Mui-focused': { background: 'transparent' }
    // },
    // seachBtn: {
    //     width: '75px',
    //     '&:hover': { background: 'transparent' }
    // }
}));

interface IOwnProps extends RouteComponentProps {}

const Banner: React.FC<IOwnProps> = ({ history }) => {
    // const renders = React.useRef(0);

    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchQuery) return;

        history.push({
            pathname: '/search',
            search: `?query=${searchQuery}`
        });
    };

    return (
        <Box className={classes.bannerGrid}>
            <Box className={classes.bannerContent}>
                <Typography className={classes.title} variant="h3" gutterBottom>
                    <b>Popular</b> Movies & TV shows
                </Typography>
                <Box className={classes.cardCont}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://www.themoviedb.org/t/p/w220_and_h330_face/6kbAMLteGO8yyewYau6bJ683sw7.jpg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://www.themoviedb.org/t/p/w220_and_h330_face/8yhtzsbBExY8mUct2GOk4LDDuGH.jpg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://www.themoviedb.org/t/p/w220_and_h330_face/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://www.themoviedb.org/t/p/w220_and_h330_face/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://www.themoviedb.org/t/p/w220_and_h330_face/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>

            {/* <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Typography variant="h3" component="h2" className={classes.bannerHeader}>
                    Discover lots of movies and TV series.
                </Typography>
                <Typography variant="h4" className={classes.bannerSubheader}>
                    Keep track of your favorite shows.
                </Typography>
            </Box>

            <form
                noValidate
                autoComplete="off"
                className={classes.searchForm}
                onSubmit={handleSearchSubmit}
            >
                <Paper className={classes.searchContainer}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel>Search for a movie, tv show series, person</InputLabel>
                        <FilledInput
                            value={searchQuery}
                            disableUnderline
                            onChange={(e) => setSearchQuery(e.target.value)}
                            classes={{ root: classes.searchInput }}
                        />
                    </FormControl>
                    <IconButton type="submit" className={classes.seachBtn} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </form> */}
        </Box>
    );
};

export default withRouter(Banner);
