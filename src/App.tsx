import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';

// const foo = (bar: string, baz: any) => {};

function App() {
    return (
        <Switch>
            <Route path="/1" component={() => <Home />} />
            <Route path="/2" component={() => <h1>Test2</h1>} />
            <Route path="/not-found" component={() => <h1>NotFound</h1>} />

            <Redirect from="/" exact to="/1" />
            <Redirect to="/not-found" />
        </Switch>
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.tsx</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Learn React
        //         </a>
        //     </header>
        // </div>
    );
}

export default App;
