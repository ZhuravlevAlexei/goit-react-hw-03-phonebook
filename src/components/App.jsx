import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactElement from './ContactElement/ContactElement';

const CONTACTS_STORAGE_KEY = 'CONTACTS';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const serializedState = localStorage.getItem(CONTACTS_STORAGE_KEY);
      if (serializedState) {
        this.setState({ contacts: JSON.parse(serializedState) });
      } else {
        this.setState({
          contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
          ],
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      try {
        const serializedState = JSON.stringify(this.state.contacts);
        localStorage.setItem(CONTACTS_STORAGE_KEY, serializedState);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  addContact = contact => {
    const { contacts } = this.state;
    const foundContact = contacts.find(
      cont => cont.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (foundContact) {
      alert(`${foundContact.name} is already in contacts.`);
      return;
    }

    contact.id = nanoid();
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleFilterChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { filter, contacts } = this.state;
    const loFilter = filter.toLowerCase();
    const contactsCash = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(loFilter);
    });

    return (
      <div className={css.phonebookArea}>
        <h3 className={css.mainTitle}>Phonebook</h3>
        <ContactForm addContact={this.addContact} />
        <h3>Contacts</h3>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList>
          <ContactElement
            contactsCash={contactsCash}
            deleteContact={this.deleteContact}
          />
        </ContactList>
      </div>
    );
  }
}

App.propTypes = {
  contact: PropTypes.objectOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      contacts: PropTypes.objectOf({
        name: PropTypes.string.isRequired,
        number: PropTypes.string,
      }),
    })
  ),
};

export default App;
