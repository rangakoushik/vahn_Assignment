import {
  calculateDistance,
  sortEventsByDistance,
  sortEventsByDate,
  formatDistance,
  formatDate,
  formatTimeRange,
} from '../src/utils/eventUtils';
const mockEvents = [
  {
    id: '1',
    title: 'Event 1',
    startTime: '2025-07-20T10:00:00Z',
    coordinates: { latitude: 37.7749, longitude: -122.4194 }
  },
  {
    id: '2',
    title: 'Event 2',
    startTime: '2025-07-19T14:00:00Z',
    coordinates: { latitude: 37.7849, longitude: -122.4094 }
  },
  {
    id: '3',
    title: 'Event 3',
    startTime: '2025-07-21T09:00:00Z',
    coordinates: { latitude: 37.7949, longitude: -122.3994 }
  }
];

const mockUserLocation = {
  latitude: 37.7749,
  longitude: -122.4194
};

describe('Event Utility Functions', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates correctly', () => {
      const distance = calculateDistance(
        37.7749, -122.4194,
        37.7849, -122.4094
      );
      expect(distance).toBeGreaterThan(0);
      expect(typeof distance).toBe('number');
    });

    it('should return 0 for same coordinates', () => {
      const distance = calculateDistance(
        37.7749, -122.4194,
        37.7749, -122.4194
      );
      expect(distance).toBe(0);
    });
  });

  describe('sortEventsByDistance', () => {
    it('should sort events by distance from user location', () => {
      const sortedEvents = sortEventsByDistance(mockEvents, mockUserLocation);
      expect(sortedEvents[0].distance).toBe(0);
      for (let i = 1; i < sortedEvents.length; i++) {
        expect(sortedEvents[i].distance).toBeGreaterThanOrEqual(
          sortedEvents[i - 1].distance
        );
      }
    });

    it('should handle missing user location gracefully', () => {
      const sortedEvents = sortEventsByDistance(mockEvents, null);
      expect(sortedEvents).toHaveLength(mockEvents.length);
      expect(sortedEvents[0].distance).toBe(0);
    });
  });

  describe('sortEventsByDate', () => {
    it('should sort events by date in ascending order', () => {
      const sortedEvents = sortEventsByDate(mockEvents);
      const dates = sortedEvents.map(event => new Date(event.startTime));
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i].getTime()).toBeGreaterThanOrEqual(
          dates[i - 1].getTime()
        );
      }
    });

    it('should not mutate the original array', () => {
      const originalEvents = [...mockEvents];
      const sortedEvents = sortEventsByDate(mockEvents);
      
      expect(mockEvents).toEqual(originalEvents);
      expect(sortedEvents).not.toBe(mockEvents);
    });
  });

  describe('formatDistance', () => {
    it('should format distance less than 1km in meters', () => {
      expect(formatDistance(0.5)).toBe('500m');
      expect(formatDistance(0.1)).toBe('100m');
    });

    it('should format distance greater than 1km in kilometers', () => {
      expect(formatDistance(1.5)).toBe('1.5km');
      expect(formatDistance(10)).toBe('10km');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string correctly', () => {
      const formatted = formatDate('2025-07-20T10:00:00Z');
      expect(formatted).toContain('Jul');
      expect(formatted).toContain('20');
    });
  });

  describe('formatTimeRange', () => {
    it('should format time range correctly', () => {
      const formatted = formatTimeRange(
        '2025-07-20T10:00:00Z',
        '2025-07-20T12:00:00Z'
      );
      expect(formatted).toContain(' - ');
      expect(formatted).toMatch(/AM|PM/);
    });
  });
});
