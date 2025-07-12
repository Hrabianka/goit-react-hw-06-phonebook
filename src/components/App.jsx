import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter, selectContacts, selectFilter } from '../redux/contactSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import styles from './ContactForm.module.css';

const App = () => {

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    if (
      contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
    }
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = filter => {
    dispatch(setFilter(filter));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />
        <h1>Contacts</h1>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
}

export default App;