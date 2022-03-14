import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from "@apollo/react-testing";
import wait from 'waait';
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
      <Tracks setId={jest.fn()}/>
    </MockedProvider>
  );
});

test('should render loading state initially', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Tracks setId={jest.fn()} />
    </MockedProvider>,
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('should render tracks', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tracks setId={jest.fn()} />
    </MockedProvider>
  );

  await act(async() => {
    await wait(0);
  });

  expect(screen.getByText('Hank Williams')).toBeInTheDocument();
});

test('should render error', async () => {
  const errorMocks = [
    {
      request: {
        query: GET_TRACKS
      },
      error: new Error('oh no')
    }
  ];
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Tracks setId={jest.fn()} />
    </MockedProvider>
  );

  await act(async() => {
    await wait(0);
  });

  expect(screen.getByText('Error: oh no')).toBeInTheDocument();
});
