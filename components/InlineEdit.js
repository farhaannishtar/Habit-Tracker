import { useState } from 'react';
import styles from '../styles/InlineEdit.module.css'

export default function InlineEdit(props) {
  const { value, setValue, handleSubmit } = props;
  const [editingValue, setEditingValue] = useState(value);
  
  const onChange = (event) => setEditingValue(event.target.value);
  
  const onKeyDown = (event) => {
    if (event.key === "Enter" && "handleSubmit" in props) {
      handleSubmit(editingValue);
      event.target.blur();
    }
    if (event.key === "Escape" || event.key === "Enter") event.target.blur();
  }
  
  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setEditingValue(event.target.value)
    }
  }

  return (
    <input
      type="text"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className={styles.input}
      placeholder="Enter Habit"
    />
  );
};
