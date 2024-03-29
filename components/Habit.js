import { useState, useEffect } from "react";
import EmojiModal from "./EmojiModal";
import InlineEdit from "./InlineEdit";

export default function Habit(props) {
  const [editingValue, setEditingValue] = useState(props.habit.text);
  const [checkmark, setCheckmark] = useState("/grayCheckMark.svg");
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState(props.habit.emoji);
  const [textDecoration, setTextDecoration] = useState("none");

  const deleteHandler = (e) => {
    e.stopPropagation();
    props.deleteHandler(props._id);
  };

  const completeHabit = () => {
    if (props.habit.completed === false) {
      props.editCompletedHabit(props._id, true);
      setCheckmark("/redCheckMark.svg");
      setTextDecoration("line-through");
    } else {
      props.editCompletedHabit(props._id, false);
      setCheckmark("/grayCheckMark.svg");
      setTextDecoration("none");
    }
  };

  useEffect(() => {
    if (props.habit.completed === true) {
      setCheckmark("/redCheckMark.svg");
      setTextDecoration("line-through");
    } else {
      setCheckmark("/grayCheckMark.svg");
      setTextDecoration("none");
    }
  }, [props.habit.completed]);

  useEffect(() => {
    props.editHabitTextHandler(props._id, editingValue);
  }, [editingValue]);

  useEffect(() => {
    props.editHabitEmojiHandler(props._id, emoji);
  }, [emoji]);

  const emojiClickHandler = (e) => {
    e.stopPropagation();
    setIsEmojiModalShowing(true);
  };

  return (
    <>
      {props.isEditable ? (
        <div
          className="h-96 w-96 m-4 p-6 border-2 border-black rounded-2xl group hover:border-sky-600"
          style={{ backgroundColor: props.color }}
          onClick={completeHabit}
        >
          <div className="flex justify-between relative bottom-3 left-3">
            <div className="h-52 w-28">
              <div
                className="text-9xl hover:opacity-50 hover:cursor-pointer"
                onClick={emojiClickHandler}
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
            <img className="-mr-4" src="/trash.svg" onClick={deleteHandler} />
          </div>
        </div>
      ) : (
        <div
          onClick={() => props.styleCard(props.habit._id)}
          className={props.habit.habit_card_style}
        >
          <h1>{props.habit.habit_emoji}</h1>
          <h2>{props.habit.habit_name}</h2>
        </div>
      )}
      <EmojiModal
        onClose={() => setIsEmojiModalShowing(false)}
        isEmojiModalShowing={isEmojiModalShowing}
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
