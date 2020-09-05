import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

import './App.css';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import Test from './pages/Test/Tab';

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar />
            <Toolbar />
            <Container disableGutters maxWidth={false}>
                <Switch>
                    {/* <Route path="/test" component={() => <Test />} />
                    <Route path="/two" component={() => <h1>Two</h1>} /> */}
                    <Route path="/movie/:id" exact component={() => <h1>Movie</h1>} />
                    <Route path="/tv-show/:id" exact component={() => <h1>Movie</h1>} />
                    <Route path="/search" component={() => <SearchPage />} />
                    <Route path="/not-found" component={() => <h1>NotFound</h1>} />

                    <Route path="/" exact component={() => <Home />} />
                    <Redirect to="/not-found" />
                </Switch>
            </Container>
        </React.Fragment>
    );
};

export default App;
