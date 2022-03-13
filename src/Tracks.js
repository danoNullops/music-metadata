import React from 'react';
import gql from 'graphql-tag';
import { Table, Spinner, Alert, Button } from 'reactstrap';
import { useQuery } from '@apollo/client';

const GET_TRACKS = gql`
  query GetTracks {
    tracks {
      id
      title
      artist
      genre
      duration
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_TRACKS);

  if (loading) {
    return (
      <Spinner>
        Loading...
      </Spinner>
    );
  }

  if (error) {
    return (
      <Alert color="danger">
        Error: {error.message}
      </Alert>
    );
  }

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Title</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {data.tracks.map(track => (
          <tr key={track.artist}>
            <td>{track.artist}</td>
            <td>{track.title}</td>
            <td>
              <Button color="primary">
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}