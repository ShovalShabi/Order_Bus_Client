import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./states/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { AlertProvider } from "./components/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
