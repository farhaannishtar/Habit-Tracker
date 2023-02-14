import clientPromise from '../lib/mongodb'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

export default function Home({ isConnected }) {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');


  const handleCreateHabitList = async (e) => {
    e.preventDefault();
    console.log("e.target.enterList.value: ", e.target.enterList.value, typeof e.target.enterList.value)
    if (e.target.enterList.value === "") {
      setErrorMessage("Please enter a valid name for your habit list.")
      return;
    }
    const habitList = e.target.enterList.value;
    // await editCompletedHabitListToDB(habitList);
    // router.push({ pathname: `/habit-lists/${habitList}` } )
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

  const handleEnterHabitList = async (e) => {
    e.preventDefault();
    const habitList = e.target.enterList.value;
    router.push({ pathname: `/habit-lists/${habitList}` } )
  }

  return (
    <>
      <Head>
        <title>Habit Tracker</title>
      </Head>
      <div className='flex justify-center'>
        <h1 className='m-4 text-6xl'>Habit Tracker</h1>
      </div>

      <form onSubmit={async (e) => handleCreateHabitList(e)} className="bg-white shadow-md rounded mx-[550px] px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Create New Habit List
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="enterList" type="text" placeholder="Ex. Alice's List"/>
           { errorMessage && <p class="text-red-500 text-xs italic mt-2"> { errorMessage } </p> }
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Create List
          </button>
        </div>
      </form>

      <form onSubmit={async (e) => handleEnterHabitList(e)} className="bg-white shadow-md rounded mx-[550px] px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Enter Existing Habit List
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="enterList" type="text" placeholder="Ex. Alice's List"/>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Go to List
          </button>
        </div>
      </form>
    </>
  )
}

// {isConnected ? (
//   <h2 className="subtitle">You are connected to MongoDB</h2>
//   ) : (
//     <h2 className="subtitle">
//       You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
//       for instructions.
//     </h2>
//   )}