import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    backdrop: {
        background:
            'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg) no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'right -200px top',
        color: '#fff'
    },
    backdropOverlay: {
        background:
            'linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)'
    },
    poster: {
        width: 300,
        height: 450
    }
});

interface MatchParams {
    id: string;
}

interface MovieDetailProps extends RouteComponentProps<MatchParams> {}

const MoivieDetail: React.FC<MovieDetailProps> = ({ match }) => {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.backdrop}>
            <Box display="flex" flex="1" className={classes.backdropOverlay}>
                <Container disableGutters maxWidth="lg">
                    <Box display="flex" flexDirection="row" p={4}>
                        {/* style={{ height: 570 + 46 }} */}
                        <Box display="flex" flexDirection="column">
                            <img
                                src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/MoEKaPFHABtA1xKoOteirGaHl1.jpg"
                                alt="PAT MDb"
                                className={classes.poster}
                            />
                            {/* <Box my={3} style={{ height: 68, background: 'khaki' }}></Box> */}
                        </Box>
                        <Box
                            display="flex"
                            flex="1"
                            flexDirection="column"
                            // justifyContent="center"
                            pl={5}
                        >
                            <Typography variant="h3" style={{ fontWeight: 700 }}>
                                Money Heist
                            </Typography>
                            <Typography>Action, Crime, Drama - 2h 4m</Typography>

                            <Box display="flex" flexDirection="column" mt={1} mb={2}>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Typography variant="h4" style={{ fontWeight: 700 }}>
                                        8.4
                                    </Typography>
                                    <Typography variant="h6">&nbsp;/&nbsp;10</Typography>
                                </Box>
                                <Typography>15,081 votes</Typography>
                            </Box>

                            <Typography
                                style={{ fontStyle: 'italic', fontWeight: 600, marginBottom: 6 }}
                            >
                                Lorem ipsum dolor sit amet.
                            </Typography>
                            <Typography variant="h6" style={{ fontWeight: 700, marginBottom: 6 }}>
                                Overview
                            </Typography>
                            <Typography>
                                To carry out the biggest heist in history, a mysterious man called
                                The Professor recruits a band of eight robbers who have a single
                                characteristic: none of them has anything to lose. Five months of
                                seclusion - memorizing every step, every detail, every probability -
                                culminate in eleven days locked up in the National Coinage and Stamp
                                Factory of Spain, surrounded by police forces and with dozens of
                                hostages in their power, to find out whether their suicide wager
                                will lead to everything or nothing.
                            </Typography>

                            <Box display="flex" flexWrap="wrap" mt={4}>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>Director</Typography>
                                    <Typography>Joe Russo</Typography>
                                </Box>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>
                                        Release date
                                    </Typography>
                                    <Typography>April 24, 2019</Typography>
                                </Box>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>Budget</Typography>
                                    <Typography>$356,000,000.00</Typography>
                                </Box>
                                <Box flex="4">
                                    <Typography style={{ fontWeight: 700 }}>Revenue</Typography>
                                    <Typography>$2,797,800,564.00</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
    // <h1>Detail {match.params.id}</h1>;
};

export default withRouter(MoivieDetail);
