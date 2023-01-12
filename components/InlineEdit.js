import { useEffect } from 'react';

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
    <>
      <input
        type="text"
        aria-label="Habit name"
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className="input"
        id={'text-box'}
        placeholder="Enter Habit"
        autoComplete="off"
      />
      <style jsx>{`
      .input {
        background-color: transparent;
        border: 0;
        width: 70%;
        padding: 8px;
        font-size: 40px;
        font-weight: 500; 
        font-family: sans-serif;
        text-decoration: ${props.textDecoration};
      }

      .input:hover {
        cursor: pointer;
      }

      .input:focus {
        outline: none;
      }

      .input::placeholder {
        font-size: 25px
      }

      `}</style>
    </>
  );
};
