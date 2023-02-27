import { useEffect } from "react";

export default function InlineEdit(props) {
  const { editingValue, setEditingValue, handleSubmit, emoji } = props;

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && "handleSubmit" in props) {
      handleSubmit(editingValue);
      event.target.blur();
    }
    if (event.key === "Escape" || event.key === "Enter") event.target.blur();
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(editingValue);
    } else {
      setEditingValue(event.target.value);
    }
  };

  useEffect(() => {
    const input = document.getElementById("text-box");
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
        className={
          props.textDecoration === "line-through"
            ? "line-through text-4xl font-medium font-sans w-full mt-6 p-3 bg-transparent placeholder:text-2xl focus:outline-0 hover:cursor-pointer border-0"
            : "text-4xl font-medium font-sans mt-6 p-3 w-full bg-transparent placeholder:text-2xl focus:outline-0 hover:cursor-pointer border-0"
        }
        id={"text-box"}
        placeholder="Enter Habit"
        autoComplete="off"
        onClick={(e) => e.stopPropagation()}
      />
    </>
  );
}
