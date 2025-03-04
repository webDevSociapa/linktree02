import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store";
import "../styles/globals.css";



// function AuthGuard({ children }) {
//   const router = useRouter();
//   const authToken = useSelector((state) => state.auth?.authToken);
//   const isAuthenticated = !!authToken; // Converts truthy/falsy value into boolean

//   console.log("AuthGuard - isAuthenticated:", isAuthenticated);

//   useEffect(() => {
//     if (!isAuthenticated && router.pathname !== "/login") {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   return children(isAuthenticated);
// }

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <Component {...pageProps}  />;

      {/* <AuthGuard> */}
          {/* {(isAuthenticated) => {
            console.log("MyApp - isAuthenticated:", isAuthenticated); // Debug
            return <Component {...pageProps} isAuthenticated={isAuthenticated} />;
          }} */}
        {/* </AuthGuard> */}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
