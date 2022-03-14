import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/react-testing";
import Track, { GET_TRACK_BY_ID } from '../components/Track';

const mocks = [
  {
    request: {
      query: GET_TRACK_BY_ID,
      variables: { id: 0 }
    },
    result: {
      data: {
        track: {
          "title": "Angel of Death",
          "artist": "Hank Williams",
          "genre": "Country",
          "duration": 143000
        }
      }
    }
  }
];

test('renders without error', () => {
  render(
    <MockedProvider mocks={mocks}>
      <Track id={0} unsetId={() => true} />
    </MockedProvider>
  );
});