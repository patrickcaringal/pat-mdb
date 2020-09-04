import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './App.css';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import Test from './pages/Test/Tab';

function ElevationScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">PAT MDb</Typography>
                        <Tabs
                            value={0}
                            // value={value}
                            // onChange={handleChange}
                            indicatorColor="primary"
                            // textColor="primary"
                            // centered
                            aria-label="simple tabs example"
                        >
                            <Tab label="Item One" value="/one" component={Link} to="/one" />
                            <Tab label="Item Two" value="/two" component={Link} to="/two" />
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container disableGutters maxWidth={false}>
                <Switch>
                    <Route path="/test" component={() => <Test />} />
                    <Route path="/one" component={() => <h1>One</h1>} />
                    <Route path="/two" component={() => <h1>Two</h1>} />
                    <Route path="/search" component={() => <SearchPage />} />
                    <Route path="/not-found" component={() => <h1>NotFound</h1>} />

                    <Route path="/" exact component={() => <Home />} />
                    <Redirect to="/not-found" />
                </Switch>
            </Container>
        </React.Fragment>
    );
}

export default App;
