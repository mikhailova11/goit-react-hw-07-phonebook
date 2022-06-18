import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://62ade165645d00a28a0155dd.mockapi.io/api/contacts/';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts',
  async() => { 
    const {data} =  await axios.get('/contacts')
  return data
  }   
)


export const addContact = createAsyncThunk('phonebook/addContact', async contact => {
  const { data } = await axios.post('/contacts/', contact);
  return data;
});

export const deleteContact =  createAsyncThunk('contacts/deleteContact',
async(id) => {

  await axios.delete(`/contacts/${id}`)
  return id
}
)

  
