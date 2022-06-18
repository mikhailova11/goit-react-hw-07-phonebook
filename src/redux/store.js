
import {  configureStore, combineReducers, createReducer, createAction } from '@reduxjs/toolkit';
import {  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';

import logger from 'redux-logger';
import { addContact, deleteContact, fetchContacts } from './operation';


export const filterChange = createAction('filterChange');


const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, {payload}) => payload,
  [addContact.fulfilled]: (state, { payload }) => [payload, ...state],
  [deleteContact.fulfilled]: (state, { payload }) => state.filter(contact => contact.id !== payload),
  
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


