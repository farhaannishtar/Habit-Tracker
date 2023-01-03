import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { useState } from 'react'
import Habit from '../components/Habit'
import styles from '../styles/index.module.css'
import AddHabit from '../components/AddHabit';

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

  const deleteHandler = (identifier) => {
    setHabits(habits.filter(habit => habit.key !== identifier));
  }

  const editHabitTextHandler = (identifier, editedText) => {
    setHabits(habits => habits.filter(habit => habit.key === identifier ? habit.text = editedText : habit))
  }

  const editHabitEmojiHandler = (identifier, editedEmoji) => {
    setHabits(habits => habits.filter(habit => habit.key === identifier ? habit.emoji = editedEmoji : habit))
  }

  return (
    <>  
      <div className={styles.headerContainer}>
        <h1>Habit Tracker</h1>
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
          return <Habit key={habit.key} isEditable={true} color={cardColors[index % cardColors.length]} habit={habit} setHabits={setHabits} identifier={habit.key} deleteHandler={deleteHandler} editHabitTextHandler={editHabitTextHandler} editHabitEmojiHandler={editHabitEmojiHandler}/>
        })
      }
      </div>
        <style jsx>{`
          .grid {
            display: flex;
            align-items: center;
            justify-content: left;
            flex-wrap: wrap;
            max-width: 1350px;
            margin-top: 3rem;
            gap: 5px 5px;
            /* border: 2px solid orange;  */
          }

          .container {
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            /* border: 2px solid purple; */
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