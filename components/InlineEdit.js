import { useEffect } from 'react';
import styles from '../styles/InlineEdit.module.css'

export default function InlineEdit(props) {
  const { editingValue, setEditingValue, handleSubmit, emoji } = props;

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
      setEditingValue(editingValue);
    } else {
      setEditingValue(event.target.value)
    }
  }

  useEffect(() => {
    const input = document.getElementById('text-box');
    input.focus();
  }, [emoji]);

  return (
    <input
      type="text"
      aria-label="Habit name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className={styles.input}
      id={'text-box'}
      placeholder="Enter Habit"
    />
  );
};
