import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

/**
 * Configuration for Redux Persist.
 * This configuration ensures that the Redux state is persisted across page reloads or application restarts
 * by saving the state in local storage (using redux-persist).
 */
const persistConfig = {
  key: "root", // The key for the root level of the state.
  storage, // Defines storage method (localStorage by default for web).
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducer);

/**
 * Configure the Redux store with middleware adjustments.
 * - Enables the persistence of the Redux state using redux-persist.
 * - Customizes the middleware to handle special serializable checks.
 * - Ignores specific action types used by redux-persist to avoid warnings.
 */
const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer for the store.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoring these redux-persist related actions to avoid serializability warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Persistor for the store, which ensures the Redux state is saved to and restored from storage.
 * It is necessary for redux-persist to manage the rehydration and persistence of state.
 */
export const persistor = persistStore(store);

// Export the store as the default export, making it accessible throughout the application.
export default store;
