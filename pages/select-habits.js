// This file used the new habit card component
import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { useState } from 'react'
import Habit from '../components/Habit'
import styles from '../styles/select-habits.module.css'

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

const sampleHabits = [
  {
    id: 1,
    habit_name: 'Running',
    habit_emoji: '🏃',
    habit_card_style: "card"
  },
  {
    id: 2,
    habit_name: 'Meditation',
    habit_emoji: '🧘',
    habit_card_style: "card"
  },
  {
    id: 3,
    habit_name: 'Eating Healthy',
    habit_emoji: '🥬',
    habit_card_style: "card"
  },
  {
    id: 4,
    habit_name: 'Lifting Weights',
    habit_emoji: '🏋️',
    habit_card_style: "card"
  },
  {
    id: 5,
    habit_name: 'Reading',
    habit_emoji: '📚',
    habit_card_style: "card"
  }
]


export default function Home({ isConnected }) {
  
  const [refresh, setRefresh] = useState(false);

  const styleCard = (id) => {
    let habit = sampleHabits.filter(habit => habit.id === id);
    console.log(habit[0]);
    if (habit[0].habit_card_style === "cardClicked") {
      habit[0].habit_card_style = "card";
    } else {
      habit[0].habit_card_style = "cardClicked"
    }
    setRefresh(!refresh);
  }

  return (
    <>  
      <div className={styles.headerContainer}>
        <h1>Habit Tracker</h1>
        <div className={styles.subheaderContainer}>
          <h4 className={styles.subheader}>Choose your daily habits, you can choose more than one</h4>
        </div>
      </div>
      <div className="container">
        <Head>
          <title>Habit Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid">
          {
            sampleHabits.map(habit => {
                return <Habit key={habit.id} cardType={"sample"} habit={habit} styleCard={styleCard} identifier={habit.key}/>
              })
          }
        </div>     
        <style jsx>{`
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 1000px;
            margin-top: 3rem;
          }

          .container {
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  )
}