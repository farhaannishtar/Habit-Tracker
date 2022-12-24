import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { useState } from 'react'
import Habit from '../components/Habit'
import uuid from 'react-uuid';
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

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
  
    // Get data from the form.
    const data = {
      habit: event.target.habit.value,
    }
  
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
  
    // API endpoint where we send form data.
    const endpoint = '/api/form'
  
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
  
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
  
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
  
    const newHabit = {
      key: uuid(),
      text: result.data,
    }
    setHabits(current => [...current, newHabit]);
    event.target.habit.value = "";
  }

  const deleteHandler = (identifier) => {
    setHabits(habits.filter(habit => habit.key !== identifier));
  }

  const editHandler = (identifier, editedHabit) => {
    const habitToEdit = habits.filter(habit => habit.key === identifier);
    habitToEdit.text = editedHabit;
    habitToEdit.key = uuid();

    deleteHandler(identifier);
    setHabits(current => [...current, habitToEdit]);
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.input} placeholder="Enter Habit" type="text" id="habit" name="habit" required />
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
      <div className="grid">
      {
        habits.map((habit, index) => {
          return <Habit key={habit.key} isEditable={true} color={cardColors[index % cardColors.length]} habit={habit} identifier={habit.key} deleteHandler={deleteHandler} editHandler={editHandler}/>
        })
      }

      </div>
        <style jsx>{`
          .grid {
            display: flex;
            align-items: center;
            justify-content: left;
            flex-wrap: wrap;
            max-width: 1250px;
            margin-top: 3rem;
            gap: 30px 50px;
            /* border: 2px solid orange;  */
          }

          .container {
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 2px solid purple;
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