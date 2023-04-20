// import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from '../redux/contactSlice';
import { filterContacts } from '../redux/filterSlice';
import { getFilter, getContacts } from '../redux/selectors';

export const App = () => {
  const addContactInputRef = useRef();

  const contactList = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const contactAdd = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const id = nanoid();
    const newContact = { id: id, name: name, number: number };
    dispatch(addContact(newContact));
    form.reset();
  };

  const handleFilterChange = e => {
    const searchTerm = e.target.value;
    const filteredContacts = contactList.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(filterContacts(filteredContacts));

    if (searchTerm === '') {
      dispatch(filterContacts(''));
    }
  };

  const remove = e => {
    const number = e.currentTarget.attributes.number.value;
    dispatch(removeContact(number));

    if (filter !== '') {
      const newFilter = [...filter];
      const index = filter.findIndex(contact => contact.number === number);
      newFilter.splice(index, 1);
      dispatch(filterContacts(newFilter));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm inputRef={addContactInputRef} add={contactAdd} />
      <h2>Contacts</h2>
      <Filter filter={handleFilterChange} />
      <ContactList contacts={contactList} delite={remove} filter={filter} />
    </div>
  );
};
