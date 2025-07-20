import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const EventDetail = memo(({ route, navigation }) => {
  const { event } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: event?.title || 'Event Details',
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: '600',
      },
    });
  }, [navigation, event]);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTimeRange = (dateString) => {
    const date = new Date(dateString);
    const startHour = date.getHours();
    const endHour = startHour + 4;
    const formatHour = (hour) => {
      if (hour === 0) return '12am';
      if (hour < 12) return `${hour}am`;
      if (hour === 12) return '12pm';
      return `${hour - 12}pm`;
    };
    return `${formatHour(startHour)} - ${formatHour(endHour)}`;
  };

  const getEventImage = (eventTitle) => {
    const eventImages = {
      'Community Cleanup': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      'Farmers Market': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      'Fun Run': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      'Movie Night': 'https://images.unsplash.com/photo-1489185338823-2dee56229097?w=400&h=300&fit=crop',
      'Art Workshop': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    };
    return eventImages[eventTitle] || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: getEventImage(event.title) }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📅</Text>
              </View>
              <Text style={styles.detailText}>{formatShortDate(event.startTime)}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🕐</Text>
              </View>
              <Text style={styles.detailText}>{formatTimeRange(event.startTime)}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📍</Text>
              </View>
              <Text style={styles.detailText}>{event.distance}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.joinContainer}>
        <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

EventDetail.displayName = 'EventDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    width: width,
    height: 300,
    backgroundColor: '#F0F0F0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  detailText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  joinContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  joinButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventDetail;
