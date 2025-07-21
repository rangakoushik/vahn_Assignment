Project Structure:
```
src/
├── api/
│   └── eventsApi.js           
├── components/
│   ├── EventCard.js          
│   ├── EventsList.js         
│   ├── EventsMap.js           
│   └── ViewToggle.js          
├── context/
│   └── EventsContext.js      
├── hooks/
│   └── useCurrentLocation.js 
├── navigation/
│   └── AppNavigator.js       
├── screens/
│   ├── Home.js               
│   └── EventDetail.js         
├── types/
│   └── Event.ts              
└── utils/
    └── eventUtils.js          
```

For mockdata events we have eventsApi.js and for card component Event Card is there and for Mpa view and for EventsContext.js for global state management and for custom geolocation we have useCurrentLocation and for main Screen Home.js for type script  event.ts

Why did i choose this tyoe of approach:
 Lightweight alternative to Redux for this app's complexity(Context)
 Built-in React solution with no additional dependencies
 Easy to test and maintain
 Sufficient for the app's state requirements

Architecture & Design Decisions

React Context API with `useReducer` for global state management
Custom hooks for encapsulating business logic
Local state for UI-specific concerns


 Next steps: we can directly add our real Api for data in getEvents() function

React.memo() for preventing unnecessary re-renders
useMemo() for expensive calculations (distance sorting)
useCallback() for memoizing event handlers
FlatList optimizations with `getItemLayout`, 

For Testing Jest has been used 

React Native Maps for map functionality
