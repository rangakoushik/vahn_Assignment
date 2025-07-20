import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useEvents } from '../context/EventsContext';
import EventsList from '../components/EventsList';
import EventsMap from '../components/EventsMap';
import ViewToggle from '../components/ViewToggle';

const Home = memo(({ navigation }) => {
  const { viewMode } = useEvents();

  const navigateToEvent = useCallback((event) => {
    navigation.navigate('EventDetail', { event });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Nearby Events</Text>
          <ViewToggle />
        </View>
      </View>

      <View style={styles.content}>
        {viewMode === 'list' ? (
          <EventsList onEventPress={navigateToEvent} />
        ) : (
          <EventsMap onEventPress={navigateToEvent} />
        )}
      </View>
    </SafeAreaView>
  );
});

Home.displayName = 'Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
});

export default Home;
