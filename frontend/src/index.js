import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import RootContainer from './containers/RootContainer'
import { ApolloProvider } from 'react-apollo'



const httpLink = new HttpLink({ uri: 'http://localhost:4000' })



// authenticated httplink

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
  },
})

const link = split(
  // split based on operation type
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
