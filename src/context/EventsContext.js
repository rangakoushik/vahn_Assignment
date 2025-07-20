import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getEvents } from '../api/eventsApi';
const EVENTS_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_EVENTS: 'SET_EVENTS',
  SET_ERROR: 'SET_ERROR',
  SET_VIEW_MODE: 'SET_VIEW_MODE'
};

const initialState = {
  events: [],
  loading: false,
  error: null,
  viewMode: 'list'
};

const eventsReducer = (state, action) => {
  switch (action.type) {
  case EVENTS_ACTIONS.SET_LOADING:
    return { ...state, loading: action.payload };
  case EVENTS_ACTIONS.SET_EVENTS:
    return { ...state, events: action.payload, loading: false, error: null };
  case EVENTS_ACTIONS.SET_ERROR:
    return { ...state, error: action.payload, loading: false };
  case EVENTS_ACTIONS.SET_VIEW_MODE:
    return { ...state, viewMode: action.payload };
  default:
    return state;
  }
};

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      dispatch({ type: EVENTS_ACTIONS.SET_LOADING, payload: true });
      const events = await getEvents();
      dispatch({ type: EVENTS_ACTIONS.SET_EVENTS, payload: events });
    } catch (error) {
      dispatch({ type: EVENTS_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const setViewMode = (mode) => {
    dispatch({ type: EVENTS_ACTIONS.SET_VIEW_MODE, payload: mode });
  };

  const getEventById = (id) => {
    return state.events.find(event => event.id === id);
  };

  const value = {
    ...state,
    loadEvents,
    setViewMode,
    getEventById
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};
