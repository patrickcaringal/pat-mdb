import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import TabMenu from './TabMenu';
import Logo from '../../asset/img/pat-logo.png';

const useStyles = makeStyles((theme) => ({
    logo: {
        height: 60
    },
    indicator: {
        background: 'transparent'
    },
    selected: {
        fontWeight: 'bold'
    }
}));

interface NavBarProps extends RouteComponentProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
    const classes = useStyles();

    const [value, setValue] = useState<string>();

    useEffect(() => {
        const path = props.location.pathname;
        const index = path.indexOf('/', path.indexOf('/') + 1);
        const activeTab = path.substr(1, index - 1);

        setValue(activeTab);
    }, [props.location.pathname]);

    const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0
        });

        return React.cloneElement(children, {
            elevation: trigger ? 4 : 0
        });
    };

    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };

    return (
        <ElevationScroll>
            <AppBar>
                <Toolbar>
                    <Link to="/">
                        <img src={Logo} className={classes.logo} alt="PAT MDb" />
                    </Link>

                    <TabMenu
                        label="Movie"
                        options={[
                            {
                                label: 'Popular',
                                linkTo: '/movie/popular'
                            },
                            {
                                label: 'Upcoming',
                                linkTo: '/movie/upcoming'
                            },
                            {
                                label: 'Top Rated',
                                linkTo: '/movie/top-rated'
                            }
                        ]}
                    />
                    <TabMenu
                        label="Tv show"
                        options={[
                            {
                                label: 'Popular',
                                linkTo: '/tv-show/popular'
                            },
                            {
                                label: 'Upcoming',
                                linkTo: '/tv-show/upcoming'
                            },
                            {
                                label: 'Top Rated',
                                linkTo: '/tv-show/top-rated'
                            }
                        ]}
                    />
                    <TabMenu
                        label="People"
                        options={[
                            {
                                label: 'Popular',
                                linkTo: '/people/popular'
                            }
                        ]}
                    />
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default withRouter(NavBar);
