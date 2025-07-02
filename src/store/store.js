import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import projectSlice from './slices/projectSlice';
import taskSlice from './slices/taskSlice';
import sprintSlice from './slices/sprintSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    tasks: taskSlice,
    sprints: sprintSlice,
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
