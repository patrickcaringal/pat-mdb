import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import { actions, selectors } from '../../store/media.slice';
import * as i from '../../store/interfaces';

import { ICardComponentProps } from '../../components/CardList/Card';
import SearchHeaderComponent from './Header';
import SearchResultListComponent from './ResultList';

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
        '& .search-result-list': {
            marginTop: theme.spacing(3),
            maxHeight: 'calc(100vh - 210px)',
            '&.sm': {
                '& .MuiCard-root': {
                    width: 600,
                    '& .media': {
                        height: 100,
                        width: 100
                    },
                    '& .card-content': {
                        height: 100
                    }
                }
            }
        }
    }
}));

interface SearchProps extends RouteComponentProps {}

const SearchPage: React.FC<SearchProps> = ({ history, location }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { query: currentQuery } = QSParse(location.search);
    const [selectedCategory, setSelectedCategory] = useState<i.media_type | null>(null);
    const isPerson = selectedCategory === i.media_type.PERSON;

    const {
        data: { movies, tvShow, person },
        fetching: searchCountLoading
    } = useSelector<i.TState, i.IStateEntity<i.ISearchCount>>(selectors.searchCountSelector);

    const {
        data: { results: searchResultList },
        fetching: searchResultListLoading
    } = useSelector<i.TState, i.IStateEntity<i.ISearchResultList>>(
        selectors.searchResultListSelector
    );

    // search query change
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (currentQuery) {
            dispatch(actions.getSearchCount({ query: currentQuery }));
        }
    }, [currentQuery]);

    // initial selected result
    useEffect(() => {
        const initialSelectedResult = !!movies.total_results
            ? i.media_type.MOVIE
            : !!tvShow.total_results
            ? i.media_type.TV
            : !!person.total_results
            ? i.media_type.PERSON
            : null;

        setSelectedCategory(initialSelectedResult);
    }, [movies, tvShow, person]);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(actions.getSearchResultList({ media: selectedCategory, query: currentQuery }));
        }
    }, [selectedCategory]);

    const handleCategoryClick = (category: typeof selectedCategory) => {
        setSelectedCategory(category);
    };

    const mapData = () => {
        const mappedSearchResultList = (searchResultList as any[]).map((i) => {
            return {
                poster: i.poster,
                title: isPerson ? i.name : i.title,
                subtitle: isPerson
                    ? i.knownFor?.join(', ')
                    : `${new Date(i.release_date).getFullYear()}`,
                description: isPerson ? '' : i.overview,
                onClick: () => {
                    history.push(`/${selectedCategory}/${i.id}`);
                }
            };
        });

        return {
            searchResultListItems: mappedSearchResultList
        };
    };

    const { searchResultListItems } = mapData();

    if (searchCountLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <Container className={classes.content}>
            {currentQuery ? (
                <>
                    <SearchHeaderComponent
                        query={currentQuery as string}
                        selected={selectedCategory}
                        movieResult={movies.total_results}
                        tvShowResult={tvShow.total_results}
                        personResult={person.total_results}
                        onChipClick={handleCategoryClick}
                    />
                    <SearchResultListComponent
                        loading={searchCountLoading || searchResultListLoading}
                        items={searchResultListItems as ICardComponentProps[]}
                        cardSize={isPerson ? 'small' : 'default'}
                    />
                </>
            ) : (
                <Typography>No query</Typography>
            )}
        </Container>
    );
};

export default withRouter(SearchPage);
