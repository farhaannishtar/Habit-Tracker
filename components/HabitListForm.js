import { useRouter } from 'next/router'
import { useState } from 'react'

export default function HabitListForm() {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.listName.value.trim() === "") {
      setErrorMessage("Please enter a valid name for your habit list.")
      return;
    }
    const habitList = e.target.listName.value;
    const habitLists = await getHabitListsFromDB();
    for (let i = 0; i < habitLists.length; i++) {
      if (habitLists[i].habitListId === habitList) {
        router.push({ pathname: `/habit-lists/${habitList}` } )
        return;
      }
    }
    setErrorMessage("This habit list does not exist. Please enter a different name for your list.")
  }
  const getHabitListsFromDB = async () => {
    const response = await fetch("/api/getHabitLists", {
      method: "GET",
      headers:
      {
        "Content-Type":
        "application/json",
      },
    });
    const data = await response.json();
    return data;
  }


  return (
    <>
      <div className='mx-60'>
        <form onSubmit={async (e) => handleSubmit(e)} className="bg-white shadow-md rounded mx-60 px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Enter Existing Habit List
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="listName" type="text" placeholder="Ex. Alice's List"/>
            { errorMessage && <p className="text-red-500 text-xs italic mt-2"> { errorMessage } </p> }
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Go to List
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
