
import {  configureStore, combineReducers, createReducer, createAction } from '@reduxjs/toolkit';
import { persistStore, 
  persistReducer,  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
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

const itemsPersistConfig = {
    key: 'contacts',
    storage,
    blacklist:['filter']
  }
   


export const store = configureStore({
  reducer: { contacts: persistReducer(itemsPersistConfig, contactsReducer) },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
