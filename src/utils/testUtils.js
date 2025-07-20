import React from 'react';
import { render } from '@testing-library/react-native';
import { EventsProvider } from '../context/EventsContext';

// Custom render function that includes providers
export const renderWithProviders = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <EventsProvider>
      {children}
    </EventsProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock event data for testing
export const mockEvent = {
  id: 'test-event-1',
  title: 'Test Event',
  description: 'This is a test event description',
  startTime: '2025-07-21T10:00:00Z',
  coordinates: {
    latitude: 37.7749,
    longitude: -122.4194,
  },
  distance: '2.5 km',
};

export const mockEvents = [
  mockEvent,
  {
    id: 'test-event-2',
    title: 'Another Test Event',
    description: 'This is another test event description',
    startTime: '2025-07-22T14:00:00Z',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4094,
    },
    distance: '1.2 km',
  },
];

// Helper function to create mock coordinates
export const createMockCoordinates = (lat = 37.7749, lng = -122.4194) => ({
  latitude: lat,
  longitude: lng,
});

// Helper function to create mock event
export const createMockEvent = (overrides = {}) => ({
  ...mockEvent,
  ...overrides,
});

// Date utilities for testing
export const formatTestDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
