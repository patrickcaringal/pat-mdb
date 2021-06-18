import React from 'react';
import { Provider } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

import configureStore from './store/configureStore';
import { media_type } from './store/interfaces';
import './App.css';

import AppBar from './components/AppBar';
import Home from './pages/Home';
// import SearchPage from './pages/Search';
import CreditPage from './pages/Credit';
import MediaDetail from './pages/MediaDetail';
import SeasonDetail from './pages/SeasonDetail';
import PersonDetail from './pages/PersonDetail';
// import TvPage from './pages/Tv';
// import PeoplePage from './pages/People';
import Test from './pages/Test/Carousel';

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
                    {/* <Route path="/test" component={() => <Test />} />
                    <Route path="/movie/:id" exact component={() => <MoviePage />} />
                    <Route path="/tv-show/:id" exact component={() => <TvPage />} />
                    <Route path="/people/:id" exact component={() => <PeoplePage />} />
                    <Route path="/search" component={() => <SearchPage />} /> */}
                    <Route
                        path="/movie/:id/credits"
                        exact
                        component={() => <CreditPage mediaType={media_type.MOVIE} />}
                    />
                    <Route
                        path="/tv/:id/credits"
                        exact
                        component={() => <CreditPage mediaType={media_type.TV} />}
                    />

                    <Route
                        path="/tv/:id"
                        exact
                        component={() => <MediaDetail mediaType={media_type.TV} />}
                    />
                    <Route
                        path="/tv/:id/season/:seasonNumber"
                        exact
                        component={() => <SeasonDetail />}
                    />
                    <Route
                        path="/movie/:id"
                        exact
                        component={() => <MediaDetail mediaType={media_type.MOVIE} />}
                    />
                    <Route path="/person/:id" exact component={() => <PersonDetail />} />
                    <Route path="/test" component={() => <Test />} />
                    <Route path="/not-found" component={() => <h1>NotFound</h1>} />

                    <Route path="/" exact component={() => <Home />} />
                    <Redirect to="/not-found" />
                </Switch>
            </Container>
        </Provider>
    );
};

export default App;
