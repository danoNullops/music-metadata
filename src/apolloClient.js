import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = (process.env.NODE_ENV && process.env.NODE_ENV === 'production') ? '/graphql' : 'http://localhost:4000/graphql';

export default new ApolloClient({
  uri,
  cache: new InMemoryCache()
});
