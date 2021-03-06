import React from 'react';
import gql from 'graphql-tag';
import { Table, Spinner, Alert, Button } from 'reactstrap';
import { useQuery } from '@apollo/client';

export const GET_TRACK_BY_ID = gql`
  query GetTrackById($id: ID!) {
    trackById(id: $id) {
      title
      artist
      genre
      duration
    }
  }
`;

// format duration stored as milliseconds into minutes and seconds
const durationFormat = ms => {
  const min = Math.floor(ms / 60000);
  let sec = ((ms % 60000) / 1000).toFixed(0);
  if (sec < 10) sec = 0;
  return `${min}:${sec}`;
};

const Track = props => {
  const { id } = props;
  const { loading, error, data } = useQuery(
    GET_TRACK_BY_ID,
    { variables: { id } }
  );

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

  const { title, artist, genre, duration } = data.trackById;

  return (
    <div>
      <Table borderless>
        <tbody>
          <tr>
            <td className="fw-bold">
              Artist:
            </td>
            <td>{artist}</td>
          </tr>
          <tr>
            <td className="fw-bold">
              Title:
            </td>
            <td>{title}</td>
          </tr>
          <tr>
            <td className="fw-bold">
              Genre:
            </td>
            <td>{genre}</td>
          </tr>
          <tr>
            <td className="fw-bold">
              Duration:
            </td>
            <td>{durationFormat(duration)}</td>
          </tr>
        </tbody>
      </Table>
      <div className="text-center p-5">
        <Button onClick={() => props.unsetId()}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Track;
