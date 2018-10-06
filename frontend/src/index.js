import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import RootContainer from './containers/RootContainer'
import { ApolloProvider } from 'react-apollo'
import { onError } from 'apollo-link-error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(
      ({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, //plug in alerts here
        ),
      console.dir(graphQLErrors),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = errorLink.concat(
  new HttpLink({ uri: 'http://localhost:3001/api/graphql' }),
)

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/api/graphql`,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootContainer />
  </ApolloProvider>,
  document.getElementById('root'),
)
