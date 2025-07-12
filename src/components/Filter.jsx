import { ContactContext } from './ContactContext';
import { useContext } from 'react';
import styles from './ContactItem.module.css'

const Filter = () => {
  const { filter, onFilterChange } = useContext(ContactContext);

  const handleFilterChange = event => {
    onFilterChange(event.target.value);
  }

  return (
    <div>
      <label>
        Find contacts by name
        <input
         className={`${styles.inputclass} ${styles.newInputClass}`}
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder='Please fill in a name.'
        />
      </label>
    </div>
  );
};

export default Filter;