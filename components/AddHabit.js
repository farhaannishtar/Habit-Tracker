import { useState } from "react";
import EmojiModal from "./EmojiModal";
import InlineEdit from "./InlineEdit";

export default function AddHabit(props) {
  const { setHabits, listId } = props;
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [editingValue, setEditingValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emoji, setEmoji] = useState("🏗");
  const checkmark = "/grayCheckMark.svg";

  const handleSubmit = async (habitText) => {
    const data = {
      slug: listId,
      text: habitText,
      emoji: emoji,
      completed: false,
    };

    const response = await fetch("/api/createHabit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    const newHabit = {
      _id: result.insertedId,
      text: habitText,
      emoji: emoji,
      completed: false,
      slug: listId,
    };
    setHabits((current) => [...current, newHabit]);
    setIsFormShowing(false);
    setEmoji("🏗");
    setEditingValue("");
  };

  const cardClickHandler = (e) => {
    setIsFormShowing(true);
  };

  return (
    <>
      <div
        className={
          isFormShowing === false
            ? "flex justify-center items-center h-96 w-96 m-4 border-8 border-dashed border-black rounded-2xl cursor-pointer hover:border-sky-600"
            : "h-96 w-96 m-4 p-6 border-8 border-dashed border-black rounded-2xl hover:border-sky-600"
        }
        onClick={cardClickHandler}
      >
        {!isFormShowing ? (
          <svg
            className="w-28 h-28"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        ) : (
          <>
            <div className="flex justify-between relative bottom-3 left-3">
              <div className="h-52 w-28">
                <div className="flex flex-col justify-center items-center h-40 mt-5 hover:cursor-pointer">
                  <div
                    className="text-9xl mb-14 hover:opacity-50"
                    onClick={() => setIsModalVisible(true)}
                  >
                    {emoji}
                  </div>
                  <div className="shadow absolute bottom-0 w-28 h-24 rounded-full bg-slate-500 opacity-20"></div>
                </div>
              </div>
              <label>
                <div className="flex justify-center p-4 m-2 rounded-full bg-white">
                  <img src={checkmark} alt="SVG as an image" />
                </div>
              </label>
            </div>
            <InlineEdit
              editingValue={editingValue}
              setEditingValue={setEditingValue}
              handleSubmit={handleSubmit}
              emoji={emoji}
            />
            <EmojiModal
              onClose={() => setIsModalVisible(false)}
              isModalVisible={isModalVisible}
              setEmoji={setEmoji}
            />
          </>
        )}
      </div>
      <style jsx>{`
        .shadow {
          -webkit-filter: blur(10px);
          -webkit-transform: scale(1, 0.2);
        }
      `}</style>
    </>
  );
}
