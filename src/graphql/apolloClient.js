/* import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'subscriptions-transport-ws'; // Update import statement
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create an HTTP link for making HTTP requests to your GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Update with your GraphQL server endpoint
});

// Create a WebSocket link for establishing WebSocket connections with the subscription server
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql/subscriptions', // Update with your subscription server endpoint
  options: {
    reconnect: true,
  },
});

// Use the split function to conditionally split the Apollo Link chain
// based on the type of operation (query, mutation, or subscription)
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Create an instance of ApolloClient with the configured link and InMemoryCache
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client; */
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql/subscriptions',
}));

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const cache = new InMemoryCache();

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: cache,
}); 

export default client