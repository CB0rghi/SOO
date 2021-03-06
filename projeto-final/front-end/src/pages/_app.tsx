import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../store'

import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>

    </Provider>
  )
}

export default MyApp
