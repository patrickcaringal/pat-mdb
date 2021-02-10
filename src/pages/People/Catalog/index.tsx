import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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

import Pagination from '@material-ui/lab/Pagination';

import { actions, interfaces } from '../../../ducks';
import { getQueryString } from '../../../utils/http';

const useStyles = makeStyles({
    searchForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    cardCont: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: 235,
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
    catalogPeople: interfaces.IPeopleCatalog;
    loaders: { [key: string]: boolean };
}

interface IDispatchToProps {
    getCatalogPeople: (
        queries: interfaces.IGetCatalogPeoplePayload
    ) => interfaces.IGetCatalogPeople;
}

interface IOwnProps extends IStateToProps, IDispatchToProps, RouteComponentProps {}

const PeopleCatalog: React.FC<IOwnProps> = ({
    catalogPeople,
    getCatalogPeople,
    location,
    history
}) => {
    const classes = useStyles();

    const currentQuery = location.search;

    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { results: people = [], total_pages } = catalogPeople;
    const paginationPages = (total_pages as unknown) as number;

    useEffect(() => {
        const { query = '', page = 1 } = QSParse(currentQuery);

        setSearchQuery(query as string);
        setSelectedPage(Number(page as number));

        const payload = {
            query: query as string,
            page: Number(page as number)
        } as interfaces.IGetCatalogPeoplePayload;

        getCatalogPeople(payload);
    }, [currentQuery, getCatalogPeople]);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        history.push({
            pathname: '/people/popular',
            search: `?query=${searchQuery}`
        });
    };

    const handlePaginationChange = (page: number) => {
        const currentQueryObj = QSParse(currentQuery);
        delete currentQueryObj.page;

        const query = getQueryString(currentQueryObj as { [key: string]: string });
        const newQuery = query ? `?${query}&page=${page}` : `?page=${page}`;

        history.push({
            pathname: location.pathname,
            search: newQuery
        });
    };

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
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.searchForm}
                        onSubmit={handleSearchSubmit}
                    >
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
                    </form>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                >
                    {people.map((person) => {
                        const { name, poster, known_for } = person;
                        const movies = known_for.join(', ');

                        return (
                            <Card key={person.id} className={classes.cardCont}>
                                <CardMedia
                                    className={classes.cardImg}
                                    image={poster}
                                    title={name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.title}>{name}</Typography>
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
                </Box>

                {paginationPages > 1 && (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Pagination
                            count={paginationPages}
                            page={selectedPage}
                            variant="outlined"
                            shape="rounded"
                            size="large"
                            // disabled={isCatalogLoading}
                            onChange={(event: object, page: number) => {
                                window.scrollTo(0, 0);
                                handlePaginationChange(page);
                            }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

const mapStateToProps = (state: interfaces.TState) => ({
    catalogPeople: state.catalogPeople,
    loaders: state.loaders
});

const mapDispatchToProps = {
    getCatalogPeople: actions.getCatalogPeople
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PeopleCatalog));
