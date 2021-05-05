import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardMedia, CardActionArea, Typography } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { actions, selectors } from '../../store/media.slice';

import landingImg from '../../asset/img/landing-bg.jpg';

const useStyles = makeStyles((theme) => ({
    bannerGrid: {
        height: 660,
        background: `linear-gradient(rgba(31, 36, 33, 0.95), rgba(38, 102, 69, 0.9)), url(${landingImg}) repeat`,
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
        },
        '& .slick-dots': {
            bottom: -50,
            '& .slick-active button:before': {
                color: '#DCE1DE'
            }
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
        // alignItems: 'center',
        justifyContent: 'center'
        // background: 'khaki'
    },
    root: {
        width: 210,
        marginLeft: 30,
        zIndex: 9,
        '& .card__rate': {
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            position: 'absolute',
            zIndex: 9,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 36,
            height: 36,
            top: 15,
            left: 15,
            backgroundColor: 'rgba(26,25,31,0.6)',
            border: '3px solid transparent',
            borderRadius: '50%',
            borderColor: '#49A078'
        }
    },
    media: {
        height: 311
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
                                    const { poster, title, release_date } = popularMediaList[
                                        mediaIndex
                                    ];

                                    return (
                                        <Box className={classes.root}>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={poster}
                                                        title={title}
                                                    />
                                                    <span className="card__rate card__rate--green">
                                                        8.4
                                                    </span>
                                                </CardActionArea>
                                            </Card>
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    color: '#DCE1DE',
                                                    fontWeight: 600,
                                                    margin: '8px 8px 0 8px'
                                                }}
                                                noWrap
                                            >
                                                {title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                style={{
                                                    color: '#DCE1DE',
                                                    margin: '0 8px'
                                                }}
                                            >
                                                {new Date(release_date).getFullYear()}
                                            </Typography>
                                        </Box>
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
