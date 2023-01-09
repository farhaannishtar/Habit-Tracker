import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { useState, useEffect } from 'react'
import Habit from '../components/Habit'
import AddHabit from '../components/AddHabit';
import styles from '../styles/index.module.css'

export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

const cardColors = [];
cardColors[0] = '#ebf5ed';
cardColors[1] = '#f9ede6';
cardColors[2] = '#faf9e5';
cardColors[3] = '#f7edf5';


export default function Home({ isConnected }) {
  
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState(0);

  const deleteHandler = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  }

  const editHabitTextHandler = (id, editedText) => {
    setHabits(habits => habits.filter(habit => {
      if (habit.id === id) {
        habit.text = editedText || " ";
        return habit;
      } else {
        return habit;
      } 
    }))
  }

  const editHabitEmojiHandler = (id, editedEmoji) => {
    setHabits(habits => habits.filter(habit => {
      if(habit.id === id) {
        habit.emoji = editedEmoji
        return habit;
      } else {
        return habit
      }
    }))
  }

  const updateCompletedHabits = (id, isCompleted) => {
    setHabits(habits => habits.filter(habit => {
      if(habit.id === id) {
        habit.completed = isCompleted
        return habit;
      } else {
        return habit
      }
    }))
  }

  useEffect(() => {
    let count = 0;
    habits.forEach(habit => {
      if (habit.completed === true) count++;
    })
    setCompletedHabits(count);
  }, [habits])

  return (
    <>
      <div className={styles.header}>
        <h1>Habit Tracker</h1>
        <h3> {completedHabits} / {habits.length} Habits Completed</h3>
      </div> 
      <div className="container">
        <Head>
          <title>Habit Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid">
          <AddHabit habits={habits} setHabits={setHabits}/>
          {
            habits.map((habit, index) => {
              return <Habit 
                key={habit.id}
                id={habit.id} 
                isEditable={true} 
                color={cardColors[index % cardColors.length]} 
                habit={habit} 
                setHabits={setHabits}
                updateCompletedHabits={updateCompletedHabits}
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

          .grid {
            display: flex;
            align-items: center;
            justify-content: left;
            flex-wrap: wrap;
            max-width: 1350px;
            margin-top: 3rem;
            gap: 5px 5px;
          }
          `}</style>
      </div> 
    </>
  )
}

    // The code below is to check if this app is connected to the database

    {/* 
    <main>
      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2>You are NOT connected to MongoDB.</h2>
      )}
    </main> */}