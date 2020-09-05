import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

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
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="navbar tabs"
                        classes={{ indicator: classes.indicator }}
                    >
                        <Tab
                            value="movie"
                            label="Movie"
                            id="navbar-tab-0"
                            component={Link}
                            to="/movie/popular"
                            classes={{ selected: classes.selected }}
                        />
                        <Tab
                            value="tv-show"
                            label="TV show"
                            id="navbar-tab-1"
                            component={Link}
                            to="/tv-show/popular"
                            classes={{ selected: classes.selected }}
                        />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default withRouter(NavBar);
