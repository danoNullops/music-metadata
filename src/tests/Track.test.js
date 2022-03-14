import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from "@apollo/react-testing";
import wait from 'waait';
import Track, { GET_TRACK_BY_ID } from '../components/Track';


const mocks = [
  {
    request: {
      query: GET_TRACK_BY_ID,
      variables: { id: 0 }
    },
    result: {
      data: {
        trackById: {
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
    <MockedProvider mocks={mocks} addTypename={false}>
      <Track id={0} unsetId={jest.fn()} />
    </MockedProvider>
  );
});

test('should render loading state initially', () => {
  render(
    <MockedProvider mocks={[]}>
      <Track id={0} unsetId={jest.fn()} />
    </MockedProvider>,
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('should render track', async() => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Track id={0} unsetId={jest.fn()} />
    </MockedProvider>
  );

  await act(async() => {
    await wait(0);
  });

  expect(screen.getByText('Angel of Death')).toBeInTheDocument();
});