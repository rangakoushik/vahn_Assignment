import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEvents } from '../context/EventsContext';

const { width, height } = Dimensions.get('window');
const SimpleMap = memo(({ onEventPress }) => {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading map</Text>
      </View>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleMarkerPress = (event) => {
    setSelectedEvent(event);
  };

  const handleEventCardPress = () => {
    if (selectedEvent && onEventPress) {
      onEventPress(selectedEvent);
    }
  };
  const getMapRegion = () => {
    if (events.length === 0) {
      return {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }

    const latitudes = events.map(event => event.coordinates.latitude);
    const longitudes = events.map(event => event.coordinates.longitude);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
    const deltaLat = (maxLat - minLat) * 1.5;
    const deltaLng = (maxLng - minLng) * 1.5;

    return {
      latitude: midLat,
      longitude: midLng,
      latitudeDelta: Math.max(deltaLat, 0.01),
      longitudeDelta: Math.max(deltaLng, 0.01),
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, selectedEvent && styles.mapWithCard]}
        region={getMapRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={event.coordinates}
            title={event.title}
            description={event.description}
            onPress={() => handleMarkerPress(event)}
          />
        ))}
      </MapView>
      {selectedEvent && (
        <View style={styles.eventPreview}>
          <TouchableOpacity 
            style={styles.eventCard}
            onPress={handleEventCardPress}
            activeOpacity={0.7}
          >
            <View style={styles.eventHeader}>
              <View style={styles.eventIcon}>
                <Text style={styles.iconText}>📍</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {selectedEvent.title}
                </Text>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {selectedEvent.description}
                </Text>
                <View style={styles.eventMeta}>
                  <Text style={styles.eventDate}>
                    📅 {formatDate(selectedEvent.startTime)}
                  </Text>
                  <Text style={styles.eventDistance}>
                    📍 {selectedEvent.distance}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  map: {
    width: width,
    height: height - 200,
  },
  mapWithCard: {
    height: height - 320,
  },
  eventPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDate: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  eventDistance: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
});

SimpleMap.displayName = 'SimpleMap';

export default SimpleMap;
