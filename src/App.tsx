import React from 'react';
import { Provider } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

import configureStore from './configureStore';
import './App.css';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import MoviePage from './pages/Movie';
import TvPage from './pages/Tv';
import PeoplePage from './pages/People';
import Test from './pages/Test/AutoComplete';

interface AppProps {}

const store = configureStore();

const App: React.FC<AppProps> = (props) => {
    return (
        <Provider store={store}>
            <CssBaseline />
            <AppBar />
            <Toolbar />
            <Container disableGutters maxWidth={false}>
                <Switch>
                    <Route path="/test" component={() => <Test />} />
                    <Route path="/movie/:id" exact component={() => <MoviePage />} />
                    <Route path="/tv-show/:id" exact component={() => <TvPage />} />
                    <Route path="/people/:id" exact component={() => <PeoplePage />} />
                    <Route path="/search" component={() => <SearchPage />} />
                    <Route path="/not-found" component={() => <h1>NotFound</h1>} />

                    <Route path="/" exact component={() => <Home />} />
                    <Redirect to="/not-found" />
                </Switch>
            </Container>
        </Provider>
    );
};

export default App;
