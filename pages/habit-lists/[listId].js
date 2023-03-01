import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import Habit from "../../components/Habit";
import AddHabit from "../../components/AddHabit";
import {
  getHabits,
  deleteHabit,
  updateHabitText,
  updateHabitEmoji,
  toggleCompleteStatus,
} from "../../utils/api";

const cardColors = [];
cardColors[0] = "#ebf5ed";
cardColors[1] = "#f9ede6";
cardColors[2] = "#faf9e5";
cardColors[3] = "#f7edf5";

export default function List() {
  const router = useRouter();
  const { asPath } = useRouter();
  const { listId } = router.query;

  const [habits, setHabits] = useState([]);
  const [url, setUrl] = useState("");
  const [effect, setEffect] = useState(false);
  const [shareButtonText, setShareButtonText] = useState("Share List");
  const [message, setMessage] = useState("");
  const [listName, setListName] = useState("");

  let habitsCompleted = habits.reduce(
    (acc, habit) => acc + (habit.completed ? 1 : 0),
    0
  );
  let totalHabits = habits.length;

  useEffect(() => {
    if (!listId) return;
    const getListName = async () => {
      const habitLists = await fetch(`/api/getListName?listId=${listId}`);
      const habitList = await habitLists.json();
      setListName(habitList[0].usersInput);
    };
    const getHabits = async () => {
      const habits = await fetch(`/api/getHabits?listId=${listId}`);
      const habitData = await habits.json();
      setHabits(habitData);
    };
    getListName();
    getHabits(listId);
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const URL = `${origin}${asPath}`;
    setUrl(URL);
  }, [listId]);

  useEffect(() => {
    messageGenerator(habitsCompleted, totalHabits);
  }, [habitsCompleted, totalHabits]);

  const messageGenerator = (habitsCompleted, totalHabits) => {
    let feedback;

    let ratio = habitsCompleted / totalHabits;
    switch (true) {
      case ratio === 0:
        feedback = "Pick the easiest thing first!";
        break;
      case ratio > 0 && ratio < 0.5:
        feedback = "You’re making great progress—keep going!";
        break;
      case ratio >= 0.5 && ratio < 0.75:
        feedback = "You’re on a roll!";
        break;
      case ratio >= 0.75 && ratio < 1:
        feedback = "Crushing it!";
        break;
      case ratio === 1:
        feedback = "You completed all your habits!";
        break;
      default:
        break;
    }
    totalHabits === 0
      ? setMessage("Add a habit to your list!")
      : setMessage(
          `${habitsCompleted} / ${totalHabits} habits completed. ${feedback}`
        );
  };

  const deleteHandler = async (id) => {
    await deleteHabit(id);
    setHabits(await getHabits(listId));
  };

  const updateHabitTextHandler = async (id, editedText) => {
    await updateHabitText(id, editedText);
    setHabits(await getHabits(listId));
  };

  const updateHabitEmojiHandler = async (id, editedEmoji) => {
    await updateHabitEmoji(id, editedEmoji);
    setHabits(await getHabits(listId));
  };

  const updateCompleteStatus = async (id) => {
    await toggleCompleteStatus(id);
    setHabits(await getHabits(listId));
  };

  const onShareHabit = () => {
    navigator.clipboard.writeText(url);
    setEffect(true);
    setShareButtonText("URL Copied");
  };

  const onHomeButtonClick = () => {
    router.push("/");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Head>
          <title>Habit Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex w-full justify-between">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 ml-20 mt-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onHomeButtonClick}
            >
              Home
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-6">
              {" "}
              {listName}{" "}
            </h1>
            <h3 className="mx-4 mt-6 text-center"> {message} </h3>
          </div>
          <div>
            <button
              className={`${
                effect && `animate-wiggle`
              } bg-blue-500 hover:bg-blue-700 mr-20 mt-6 text-white font-bold w-28 h-10 rounded focus:outline-none focus:shadow-outline`}
              onClick={onShareHabit}
              onAnimationEnd={() => setEffect(false)}
            >
              {shareButtonText}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap mt-10 gap-2 select-none">
          <AddHabit habits={habits} setHabits={setHabits} listId={listId} />
          {habits.map((habit, index) => {
            return (
              <Habit
                key={habit._id}
                id={habit._id}
                color={cardColors[index % cardColors.length]}
                habit={habit}
                updateCompleteStatus={updateCompleteStatus}
                deleteHandler={deleteHandler}
                updateHabitTextHandler={updateHabitTextHandler}
                updateHabitEmojiHandler={updateHabitEmojiHandler}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
