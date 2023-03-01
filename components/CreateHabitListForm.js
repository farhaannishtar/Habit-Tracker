import { useRouter } from "next/router";
import { useState } from "react";
import FormButton from "./FormButton";
import { createHabitList, searchHabitLists } from "../utils/api";

export default function CreateHabitListForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    let usersInput = e.target.listName.value.trim();
    let listName = e.target.listName.value.toLowerCase().trim();

    if (listName === "") {
      setErrorMessage("Please enter a name for your habit list.");
      setShowLoader(false);
      return;
    }

    if (!/\d|[A-z]/.test(listName)) {
      setErrorMessage("Habit list must contain at least one letter or number.");
      setShowLoader(false);
      return;
    }

    const searchResults = await searchHabitLists(listName);
    if (searchResults.length > 0) {
      setErrorMessage(
        "This habit list already exists. Please enter a different name for your list."
      );
      setShowLoader(false);
      return;
    }

    const slug = slugify(listName);
    await createHabitList(listName, slug, usersInput);
    router.push({ pathname: `/habit-lists/${slug}` });
  };

  const slugify = (string) => {
    return string
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&/g, "-and-")
      .replace(/[\s\W-]+/g, "-");
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
