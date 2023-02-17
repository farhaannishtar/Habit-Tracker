// Modified this file to restyle form
// I'm really sorry. When I made these commits, I was on a different branch on a different PR
// The changes I made to this file was to re-style the two form components and the home page
// I'll be more careful next time. I wasn't thinking

import clientPromise from '../lib/mongodb'
import Head from 'next/head'
import CreateHabitListForm from '../components/createHabitListForm'
import HabitListForm from '../components/HabitListForm'

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Habit Tracker</title>
      </Head>
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <h1 className='m-4 text-6xl text-center'>Habit Tracker</h1>
        </div>
        <div className='flex justify-center mt-4 mb-2'>
          <div className='w-96'>
            <h3 className='text-center text-xl'>Create a list of habits you're trying to build. Check them off on this site and share the list with your friends</h3>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <CreateHabitListForm />
        <HabitListForm />
      </div>
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
