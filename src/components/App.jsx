import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'store/contacts/slice';

const App = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);

  const getFilteredItems = () => {
    return contacts.filter(el => {
      return el.name.toLowerCase().includes(filter);
    });
  };

  function handleAddContacts(newData) {
    if (
      contacts.find(
        item => item.name.toLowerCase() === newData.name.toLowerCase()
      )
    ) {
      alert(`${newData.name} is already in contacts.`);
    } else {
      dispatch(addContact({ id: nanoid(), ...newData }));
    }
  }

  return (
    <div
      style={{
        color: '#010101',
        padding: '20px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleAddContacts={handleAddContacts} />
      <h2>Contacts</h2>
      <Filter />
      <ContactList contactList={getFilteredItems()} />
    </div>
  );
};

export default App;
