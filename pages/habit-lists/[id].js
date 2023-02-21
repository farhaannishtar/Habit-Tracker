import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Habit from '../../components/Habit'
import AddHabit from '../../components/AddHabit';

const cardColors = [];
cardColors[0] = '#ebf5ed';
cardColors[1] = '#f9ede6';
cardColors[2] = '#faf9e5';
cardColors[3] = '#f7edf5';


export default function List() {
  const router = useRouter()
  const { asPath } = useRouter();
  const { id } = router.query;

  const [habits, setHabits] = useState([]);
  const [url, setUrl] = useState('');
  const [effect, setEffect] = useState(false);
  const [shareButtonText, setShareButtonText] = useState('Share List');
  const [message, setMessage] = useState('');

  const fetchHabits = async () => {
    const habits = await fetch('/api/getHabits');
    const habitData = await habits.json();
    setHabits(habitData);
  }

  useEffect(() => { 
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
    setUrl(URL);
    messageGenerator();
  },)

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await fetch('/api/getHabits');
      const habitData = await habits.json();
      setHabits(habitData);
    }
    fetchHabits();
  }, [])

  const messageGenerator = () => {
    const messages = ["Pick the easiest thing first!", "You’re making great progress—keep going!", "you’re on a roll!", "Crushing it!", "You completed all your habits!"];
    let feedback;
    let habitsCompleted = habits.reduce((acc, habit) => acc + (habit.completed && habit.slug === id ? 1 : 0), 0)
    let totalHabits = habits.reduce((acc, habit) => acc + (habit.slug === id ? 1 : 0), 0)

    // Do you like this ratio calculation?
    let ratio = habitsCompleted / totalHabits;
    switch (true) {
      case (ratio === undefined || ratio === null || ratio === 0):
        feedback = messages[0];
        break;
      case (ratio > 0 && ratio < 0.5):
        feedback = messages[1];
        break;
      case (ratio >= 0.5 && ratio < 0.75):
        feedback = messages[2];
        break;
      case (ratio >= 0.75 && ratio < 1):
        feedback = messages[3];
        break;
      case (ratio === 1):
        feedback = messages[4];
        break;
      default:
        break;
    }
    setMessage(`${habitsCompleted} / ${totalHabits} habits completed. ${feedback}`);
  }

  const deleteHandler = async (id) => {
    await deleteHabitToDB(id);
    setHabits(habits.filter(habit => habit.id !== id));
    await fetchHabits();
  }

  const deleteHabitToDB =  async (id) => {
    const response = await fetch("/api/deleteHabit", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
  }
  
  const editHabitTextHandler = async (id, editedText) => {
    await editHabitTextToDB(id, editedText);
    setHabits(habits => habits.filter(habit => {
      if (habit.id === id) {
        habit.text = editedText || " ";
        return habit;
      } else {
        return habit;
      } 
    }))
    await fetchHabits();
  }

  const editHabitTextToDB =  async (id, editedText) => {
    const response = await fetch("/api/editHabitText", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        editedText: editedText,
      }),
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
  }
  
  const editHabitEmojiHandler = async (id, editedEmoji) => {
    await editHabitEmojiToDB(id, editedEmoji);
    setHabits(habits => habits.filter(habit => {
      if(habit.id === id) {
        habit.emoji = editedEmoji
        return habit;
      } else {
        return habit
      }
    }))
  }

  const editHabitEmojiToDB =  async (id, editedEmoji) => {
    const response = await fetch("/api/editHabitEmoji", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        editedEmoji: editedEmoji,
      }),
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
  }
  
  const editCompletedHabit = async (id, isCompleted) => {
    await editCompletedHabitToDB(id, isCompleted);
    setHabits(habits => habits.filter(habit => {
      if(habit._id === id) {
        habit.completed = isCompleted;
        return habit;
      } else {
        return habit;
      }
    }))
    await fetchHabits();
  }

  const editCompletedHabitToDB =  async (id, isCompleted) => {
    const response = await fetch("/api/editCompleteStatus", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        isCompleted: isCompleted,
      }),
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
  }

  const shareHabitButtonHandler = () => { 
    navigator.clipboard.writeText(url);
    setEffect(true);
    setShareButtonText('URL Copied');
  }

  const homeButtonHandler = () => {
    router.push('/');
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Head>
          <title>Habit Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='flex w-full justify-between'>
          <div>
            <button 
              className="bg-blue-500 hover:bg-blue-700 ml-20 mt-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={homeButtonHandler}
              >
              Home
            </button>
          </div>
          <div>
            <h1 className='text-4xl font-bold text-center mt-6'> { id } </h1>
            <h3 className='mx-4 mt-6'> { message }</h3>
          </div>  
          <div>
            <button 
              className={`${ effect && `animate-wiggle`} bg-blue-500 hover:bg-blue-700 mr-20 mt-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={shareHabitButtonHandler}
              onAnimationEnd={() => setEffect(false)}
              >
              { shareButtonText }</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap mt-10 gap-2 select-none"> 
          <AddHabit habits={habits} setHabits={setHabits} id={id}/>
          {
            habits.filter(habit => {
              return habit.habitListId === id;
            })
            .map((habit, index) => {
              return <Habit 
              key={habit._id}
              _id={habit._id} 
              isEditable={true} 
              color={cardColors[index % cardColors.length]} 
              habit={habit} 
              setHabits={setHabits}
              editCompletedHabit={editCompletedHabit}
              deleteHandler={deleteHandler} 
              editHabitTextHandler={editHabitTextHandler} 
              editHabitEmojiHandler={editHabitEmojiHandler}/>
            })
          }
        </div>
      </div>  
    </>
  )
}