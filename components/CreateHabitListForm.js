import { useRouter } from "next/router";
import { useState } from "react";
import FormButton from "./FormButton";

export default function CreateHabitListForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    let usersInput = e.target.listName.value.trim();
    let listName = e.target.listName.value.toLowerCase().trim();

    if (listName.trim() === "") {
      setErrorMessage("Please enter a name for your habit list.");
      setShowLoader(false);
      return;
    }

    if (!/\d|[A-z]/.test(listName)) {
      setErrorMessage("Habit list must contain at least one letter or number.");
      setShowLoader(false);
      return;
    }

    const habitLists = await getHabitListsFromDB();
    for (let i = 0; i < habitLists.length; i++) {
      if (habitLists[i].listName === listName) {
        setErrorMessage(
          "This habit list already exists. Please enter a different name for your list."
        );
        setShowLoader(false);
        return;
      }
    }
    const slug = listName
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    await createHabitListToDB(listName, slug, usersInput);
    router.push({ pathname: `/habit-lists/${slug}` });
  };

  const getHabitListsFromDB = async () => {
    const response = await fetch("/api/getHabitLists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const createHabitListToDB = async (listName, slug, usersInput) => {
    const response = await fetch("/api/createHabitList", {
      method: "POST",
      body: JSON.stringify({
        listName: listName,
        slug: slug,
        usersInput: usersInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <form
        onSubmit={async (e) => handleSubmit(e)}
        className="rounded px-8 mt-5 pb-8"
      >
        <div className="mb-4">
          <input
            className="shadow border border-black rounded w-96 h-12 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="listName"
            type="text"
            placeholder="Enter new list name"
          />
          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-2"> {errorMessage} </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <FormButton text="Create new list" loading={showLoader} />
        </div>
      </form>
    </>
  );
}
