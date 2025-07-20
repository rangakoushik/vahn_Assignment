export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =  Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
export const sortEventsByDistance = (events, userLocation) => {
  if (!userLocation) {
    return events.map(event => ({ ...event, distance: 0 }));
  }

  return [...events]
    .map(event => ({
      ...event,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        event.coordinates.latitude,
        event.coordinates.longitude
      )
    }))
    .sort((a, b) => a.distance - b.distance);
};
export const sortEventsByDate = (events) => {
  return [...events].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
};
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance}km`;
};
export const formatTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const startStr = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const endStr = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  return `${startStr} - ${endStr}`;
};
