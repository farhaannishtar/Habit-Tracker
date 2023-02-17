// Modified this file to restyle form

import { useRouter } from 'next/router'
import { useState } from 'react'

export default function CreateHabitListForm() {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newList = e.target.newList.value.toLowerCase();

    if (newList === "") {
      setErrorMessage("Please enter a valid name for your habit list.")
      return;
    }

    const habitLists = await getHabitListsFromDB();
    for (let i = 0; i < habitLists.length; i++) {
      if (habitLists[i].habitListId === newList) {
        setErrorMessage("This habit list already exists. Please enter a different name for your list.")
        return; 
      }
    }
    await createHabitListToDB(newList);
    router.push({ pathname: `/habit-lists/${newList}` } )
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

  const createHabitListToDB =  async (habitList) => {
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
      <form onSubmit={async (e) => handleSubmit(e)} className="rounded px-8 mt-5 pb-8">
        <div className="mb-4">
          <input className="shadow border border-black rounded w-96 h-12 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="newList" type="text" placeholder="Enter new list name"/>
          { errorMessage && <p className="text-red-500 text-xs italic mt-2"> { errorMessage } </p> }
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-800 text-black text-3xl w-96 h-12 py-1 rounded focus:outline-none focus:shadow-outline" type="submit">
            create new list
          </button>
        </div>
      </form>
    </>
  )
}