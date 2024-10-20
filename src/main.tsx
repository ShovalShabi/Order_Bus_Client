import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./states/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { AlertProvider } from "./components/AlertProvider.tsx";

/**
 * Main entry point for the React application. This file sets up the root component and integrates the following:
 * - **Redux**: The global state management library for the app, using `Provider` to make the Redux store available.
 * - **Redux Persist**: Adds persistence to the Redux state across page reloads via `PersistGate`.
 * - **AlertProvider**: Custom context provider to manage global alert messages throughout the application.
 * - **App Component**: The main application component that renders the different pages and routes.
 *
 * @see https://react-redux.js.org/api/provider for more on React-Redux's `Provider`.
 * @see https://github.com/rt2zz/redux-persist for more on Redux Persist.
 * @see https://reactjs.org/docs/strict-mode.html for more on React's `StrictMode`.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      {/* PersistGate delays rendering the app UI until the persisted state has been loaded */}
      <PersistGate loading={null} persistor={persistor}>
        {/* AlertProvider context to handle global alerts */}
        <AlertProvider>
          {/* Main application component */}
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
