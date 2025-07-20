import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useEvents } from '../context/EventsContext';

const { width, height } = Dimensions.get('window');

const SimpleMapFallback = memo(({ onEventPress }) => {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading events</Text>
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

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    if (onEventPress) {
      onEventPress(event);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>🗺️ Map View</Text>
        <Text style={styles.mapSubtext}>
          Google Maps integration requires API key configuration
        </Text>
      </View>
      
      <ScrollView style={styles.eventsList}>
        <Text style={styles.eventsTitle}>📍 Events on Map</Text>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[
              styles.eventCard,
              selectedEvent?.id === event.id && styles.selectedEventCard
            ]}
            onPress={() => handleEventPress(event)}
            activeOpacity={0.7}
          >
            <View style={styles.eventHeader}>
              <View style={styles.eventIcon}>
                <Text style={styles.iconText}>📍</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {event.description}
                </Text>
                <View style={styles.eventMeta}>
                  <Text style={styles.eventDate}>
                    📅 {formatDate(event.startTime)}
                  </Text>
                  <Text style={styles.eventDistance}>
                    📍 {event.distance}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  mapPlaceholder: {
    height: height * 0.3,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  mapPlaceholderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginVertical: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedEventCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
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

SimpleMapFallback.displayName = 'SimpleMapFallback';

export default SimpleMapFallback;
