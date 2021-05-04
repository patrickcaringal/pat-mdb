import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const Banner: React.FC<IOwnProps> = ({}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data: popularMediaList, fetching: loading } = useSelector(
        selectors.popularMediaListSelector
    );

    useEffect(() => {
        dispatch(actions.getPopularMediaList({ media: 'movie' }));
    }, []);

    const slides: number[] = _.range(Math.ceil(popularMediaList.length / 5));

    return (
        <Box className={classes.bannerGrid}>
            <Typography className={classes.title} variant="h3" gutterBottom>
                <b>Popular</b> Movies & TV shows
            </Typography>

            {loading && <h2>Loading</h2>}

            <Slider {...sliderSettings}>
                {slides.map((slideIndex) => {
                    const medias: number[] = _.range(slideIndex * 5, slideIndex * 5 + 5);

                    return (
                        <div>
                            <div className={classes.cardCont}>
                                {medias.map((mediaIndex) => {
                                    const { poster, title } = popularMediaList[mediaIndex];

                                    return (
                                        <Card className={classes.root} raised>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={poster}
                                                    title={title}
                                                />
                                            </CardActionArea>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </Box>
    );
};

export default withRouter(Banner);
