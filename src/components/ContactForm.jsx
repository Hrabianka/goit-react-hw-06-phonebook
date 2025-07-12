import { useState, useEffect, useRef, useContext } from 'react';
import { ContactContext } from './ContactContext';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const { onAddContact } = useContext(ContactContext);

  const nameInputRef = useRef(null);
  const numberInputRef = useRef(null);

  useEffect(() => {
    const savedName = localStorage.getItem('name');

    console.log('DidMount *** Contact form - Content from local storage: ', savedName);

    if (savedName) {
      setName(JSON.parse(savedName));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
    console.log(
      'DidUpdate *** Contact form - Content from local storage: ',
      localStorage.contacts
    );
  }, [name]);

  useEffect(() => {
    return () => {
      console.log('WillUnmount - Contact form - Saving name to local storage');
      localStorage.setItem('name', JSON.stringify(name));
    };
  }, [name]);

  const handleChange = event => {
    const { name, value } = event.target;

    // Clear error when user starts typing
    setError('');

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Validation using regex
    const nameRegex = /^[a-zA-Z]+((['\-\s][a-zA-Z ])?[a-zA-Z]*)*$/;
    const phoneRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (!nameRegex.test(name)) {
      setError('The name may only contain letters, apostrophe, dash and spaces.');
      return;
    }

    if (!phoneRegex.test(number)) {
      setError('The phone number is not in the right format.');
      return;
    }

    onAddContact(name, number);

    setName('');
    setNumber('');
    setError('');
    nameInputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formclass}>
      <label className={styles.labelclass}>
        Name
        <input
          className={styles.inputclass}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Mara, Stella Artois, Bill Gates."
          required
          value={name}
          onChange={handleChange}
          ref={nameInputRef}
          placeholder="Ex: Jack Sparrow"
        />
      </label>
      <label className={styles.labelclass}>
        Number
        <input
          className={styles.inputclass}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes or parentheses."
          required
          value={number}
          onChange={handleChange}
          ref={numberInputRef}
          placeholder="Ex: 123-44-56"
        />
      </label>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.buttonclass}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;