import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';
import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, ButtonBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.35)
        },
        zIndex: 2
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 0, 1, 2),
        // vertical padding + font size from searchIcon
        paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%'
    }
}));

interface SearchInputProps extends RouteComponentProps {}

const SearchInput: React.FC<SearchInputProps> = ({ history, location }) => {
    const classes = useStyles();

    const { query: currentQuery } = QSParse(location.search);

    const [searchQuery, setSearchQuery] = useState<string>((currentQuery as string) || '');

    const handleSearch = () => {
        if (location.pathname === '/search' && currentQuery === searchQuery) {
            return;
        }

        const query = searchQuery.trim() ? `?query=${searchQuery}` : '';
        history.push(`/search${query}`);
    };

    return (
        <div className={classes.search}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={({ target: { value } }) => setSearchQuery(value)}
                />
            </form>

            <ButtonBase className={classes.searchIcon} onClick={handleSearch}>
                <Search />
            </ButtonBase>
        </div>
    );
};

export default withRouter(SearchInput);
