import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store";
import "../styles/globals.css"; 
import LoadingSpinnerCircle from "@/components/LoadingSpinner";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <LoadingSpinnerCircle /> {/* ✅ Global Loading Spinner */}

        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
