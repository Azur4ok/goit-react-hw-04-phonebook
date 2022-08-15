import React from 'react';
import { nanoid } from 'nanoid';

import { ContactForm, Filter, ContactList } from './components';
import styles from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = React.useState(
    JSON.parse(window.localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    !contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? setContacts(contacts => [...contacts, newContact])
      : alert(`${name} is already in contacts.`);
  };

  const onRemoveContact = Id =>
    setContacts(contacts => contacts.filter(contact => contact.id !== Id));

  const onChangeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const onFilterContacts = () =>
    filter
      ? contacts.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;

  const filteredContacts = onFilterContacts();

  return (
    <div className={styles.app}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={onChangeFilter} />
      {contacts.length ? (
        <ContactList
          contacts={filteredContacts}
          onRemoveContact={onRemoveContact}
        />
      ) : (
        <h2 className={styles.notification}>Contact list is empty</h2>
      )}
    </div>
  );
};
