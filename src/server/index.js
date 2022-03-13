'use strict';

const express = require('express');
const cors = require('cors');
const gql = require('graphql-tag');
const { graphqlHTTP } = require('express-graphql');
const { buildASTSchema } = require('graphql');
const trackData = require('./tracks.json');

const schema = buildASTSchema(gql`
  type Query {
    tracks: [Track]
    trackById(id: ID!): Track
  }

  type Track {
    id: ID!
    title: String
    artist: String
    genre: String
    duration: Int
  }
`);

const root = {
  tracks: () => trackData.tracks,
  trackById: (obj) => trackData.tracks.find(track => track.id === parseInt(obj.id))
};

const app= express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`GraphQL listening at http://localhost:${port}/graphql`);
