import React, { memo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useEvents } from '../context/EventsContext';

const ViewToggle = memo(() => {
  const { viewMode, setViewMode } = useEvents();
  const slideAnim = useRef(new Animated.Value(viewMode === 'list' ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: viewMode === 'list' ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [viewMode, slideAnim]);

  const handleToggle = (mode) => {
    if (mode !== viewMode) {
      setViewMode(mode);
    }
  };

  const slideTransform = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleToggle('list')}
        activeOpacity={0.7}
        style={styles.labelButton}
      >
        <Text style={[
          styles.labelText,
          viewMode === 'list' && styles.activeLabelText
        ]}>
          List
        </Text>
      </TouchableOpacity>
      <View style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: slideTransform }],
            },
          ]}
        />
        <TouchableOpacity
          style={styles.toggleTrack}
          onPress={() => handleToggle(viewMode === 'list' ? 'map' : 'list')}
          activeOpacity={0.8}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleToggle('map')}
        activeOpacity={0.7}
        style={styles.labelButton}
      >
        <Text style={[
          styles.labelText,
          viewMode === 'map' && styles.activeLabelText
        ]}>
          Map
        </Text>
      </TouchableOpacity>
    </View>
  );
});

ViewToggle.displayName = 'ViewToggle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999999',
  },
  activeLabelText: {
    color: '#000000',
  },
  toggleContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 2,
    position: 'relative',
    width: 44,
    height: 28,
    marginHorizontal: 12,
  },
  toggleTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  slider: {
    position: 'absolute',
    top: 2,
    left: 0,
    width: 20,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ViewToggle;
