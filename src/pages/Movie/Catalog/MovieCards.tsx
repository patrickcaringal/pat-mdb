import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { actions, interfaces, types } from '../../../ducks';

const useStyles = makeStyles({
    cardCont: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: 200,
        marginLeft: 30,
        marginBottom: 30
    },
    cardImg: {
        height: 'calc((((100vw - 80px - 260px - 128px) / 4)) * 1.5)',
        maxHeight: 'calc(208px * 1.5)'
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    }
});

interface IStateToProps {
    catalogMovies: interfaces.IMediaCatalog;
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getCatalogMovies: (
        queries: interfaces.IGetCatalogMoviesPayload
    ) => interfaces.IGetCatalogMovies;
}

interface MovieProps extends IStateToProps, IDispatchToProps {}

const MovieCards: React.FC<MovieProps> = ({ catalogMovies }) => {
    const classes = useStyles();

    const { movies = [] } = catalogMovies;

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {movies.map((m) => {
                const { id, poster: image, title, genres: subtitle, release_date } = m;

                return (
                    <Card key={id} className={classes.cardCont}>
                        <CardMedia className={classes.cardImg} image={image} title={title} />
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.title}>{m.title}</Typography>
                            <Typography variant="body2" className={classes.subtitle}>
                                {subtitle.join(', ')}
                            </Typography>
                            {/* <Typography variant="body2" className={classes.subtitle}>
                                {moment(release_date).format('MMM DD, YYYY')}
                            </Typography> */}
                        </CardContent>
                    </Card>
                );
            })}

            {/* fillers */}
            <div className={classes.cardCont} />
            <div className={classes.cardCont} />
            <div className={classes.cardCont} />
        </Box>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    catalogMovies: state.catalogMovies,
    loaders: state.loaders
});

const mapDispatchToProps = {
    getCatalogMovies: actions.getCatalogMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCards);
