import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/react-testing";
import Tracks, { GET_TRACKS } from '../components/Tracks';

const mocks = [
  {
    request: {
      query: GET_TRACKS
    },
    result: {
      data: {
        tracks: [
          {
            "id": 0,
            "title": "Angel of Death",
            "artist": "Hank Williams"
          },
          {
            "id": 1,
            "title": "People Are Strange",
            "artist": "The Doors"
          },
          {
            "id": 2,
            "title": "Big Iron",
            "artist": "Marty Robbins"
          }
        ]
      }
    }
  }
];

test('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tracks setId={id => id}/>
    </MockedProvider>
  );
});