import * as React from 'react';
import { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { parse as QSParse } from 'query-string';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    indicator: {
        color: 'khaki'
    }
}));

interface NavBarProps extends RouteComponentProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
    const classes = useStyles();

    const [value, setValue] = React.useState();

    const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0
        });

        return React.cloneElement(children, {
            elevation: trigger ? 4 : 0
        });
    };

    // const { pathname } = props.location;
    // const index = pathname.indexOf('/', pathname.indexOf('/') + 1);
    // const activeTab = pathname.substr(1, index - 1);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <ElevationScroll>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">PAT MDb</Typography>
                    <Tabs
                        value={value}
                        // value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        aria-label="navbar tabs"
                    >
                        <Tab
                            label="Item One"
                            id="navbar-tab-0"
                            component={Link}
                            to="/movie/popular"
                            classes={{
                                selected: classes.indicator
                                // root: classes.root, // class name, e.g. `classes-nesting-root-x`
                            }}
                        />
                        <Tab
                            label="Item Two"
                            id="navbar-tab-1"
                            component={Link}
                            to="/tv-show/popular"
                            classes={{
                                selected: classes.indicator
                                // root: classes.root, // class name, e.g. `classes-nesting-root-x`
                            }}
                        />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

export default withRouter(NavBar);
