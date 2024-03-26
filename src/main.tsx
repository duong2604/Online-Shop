import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import persistor, { store } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { SidebarProvider } from "./context/sidebarContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SidebarProvider>
  </React.StrictMode>
);

reportWebVitals();
