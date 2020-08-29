import { SET_ROOM, UPDATE_ROOM } from './action-types';

export const setRoom = (room) => ({
  type: SET_ROOM,
  room,
});

export const updateRoom = (updates) => ({
  type: UPDATE_ROOM,
  updates,
});
