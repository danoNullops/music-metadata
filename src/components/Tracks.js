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
    }
  }
`;

const Tracks = props => {
  const { loading, error, data } = useQuery(GET_TRACKS);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner>
          Loading...
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="danger">
        Error: {error.message}
      </Alert>
    );
  }

  const tracks = [...data.tracks].sort((a, b) => {
    if (a.artist === b.artist) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
    }
    return a.artist > b.artist ? 1 : -1;
  });

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
        {tracks.map(track => (
          <tr key={track.id}>
            <td>{track.artist}</td>
            <td>{track.title}</td>
            <td>
              <Button onClick={() => props.setId(track.id)}>
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Tracks;
