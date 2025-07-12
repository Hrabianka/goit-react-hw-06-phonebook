import PropTypes from 'prop-types';
import styles from './ContactItem.module.css';

const Filter = ({ value, onChange }) => (
  <div>
    <label>
      Find contacts by name
      <input
        className={`${styles.inputclass} ${styles.newInputClass}`}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder='Please fill in a name.'
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;