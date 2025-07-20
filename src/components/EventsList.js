import React, { memo } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useEvents } from '../context/EventsContext';
import EventCard from './EventCard';
const EventsList = memo(({ onEventPress }) => {
  const { events, loading, error } = useEvents();

  const renderEventCard = ({ item }) => (
    <EventCard event={item} onPress={onEventPress} />
  );

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

  if (events.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No events found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      renderItem={renderEventCard}
      keyExtractor={(item) => item.id}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
});

EventsList.displayName = 'EventsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});

export default EventsList;
