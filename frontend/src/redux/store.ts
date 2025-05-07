// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';
import eventsSlice from './features/events/events.slice';

export const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
    counter: counterSlice,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
