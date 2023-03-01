import { useState, useEffect } from "react";
import EmojiModal from "./EmojiModal";
import InlineEdit from "./InlineEdit";

export default function Habit(props) {
  const { text } = props.habit;
  const {
    id,
    deleteHandler,
    updateCompleteStatus,
    updateHabitTextHandler,
    updateHabitEmojiHandler,
  } = props;
  const [editingValue, setEditingValue] = useState(text);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emoji, setEmoji] = useState(props.habit.emoji);
  const textDecoration = props.habit.completed ? "line-through" : "none";
  const checkmark = props.habit.completed
    ? "/redCheckMark.svg"
    : "/grayCheckMark.svg";

  const onDeleteHabit = (e) => {
    e.stopPropagation();
    deleteHandler(id);
  };

  const onHabitCardClick = () => {
    updateCompleteStatus(id);
  };

  useEffect(() => {
    updateHabitTextHandler(id, editingValue);
  }, [editingValue]);

  useEffect(() => {
    updateHabitEmojiHandler(id, emoji);
  }, [emoji]);

  const onEmojiClick = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  return (
    <>
      <div
        className="h-96 w-96 m-4 p-6 border-2 border-black rounded-2xl group hover:border-sky-600"
        style={{ backgroundColor: props.color }}
        onClick={onHabitCardClick}
      >
        <div className="flex justify-between relative bottom-3 left-3">
          <div className="h-52 w-28">
            <div
              className="text-9xl hover:opacity-50 hover:cursor-pointer"
              onClick={onEmojiClick}
            >
              {emoji}
            </div>
            <div className="shadow absolute bottom-0 w-28 h-24 rounded-full bg-slate-500 opacity-20"></div>
          </div>
          <div>
            <div className="flex justify-center p-4 m-2 rounded-full bg-white hover:cursor-pointer">
              <img src={checkmark} alt="SVG as an image" />
            </div>
          </div>
        </div>
        <div>
          <InlineEdit
            editingValue={editingValue}
            setEditingValue={setEditingValue}
            textDecoration={textDecoration}
          />
        </div>
        <div className="hidden group-hover:flex w-full box-content justify-end mt-7 hover:cursor-pointer">
          <img className="-mr-4" src="/trash.svg" onClick={onDeleteHabit} />
        </div>
      </div>
      <EmojiModal
        onClose={() => setIsModalVisible(false)}
        isModalVisible={isModalVisible}
        setEmoji={setEmoji}
      />
      <style jsx>{`
        .shadow {
          -webkit-filter: blur(10px);
          -webkit-transform: scale(1, 0.2);
        }
      `}</style>
    </>
  );
}
