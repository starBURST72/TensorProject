import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import "./styles/reset.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";

let serverReady: Promise<void>;
/**
 * Please prefer conditionally including a mocking file via bundler
 * during the build of your application.
 */
if (process.env.NODE_ENV === 'development') {

    serverReady = import('./Mocks/index').then(({startWorker})  => {
        return startWorker();
    })
} else {
    serverReady = Promise.resolve();
}

serverReady.then(() => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
})
