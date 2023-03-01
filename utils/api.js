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

export const getHabits = async (listId) => {
  const habits = await fetch(`/api/getHabits?listId=${listId}`);
  const habitData = await habits.json();
  return habitData;
};

export const deleteHabit = async (id) => {
  const response = await fetch("/api/deleteHabit", {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateHabitText = async (id, editedText) => {
  const response = await fetch("/api/editHabitText", {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      editedText: editedText,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateHabitEmoji = async (id, editedEmoji) => {
  const response = await fetch("/api/editHabitEmoji", {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      editedEmoji: editedEmoji,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const toggleCompleteStatus = async (id) => {
  const response = await fetch("/api/editCompleteStatus", {
    method: "PUT",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
