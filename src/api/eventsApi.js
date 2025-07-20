const mockEvents = [
  {
    id: '1',
    title: 'Community Cleanup',
    description: 'Join neighbors to pick up litter and beautify shared spaces.',
    startTime: '2025-07-18T09:00:00Z',
    location: 'Central Park',
    distance: '0.8 km',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  {
    id: '2',
    title: 'Farmers Market',
    description: 'Browse fresh produce and local crafts.',
    startTime: '2025-07-19T08:00:00Z',
    location: 'Downtown Square',
    distance: '1.2 km',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4094,
    },
  },
  {
    id: '3',
    title: 'Fun Run',
    description: 'Join a 5K run through downtown streets.',
    startTime: '2025-07-20T13:00:00Z',
    location: 'City Hall',
    distance: '2.1 km',
    coordinates: {
      latitude: 37.7649,
      longitude: -122.4294,
    },
  },
  {
    id: '4',
    title: 'Movie Night',
    description: 'Family-friendly outdoor screening under the stars.',
    startTime: '2025-07-21T20:00:00Z',
    location: 'Riverside Park',
    distance: '3.4 km',
    coordinates: {
      latitude: 37.7549,
      longitude: -122.4394,
    },
  },
  {
    id: '5',
    title: 'Art Workshop',
    description: 'Learn pottery and painting techniques with local artists.',
    startTime: '2025-07-22T14:00:00Z',
    location: 'Community Center',
    distance: '1.7 km',
    coordinates: {
      latitude: 37.7799,
      longitude: -122.4144,
    },
  },
  {
    id: '6',
    title: 'Book Club Meeting',
    description: 'Discuss this month\'s novel over coffee and pastries.',
    startTime: '2025-07-23T10:00:00Z',
    location: 'Public Library',
    distance: '2.8 km',
    coordinates: {
      latitude: 37.7699,
      longitude: -122.4244,
    },
  },
  {
    id: '7',
    title: 'Yoga in the Park',
    description: 'Free outdoor yoga session for all skill levels.',
    startTime: '2025-07-24T07:00:00Z',
    location: 'Golden Gate Park',
    distance: '4.2 km',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4344,
    },
  },
  {
    id: '8',
    title: 'Food Truck Festival',
    description: 'Taste cuisines from around the world at this mobile feast.',
    startTime: '2025-07-25T11:00:00Z',
    location: 'Marina Green',
    distance: '5.6 km',
    coordinates: {
      latitude: 37.8049,
      longitude: -122.4444,
    },
  },
  {
    id: '9',
    title: 'Tech Meetup',
    description: 'Network with local developers and learn about new technologies.',
    startTime: '2025-07-26T18:00:00Z',
    location: 'Innovation Hub',
    distance: '0.9 km',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4044,
    },
  },
  {
    id: '10',
    title: 'Live Music Concert',
    description: 'Enjoy performances by local bands and solo artists.',
    startTime: '2025-07-27T19:00:00Z',
    location: 'Concert Hall',
    distance: '3.1 km',
    coordinates: {
      latitude: 37.7649,
      longitude: -122.4344,
    },
  },
  {
    id: '11',
    title: 'Photography Walk',
    description: 'Capture the city\'s beauty with fellow photography enthusiasts.',
    startTime: '2025-07-28T09:00:00Z',
    location: 'Embarcadero',
    distance: '2.3 km',
    coordinates: {
      latitude: 37.7999,
      longitude: -122.3994,
    },
  },
  {
    id: '12',
    title: 'Cooking Class',
    description: 'Learn to make authentic Italian pasta from scratch.',
    startTime: '2025-07-29T16:00:00Z',
    location: 'Culinary School',
    distance: '1.5 km',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4144,
    },
  },
  {
    id: '13',
    title: 'Charity Auction',
    description: 'Bid on amazing items while supporting local charities.',
    startTime: '2025-07-30T15:00:00Z',
    location: 'Grand Ballroom',
    distance: '1.1 km',
    coordinates: {
      latitude: 37.7899,
      longitude: -122.4094,
    },
  },
  {
    id: '14',
    title: 'Dog Adoption Fair',
    description: 'Meet adorable rescue dogs looking for their forever homes.',
    startTime: '2025-07-31T12:00:00Z',
    location: 'Pet Center',
    distance: '2.9 km',
    coordinates: {
      latitude: 37.7599,
      longitude: -122.4244,
    },
  },
  {
    id: '15',
    title: 'Comedy Night',
    description: 'Laugh the night away with stand-up comedians.',
    startTime: '2025-08-01T20:00:00Z',
    location: 'Comedy Club',
    distance: '1.3 km',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4094,
    },
  },
  {
    id: '16',
    title: 'Gardening Workshop',
    description: 'Learn sustainable gardening practices and plant care.',
    startTime: '2025-08-02T10:00:00Z',
    location: 'Botanical Garden',
    distance: '1.9 km',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4194,
    },
  },
  {
    id: '17',
    title: 'Chess Tournament',
    description: 'Test your strategic skills in this friendly competition.',
    startTime: '2025-08-03T13:00:00Z',
    location: 'Chess Club',
    distance: '2.4 km',
    coordinates: {
      latitude: 37.7699,
      longitude: -122.4144,
    },
  },
  {
    id: '18',
    title: 'Wine Tasting',
    description: 'Sample local wines and learn about wine production.',
    startTime: '2025-08-04T17:00:00Z',
    location: 'Wine Bar',
    distance: '3.7 km',
    coordinates: {
      latitude: 37.7799,
      longitude: -122.4244,
    },
  },
  {
    id: '19',
    title: 'Startup Pitch Night',
    description: 'Watch entrepreneurs present their innovative business ideas.',
    startTime: '2025-08-05T18:30:00Z',
    location: 'Business Center',
    distance: '1.6 km',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4144,
    },
  },
  {
    id: '20',
    title: 'Beach Volleyball',
    description: 'Join a friendly game of beach volleyball by the ocean.',
    startTime: '2025-08-06T14:00:00Z',
    location: 'Ocean Beach',
    distance: '8.2 km',
    coordinates: {
      latitude: 37.7594,
      longitude: -122.5107,
    },
  },
];

/**
 * Simulates fetching events from an API
 * @returns {Promise<Array>} Array of events
 */
export const getEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents;
};
