import { ContactContext } from './ContactContext';
import { useContext } from 'react';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts, onDeleteContact } = useContext(ContactContext);

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} {...contact} onDeleteContact={onDeleteContact} />
      ))}
    </ul>
  );
};

export default ContactList;