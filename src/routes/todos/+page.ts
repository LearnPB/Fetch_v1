// Fetch a specific Todo (id: 12) from the JSONPlaceholder API on the server-side.
// This ensures data is preloaded before the page renders client-side and then passed into the page component.

export const load = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/12');

  if (!response.ok) {
    throw new Error(`Failed to load Todo. Status: ${response.status}`);
  }

  const todoData = await response.json();
  return { todoData };
};
