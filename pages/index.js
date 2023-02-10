import clientPromise from '../lib/mongodb'
import { useRouter } from 'next/router'

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

  const router = useRouter()

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

  return (
    <>
      <div className='flex justify-around'>
        <h1 className='text-6xl'>Habit Tracker</h1>
      </div>
      <form onSubmit={async (e) => handleCreateHabitList(e)}>
        <label htmlFor="habitlist">Enter Habit list </label>
        <input className='bg-gray-300' type="text" id="habitlist" name="habitlist" />
        <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' type="submit">Submit</button>
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