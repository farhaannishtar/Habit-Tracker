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

// Polish the UI

export default function Home() {
  return (
    <div className='min-h-screen min-w-screen flex justify-center items-center'>
      <Head>
        <title>Habit Tracker</title>
      </Head>
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <h1 className='text-4xl text-center'>Welcome to Habit Tracker</h1>
        </div>
        <div className='flex justify-center mt-2 mb-2'>
          <div className='w-96'>
            <h3 className='text-center text-lg text-gray-500'>Create a list of habits you're trying to build. Check them off on this site and share the list with your friends</h3>
          </div>
        </div>
        <CreateHabitListForm />
        <HabitListForm />
      </div>
    </div>
  )
}
