import { fetchEvents } from '../eventsApi';

describe('eventsApi', () => {
  describe('fetchEvents', () => {
    test('returns array of events', async () => {
      const events = await fetchEvents();
      
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThan(0);
    });

    test('returns events with required properties', async () => {
      const events = await fetchEvents();
      const firstEvent = events[0];
      
      expect(firstEvent).toHaveProperty('id');
      expect(firstEvent).toHaveProperty('title');
      expect(firstEvent).toHaveProperty('description');
      expect(firstEvent).toHaveProperty('startTime');
      expect(firstEvent).toHaveProperty('coordinates');
      expect(firstEvent).toHaveProperty('distance');
      
      // Check coordinates structure
      expect(firstEvent.coordinates).toHaveProperty('latitude');
      expect(firstEvent.coordinates).toHaveProperty('longitude');
      
      // Check data types
      expect(typeof firstEvent.id).toBe('string');
      expect(typeof firstEvent.title).toBe('string');
      expect(typeof firstEvent.description).toBe('string');
      expect(typeof firstEvent.startTime).toBe('string');
      expect(typeof firstEvent.coordinates.latitude).toBe('number');
      expect(typeof firstEvent.coordinates.longitude).toBe('number');
      expect(typeof firstEvent.distance).toBe('string');
    });

    test('returns events with valid date format', async () => {
      const events = await fetchEvents();
      
      events.forEach(event => {
        const date = new Date(event.startTime);
        expect(date instanceof Date).toBe(true);
        expect(isNaN(date.getTime())).toBe(false);
      });
    });

    test('returns events with valid coordinates', async () => {
      const events = await fetchEvents();
      
      events.forEach(event => {
        const { latitude, longitude } = event.coordinates;
        
        // Check latitude range (-90 to 90)
        expect(latitude).toBeGreaterThanOrEqual(-90);
        expect(latitude).toBeLessThanOrEqual(90);
        
        // Check longitude range (-180 to 180)
        expect(longitude).toBeGreaterThanOrEqual(-180);
        expect(longitude).toBeLessThanOrEqual(180);
      });
    });

    test('simulates network delay', async () => {
      const startTime = Date.now();
      await fetchEvents();
      const endTime = Date.now();
      
      // Should take at least 500ms due to setTimeout in the mock
      expect(endTime - startTime).toBeGreaterThanOrEqual(500);
    });

    test('returns unique event IDs', async () => {
      const events = await fetchEvents();
      const ids = events.map(event => event.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(ids.length).toBe(uniqueIds.length);
    });
  });
});
