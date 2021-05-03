import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { actions, selectors } from '../../store/media.slice';

import landingImg from '../../asset/img/landing-bg.jpg';

const useStyles = makeStyles((theme) => ({
    bannerGrid: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',

        height: 660,
        background: `linear-gradient(rgba(31, 36, 33, 0.95), rgba(73, 160, 120, 0.85)), url(${landingImg}) repeat`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        padding: '60px 100px',
        '& .slick-list': {
            marginLeft: 50,
            marginRight: 50
        },
        '& .slick-arrow:before': {
            fontSize: 40
        },
        '& .slick-next': {
            right: -5
        }
    },
    bannerContent: {},
    title: {
        lineHeight: 'initial',
        color: '#DCE1DE',
        alignSelf: 'flex-start',

        marginBottom: 40
    },
    cardCont: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -30,
        // marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center'
        // background: 'khaki'
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
    const dispatch = useDispatch();
    const popularMediaList = useSelector(selectors.popularMediaListSelector);
    const loading = useSelector(selectors.loaderSelector('popularMediaList'));

    useEffect(() => {
        dispatch(
            actions.getPopularMediaList({
                media: 'movie'
                // onSuccess() {
                //     alert('success');
                // },
                // onError() {
                //     alert('error');
                // }
            })
        );
    }, []);

    // console.log('LORD', popularMediaList);
    // console.log(loading);

    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Box className={classes.bannerGrid}>
            <Typography className={classes.title} variant="h3" gutterBottom>
                <b>Popular</b> Movies & TV shows
            </Typography>
            <Slider {...settings}>
                {[...Array(5)].map((i) => (
                    <div>
                        <div className={classes.cardCont}>
                            <Card className={classes.root} raised>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.themoviedb.org/t/p/w220_and_h330_face/6kbAMLteGO8yyewYau6bJ683sw7.jpg"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>

                            <Card className={classes.root} raised>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.themoviedb.org/t/p/w220_and_h330_face/8yhtzsbBExY8mUct2GOk4LDDuGH.jpg"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>
                            <Card className={classes.root} raised>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.themoviedb.org/t/p/w220_and_h330_face/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>
                            <Card className={classes.root} raised>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.themoviedb.org/t/p/w220_and_h330_face/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>
                            <Card className={classes.root} raised>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.themoviedb.org/t/p/w220_and_h330_face/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>
                        </div>
                    </div>
                ))}
            </Slider>
        </Box>
    );
};

export default withRouter(Banner);
