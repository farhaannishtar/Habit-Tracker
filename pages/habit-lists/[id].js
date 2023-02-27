import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import Habit from "../../components/Habit";
import AddHabit from "../../components/AddHabit";

const cardColors = [];
cardColors[0] = "#ebf5ed";
cardColors[1] = "#f9ede6";
cardColors[2] = "#faf9e5";
cardColors[3] = "#f7edf5";

export default function List() {
  const router = useRouter();
  const { asPath } = useRouter();
  const { id } = router.query;

  const [habits, setHabits] = useState([]);
  const [url, setUrl] = useState("");
  const [effect, setEffect] = useState(false);
  const [shareButtonText, setShareButtonText] = useState("Share List");
  const [message, setMessage] = useState("");
  const [listName, setListName] = useState("");

  let habitsCompleted = habits.reduce(
    (acc, habit) => acc + (habit.completed && habit.slug === id ? 1 : 0),
    0
  );
  let totalHabits = habits.reduce(
    (acc, habit) => acc + (habit.slug === id ? 1 : 0),
    0
  );

  useEffect(() => {
    if (!id) return;
    const fetchListName = async () => {
      const habitLists = await fetch(`/api/getListName?id=${id}`);
      const habitList = await habitLists.json();
      setListName(habitList[0].listName);
    };
    fetchListName();
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const URL = `${origin}${asPath}`;
    setUrl(URL);
  }, [id]);

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await fetch("/api/getHabits");
      const habitData = await habits.json();
      setHabits(habitData);
    };
    fetchHabits();
  }, []);

  useEffect(() => {
    messageGenerator(habitsCompleted, totalHabits);
  }, [habitsCompleted, totalHabits]);

  const fetchHabits = async () => {
    const habits = await fetch("/api/getHabits");
    const habitData = await habits.json();
    setHabits(habitData);
  };

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
    console.log("messageGenerator called");
  };

  const deleteHandler = async (id) => {
    const response = await fetch("/api/deleteHabit", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchHabits();
  };

  const editHabitTextHandler = async (id, editedText) => {
    const response = await fetch("/api/editHabitText", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        editedText: editedText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchHabits();
  };

  const editHabitEmojiHandler = async (id, editedEmoji) => {
    const response = await fetch("/api/editHabitEmoji", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        editedEmoji: editedEmoji,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchHabits();
  };

  const editCompletedHabit = async (id, isCompleted) => {
    const response = await fetch("/api/editCompleteStatus", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        isCompleted: isCompleted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchHabits();
  };

  const shareHabitButtonHandler = () => {
    navigator.clipboard.writeText(url);
    setEffect(true);
    setShareButtonText("URL Copied");
  };

  const homeButtonHandler = () => {
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
              onClick={homeButtonHandler}
            >
              Home
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-6">
              {" "}
              {listName}{" "}
            </h1>
            <h3 className="mx-4 mt-6"> {message}</h3>
          </div>
          <div>
            <button
              className={`${
                effect && `animate-wiggle`
              } bg-blue-500 hover:bg-blue-700 mr-20 mt-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={shareHabitButtonHandler}
              onAnimationEnd={() => setEffect(false)}
            >
              {shareButtonText}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap mt-10 gap-2 select-none">
          <AddHabit habits={habits} setHabits={setHabits} id={id} />
          {habits
            .filter((habit) => {
              return habit.slug === id;
            })
            .map((habit, index) => {
              return (
                <Habit
                  key={habit._id}
                  _id={habit._id}
                  isEditable={true}
                  color={cardColors[index % cardColors.length]}
                  habit={habit}
                  setHabits={setHabits}
                  editCompletedHabit={editCompletedHabit}
                  deleteHandler={deleteHandler}
                  editHabitTextHandler={editHabitTextHandler}
                  editHabitEmojiHandler={editHabitEmojiHandler}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
