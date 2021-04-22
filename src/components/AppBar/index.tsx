import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';

import Menu from './Menu';
import Logo from '../../asset/img/logo.svg';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: '#1F2421'
    },
    logo: {
        height: 16
    },
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
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
    const classes = useStyles();

    const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0
        });

        return React.cloneElement(children, {
            elevation: trigger ? 4 : 0
        });
    };

    return (
        <ElevationScroll>
            <AppBar className={classes.appbar}>
                <Container disableGutters>
                    <Toolbar>
                        <Link to="/">
                            <img src={Logo} className={classes.logo} alt="PAT MDb" />
                        </Link>

                        <div style={{ flexGrow: 1 }}>
                            <Menu
                                label="Movie"
                                value="movie"
                                options={[
                                    {
                                        label: 'Popular',
                                        rootLink: '/movie/popular',
                                        linkTo: '/movie/popular'
                                    },
                                    {
                                        label: 'Now Playing',
                                        // add dates
                                        rootLink: '/movie/now-playing',
                                        linkTo:
                                            '/movie/now-playing?from=2020-12-12&to=to=2020-12-12'
                                    },
                                    {
                                        label: 'Upcoming',
                                        // add dates
                                        rootLink: '/movie/upcoming',
                                        linkTo: '/movie/upcoming?from=2020-12-13&to=to=2021-01-13'
                                    }
                                ]}
                            />
                        </div>
                        <div className={classes.search}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
};

export default NavBar;
