import PropTypes from 'prop-types';
import styles from './ContactItem.module.css';

const ContactItem = ({ id, name, number, onDeleteContact }) => (
    <li>
        {name}: {number}
        <button onClick={() => onDeleteContact(id)} className={styles.deleteclass}>Delete</button>
    </li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ContactItem;