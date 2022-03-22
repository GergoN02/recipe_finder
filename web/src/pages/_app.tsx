import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

import theme from '../theme'


const apollo = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache,
    credentials: "include"
});

function MyApp({ Component, pageProps }: any) {
    return (
        <ApolloProvider client={apollo}>
            <ChakraProvider resetCSS theme={theme}>
                <ColorModeProvider
                    options={{
                        useSystemColorMode: true,
                    }}
                >
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ChakraProvider>
        </ApolloProvider>
    )
}

export default MyApp
