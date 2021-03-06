import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: "'Source Sans Pro', sans-serif"
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                // body: {
                //     overflow: 'overlay',
                //     backgroundColor: '#F3F8F3'
                // }
            }
        }
    }
});

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
