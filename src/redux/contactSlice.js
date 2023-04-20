import { createSlice } from '@reduxjs/toolkit';

const localStorageContacts = localStorage.getItem('contacts');
const parsedContacts = JSON.parse(localStorageContacts);

const initialState = {
  contacts: parsedContacts || [],
};

export const contactsListSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      if (
        state.contacts.find(contact => contact.name === action.payload.name)
      ) {
        alert(`${action.payload.name} is already in contacts`);
        return;
      } else {
        state.contacts.push(action.payload);
      }
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.number !== action.payload
      );
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
  },
});

export const { addContact, removeContact } = contactsListSlice.actions;
export default contactsListSlice.reducer;
