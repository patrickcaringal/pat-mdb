import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Container, Typography } from '@material-ui/core';

import { actions, selectors } from '../../store/media.slice';
import * as i from '../../store/interfaces';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        // paddingBottom: theme.spacing(4),
        // border: '1px solid red',
        height: 'calc(100vh - 64px)',

        '& .search-header': {
            display: 'flex',
            flexDirection: 'column',
            // border: '1px solid khaki',

            '& .category-chip-container': {
                marginTop: theme.spacing(1),
                '& .MuiChip-label': {
                    paddingLeft: 12,
                    paddingRight: 12
                },
                '& .MuiChip-root': {
                    marginRight: theme.spacing(1)
                }
            }
        },
        '& .search-body': {
            flex: 1,
            // border: '1px solid khaki',
            marginTop: theme.spacing(3)
        }
    }
}));

interface SearchProps extends RouteComponentProps {}

const SearchPage: React.FC<SearchProps> = ({ location }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { query: currentQuery } = QSParse(location.search);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        if (currentQuery) {
            dispatch(actions.getSearchCount({ query: currentQuery }));
        }
    }, [currentQuery]);

    const {
        data: { movies, tvShow, person },
        fetching: searchCountLoading
    } = useSelector<i.TState, i.IStateEntity<i.ISearchCount>>(selectors.searchCountSelector);

    if (searchCountLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <Container className={classes.content}>
            {currentQuery ? (
                <>
                    <Box className="search-header">
                        {!movies.total_results && !tvShow.total_results && !person.total_results ? (
                            <Typography>No result found for "{currentQuery}"</Typography>
                        ) : (
                            <Typography>Results for "{currentQuery}"</Typography>
                        )}

                        <Box className="category-chip-container">
                            {!!movies.total_results && (
                                <Chip size="small" label={`${movies.total_results} Movies`} />
                            )}
                            {!!tvShow.total_results && (
                                <Chip size="small" label={`${tvShow.total_results} TV Shows`} />
                            )}
                            {!!person.total_results && (
                                <Chip size="small" label={`${person.total_results} People`} />
                            )}
                        </Box>
                    </Box>

                    <Box className="search-body">
                        {_.range(2).map(() => (
                            <Card
                                variant="horizontal"
                                {...{
                                    onClick: () => {},
                                    poster: 'https://via.placeholder.com/94x141/767c77/fabea7',
                                    title: 'title',
                                    subtitle: 'subtitle',
                                    description:
                                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum quam temporibus rerum?'
                                }}
                            />
                        ))}
                    </Box>
                </>
            ) : (
                <Typography>No query</Typography>
            )}
        </Container>
    );
};

export default withRouter(SearchPage);
