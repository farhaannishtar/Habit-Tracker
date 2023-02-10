
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


const List = () => {
  const router = useRouter()
  const { asPath } = useRouter();
  const { id } = router.query;

  const [habits, setHabits] = useState([]);
  const [url, setUrl] = useState('');

  const fetchHabits = async () => {
    const habits = await fetch('/api/getHabits');
    const habitData = await habits.json();
    setHabits(habitData);
  }

  useEffect(() => { 
    console.log("use effect")
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
    setUrl(URL);
    console.log("~~~~~~~~~~~~~~ URL   ~~~~~~~~~~~~", URL);
  },)

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await fetch('/api/getHabits');
      const habitData = await habits.json();
      setHabits(habitData);
    }
    fetchHabits();
  }, [])
  
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

  const handleCreateHabitList = async (e) => {
    e.preventDefault();
    const habitList = e.target.habitlist.value;
    await editCompletedHabitListToDB(habitList);
    router.push({ pathname: `/habit-lists/${habitList}` } )
  }

  const editCompletedHabitListToDB =  async (habitList) => {
    const response = await fetch("/api/createHabitList", {
      method: "POST",
      body: JSON.stringify({
        habitList: habitList,
      }),
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
  }

  console.log("habits: ", habits);

  return (
    <div className="container">
        {/* <h3 className='completed-counter'> { habits.reduce((acc, habit) => acc + (habit.completed && habit.habitListId === id ? 1 : 0), 0) } / {habits.reduce((acc, habit) => acc + (habit.habitListId === id ? 1 : 0), 0)  } Habits Completed in Habit list: { id }</h3> */}
        <Head>
          <title>Habit Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid">
          <AddHabit habits={habits} setHabits={setHabits} id={id}/>
          {
            habits.filter(habit => {
              return habit.habitListId === id
            }).map((habit, index) => {
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
        <style jsx>{`
          .container {
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .completed-counter {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          
          .grid {
            display: flex;
            align-items: center;
            justify-content: left;
            flex-wrap: wrap;
            max-width: 1350px;
            margin-top: 3rem;
            gap: 5px 5px;
            user-select: none;
          }
          `}</style>
        <form onSubmit={async (e) => handleCreateHabitList(e)}>
          <label htmlFor="habitlist">Enter Habit list </label>
          <input type="text" id="habitlist" name="habitlist" />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() =>  navigator.clipboard.writeText(url)}>Share Habit List Link</button>
      </div>  
  )
}

export default List