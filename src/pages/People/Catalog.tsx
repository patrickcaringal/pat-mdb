import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { Popular as PopularPeople } from './mockData';

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

interface PeopleCatalogProps extends RouteComponentProps {}

const PeopleCatalog: React.FC<PeopleCatalogProps> = ({ location }) => {
    const classes = useStyles();

    const searchTxt: string = QSParse(location.search).query as string;

    const [searchQuery, setSearchQuery] = useState<string>(searchTxt);

    return (
        <Box display="flex" mx={4} my={3}>
            <Container disableGutters maxWidth="lg">
                <Typography
                    variant="h5"
                    style={{ fontWeight: 600, marginBottom: 16, textTransform: 'capitalize' }}
                >
                    Popular People
                </Typography>
                <Box mb={3} display="flex" bgcolor="#fff" boxShadow={1} borderRadius={4}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel>Search</InputLabel>
                        <FilledInput
                            value={searchQuery}
                            disableUnderline
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ background: 'none' }}
                        />
                    </FormControl>
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    style={{ marginLeft: '-30px' }}
                >
                    {PopularPeople.map((p) => {
                        const image = `https://image.tmdb.org/t/p/w185/${p.profile_path}`;
                        const movies = p.known_for
                            .map((m) => m.original_title || m.original_name)
                            .join(', ');

                        return (
                            <Card className={classes.cardCont}>
                                <CardMedia
                                    className={classes.cardImg}
                                    image={image}
                                    title={p.name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.title}>{p.name}</Typography>
                                    <Typography variant="body2" className={classes.subtitle} noWrap>
                                        {movies}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}

                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                    <div className={classes.cardCont} />
                </Box>
            </Container>
        </Box>
    );
};

export default withRouter(PeopleCatalog);
