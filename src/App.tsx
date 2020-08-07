import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import './App.css';
import Home from './pages/Home';

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
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container disableGutters maxWidth={false}>
                <Switch>
                    <Route path="/1" component={() => <Home />} />
                    <Route path="/2" component={() => <h1>Test2</h1>} />
                    <Route path="/not-found" component={() => <h1>NotFound</h1>} />

                    <Redirect from="/" exact to="/1" />
                    <Redirect to="/not-found" />
                </Switch>
            </Container>
        </React.Fragment>
    );
}

export default App;
