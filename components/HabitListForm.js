import { useRouter } from "next/router";
import { useState } from "react";
import FormButton from "./FormButton";
import { searchHabitLists } from "../utils/api";

export default function HabitListForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (e) => {
    setShowLoader(true);
    e.preventDefault();
    const listName = e.target.listName.value.toLowerCase().trim();
    if (listName === "") {
      setErrorMessage("Please enter a valid name for your habit list.");
      setShowLoader(false);
      return;
    }
    const searchResults = await searchHabitLists(listName);
    if (searchResults.length > 0) {
      router.push({ pathname: `/habit-lists/${searchResults[0].slug}` });
      return;
    }
    setErrorMessage(
      "This habit list does not exist. Please enter a different name for your list."
    );
    setShowLoader(false);
  };

  return (
    <>
      <form
        onSubmit={async (e) => handleSubmit(e)}
        className="rounded px-8 mt-5 pb-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg mb-2"
            htmlFor="username"
          >
            already have one?
          </label>
          <input
            className="shadow border border-black rounded w-96 h-12 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="listName"
            type="text"
            placeholder="Enter existing list name, ex. Alice’s list"
          />
          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-2"> {errorMessage} </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <FormButton text="Go to list" loading={showLoader} />
        </div>
      </form>
    </>
  );
}
