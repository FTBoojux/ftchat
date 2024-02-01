// sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {},
  reducers: {
    setSession: (state, action) => {
      const { sessionId, content } = action.payload;
      state[sessionId] = content;
    },
    removeSession: (state, action) => {
      delete state[action.payload.sessionId];
    },
  },
});

export const { setSession, removeSession } = sessionSlice.actions;

export default sessionSlice.reducer;
