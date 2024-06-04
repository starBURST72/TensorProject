import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import "./styles/reset.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Store from "./store/store";

interface State {
    store:Store,
}
const store=new Store();

export const Context = createContext<State>({store});

let serverReady: Promise<void>;
/**
 * Please prefer conditionally including a mocking file via bundler
 * during the build of your application.
 */
// if (process.env.NODE_ENV === 'development') {

//     serverReady = import('./Mocks/Manager').then(({startWorker})  => {
//         return startWorker();
//     })
// } else {
//     serverReady = Promise.resolve();
// }

// serverReady = import('./Mocks/Manager').then(({startWorker})  => {
//     return startWorker();
// })


// serverReady.then(() => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <Context.Provider value={{store}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
    );
// })
