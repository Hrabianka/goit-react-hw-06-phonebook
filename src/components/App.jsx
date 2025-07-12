import { ContactContext } from './ContactContext';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './ContactForm.module.css';
import Filter from './Filter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => { 
    const localSavedContacts = localStorage.getItem('contacts');

    return localSavedContacts ? JSON.parse(localSavedContacts)
    : [
      { id: 'id-1', name: 'Billy Raw', number: '567-11-00' },
      { id: 'id-2', name: 'Mara Too', number: '746-92-10' },
      { id: 'id-3', name: 'Gaga Style', number: '654-02-45' },
      { id: 'id-4', name: 'Michael Freakson', number: '321-09-65' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localSavedContacts = localStorage.getItem('contacts');

    if (localSavedContacts) {
      setContacts(JSON.parse(localSavedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('DidUpdate - App - Contacts saved to local storage', contacts);
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const lowerContactName = name.toLowerCase();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === lowerContactName
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(previousContacts => [...previousContacts, newContact]);
    }
  };
  
  const handleDeleteContact = id => {
    setContacts(previousContacts =>
      previousContacts.filter(contact => contact.id !== id)
    );
  }

  const handleFilterChange = filter => {
    setFilter(filter);
  }

  const getFilteredContacts = () => {
    const filterLower = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(filterLower));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <ContactContext.Provider
      value={{
        contacts: filteredContacts,
        onAddContact: handleAddContact,
        onDeleteContact: handleDeleteContact,
        filter,
        onFilterChange: handleFilterChange,
      }}
    >
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm />
        <h1>Contacts</h1>
        <Filter />
        <ContactList />
      </div>
    </ContactContext.Provider>
  );
}
export default App;