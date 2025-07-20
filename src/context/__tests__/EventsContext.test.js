import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { EventsProvider, useEvents } from '../EventsContext';
import * as eventsApi from '../../api/eventsApi';

// Mock the eventsApi
jest.mock('../../api/eventsApi');

// Test component to consume the context
const TestComponent = () => {
  const { events, loading, error } = useEvents();
  
  if (loading) return <Text testID="loading">Loading</Text>;
  if (error) return <Text testID="error">{error}</Text>;
  
  return (
    <>
      <Text testID="events-count">{events.length}</Text>
      {events.map(event => (
        <Text key={event.id} testID={`event-${event.id}`}>
          {event.title}
        </Text>
      ))}
    </>
  );
};

const mockEvents = [
  {
    id: '1',
    title: 'Test Event 1',
    description: 'Test Description 1',
    startTime: '2025-07-21T10:00:00Z',
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    distance: '2.5 km',
  },
];

describe('EventsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides loading state initially', () => {
    eventsApi.fetchEvents.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    expect(screen.getByTestId('loading')).toBeTruthy();
  });

  test('provides events when API call succeeds', async () => {
    eventsApi.fetchEvents.mockResolvedValue(mockEvents);
    
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('events-count')).toBeTruthy();
    });

    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByTestId('event-1')).toBeTruthy();
    expect(screen.getByText('Test Event 1')).toBeTruthy();
  });

  test('provides error when API call fails', async () => {
    const errorMessage = 'Failed to fetch events';
    eventsApi.fetchEvents.mockRejectedValue(new Error(errorMessage));
    
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeTruthy();
    });

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  test('throws error when useEvents is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useEvents must be used within an EventsProvider');
    
    consoleSpy.mockRestore();
  });
});
