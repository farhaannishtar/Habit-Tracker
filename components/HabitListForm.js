// Modified this file to restyle form

import { useRouter } from 'next/router'
import { useState } from 'react'

export default function HabitListForm() {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const habitList = e.target.listName.value.toLowerCase();
    if (habitList === "") {
      setErrorMessage("Please enter a valid name for your habit list.")
      return;
    }
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
      <form onSubmit={async (e) => handleSubmit(e)} className="rounded px-8 mt-5 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="username">
            already have one?
          </label>
          <input className="shadow border border-black rounded w-96 h-12 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="listName" type="text" placeholder="Enter existing list name, ex. Alice’s list"/>
          { errorMessage && <p className="text-red-500 text-xs italic mt-2"> { errorMessage } </p> }
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-800 text-black text-3xl w-96 h-12 py-1 rounded focus:outline-none focus:shadow-outline" type="submit">
            go to list
          </button>
        </div>
      </form>
    </>
  )
}
