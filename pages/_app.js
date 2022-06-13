import "../styles/globals.css";
import { Provider } from "../src/Context/context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
