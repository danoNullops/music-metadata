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

const nodeEnv = process.env.NODE_ENV;

const app= express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  // do not start graphql ide if production
  graphiql: !(nodeEnv && nodeEnv === 'production')
}));

const path = require('path');
// if production serve react app from build at any path other than /graphql
if (nodeEnv && nodeEnv === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Server listening at http://localhost:${port}`);
