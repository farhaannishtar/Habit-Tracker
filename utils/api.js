export const searchHabitLists = async (query) => {
  const response = await fetch(`/api/searchHabitLists?query=${query}`);
  const data = await response.json();
  return data;
};

export const createHabitList = async (listName, slug, usersInput) => {
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
