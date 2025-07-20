import React, { memo } from 'react';
import SimpleMapFallback from './SimpleMapFallback';

const EventsMap = memo(({ onEventPress }) => {
  return <SimpleMapFallback onEventPress={onEventPress} />;
});

EventsMap.displayName = 'EventsMap';

export default EventsMap;