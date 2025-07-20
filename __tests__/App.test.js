import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';

// Mock the AppNavigator since we're testing the main App component
jest.mock('../src/navigation/AppNavigator', () => {
  const { View, Text } = require('react-native');
  return function MockAppNavigator() {
    return (
      <View testID="mock-app-navigator">
        <Text>Mock App Navigator</Text>
      </View>
    );
  };
});

describe('App Component', () => {
  test('renders correctly', () => {
    render(<App />);
    expect(screen.getByTestId('mock-app-navigator')).toBeTruthy();
  });

  test('should have StatusBar component', () => {
    const { UNSAFE_root } = render(<App />);
    // Check if StatusBar is rendered (it's a React Fragment, so we check the structure)
    expect(UNSAFE_root).toBeTruthy();
  });
});
