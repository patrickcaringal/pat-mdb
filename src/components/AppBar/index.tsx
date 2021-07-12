import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

import Menu from './Menu';
import SearchInput from './SearchInput';
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

                        <SearchInput />
                    </Toolbar>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
};

export default NavBar;
