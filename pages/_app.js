import '../styles/globals.css'
import { MapProvider } from "../components/MapProvider";

function MyApp({ Component, pageProps }) {
  return(
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  )
}

export default MyApp
