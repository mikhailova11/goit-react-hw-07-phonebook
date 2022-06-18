
import {  configureStore, combineReducers, createReducer, createAction } from '@reduxjs/toolkit';
import {   FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import logger from 'redux-logger';
import { nanoid } from 'nanoid';


export const filterChange = createAction('filterChange');

export const deleteContact = createAction('deleteContact');

export const addContact = createAction('addContact',
  (name, number) => {
    return {
      payload: {
        id: nanoid(),
        name,
        number,
      },
    };
  },
);


const items = createReducer([{name: 'Nata', id:'01',  number: '0999999999' }], {
  [addContact]: (state, { payload }) => [payload, ...state],
  [deleteContact]: (state, { payload }) => state.filter(contact => contact.id !== payload),
});

const filter = createReducer('', {
  [filterChange]: (_, { payload }) =>  payload,
});

const  contactsReducer = combineReducers({
  items,
  filter,
});



export const store = configureStore({
  reducer: { contacts:  contactsReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

