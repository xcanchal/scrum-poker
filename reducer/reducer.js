import { SET_ROOM, UPDATE_ROOM } from './action-types';

export const initialState = {
  room: {
    name: null,
    host: { id: null, name: null },
    cardsMode: null,
    guests: [],
  },
};

export const setRoom = (state, { room }) => ({
  ...state,
  room,
});

export const updateRoom = (state, { updates }) => {
  return {
    ...state,
    room: {
      ...state.room,
      ...updates,
    },
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_ROOM: return setRoom(state, action);
  case UPDATE_ROOM: return updateRoom(state, action);
  default:
    return state;
  }
};

export default reducer;
