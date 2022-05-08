import '../styles/globals.css'
import './bulmaswatch.min.css'

import { Container } from 'react-bulma-components';

function MyApp({ Component, pageProps }) {
  return <Container><Component {...pageProps} /></Container>
}

export default MyApp
