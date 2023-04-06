import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <label className={css.contactLabel}>
      Find contacts by name
      <input
        className={css.contactInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
};

export default Filter;
