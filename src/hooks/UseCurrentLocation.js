import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
export const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  const defaultLocation = {
    latitude: 37.7749,
    longitude: -122.4194
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation({
          ...defaultLocation,
          error: 'Permission to access location was denied. Using default location.'
        });
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000
      });

      const { latitude, longitude } = currentLocation.coords;
      setLocation({
        latitude,
        longitude,
        error: null
      });
    } catch (error) {
      console.log('Error getting location:', error);
      setLocation({
        ...defaultLocation,
        error: 'Could not get current location. Using default location.'
      });
    }
  };

  return location;
};
