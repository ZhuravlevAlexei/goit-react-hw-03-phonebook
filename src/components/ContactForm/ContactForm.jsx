import { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  onSubmit = evt => {
    evt.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number,
    };
    this.props.addContact(newContact);
    this.resetForm();
  };

  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.onSubmit}>
        <label className={css.contactLabel}>
          Name
          <input
            className={css.contactInput}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputChange}
          />
        </label>
        <label className={css.contactLabel}>
          Number
          <input
            className={css.contactInput}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
          />
        </label>
        <button className={css.addBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
