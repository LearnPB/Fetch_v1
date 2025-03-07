// src/routes/todo/[id]/+page.ts
export const load = async ({ params }) => {
  const id = params.id; // Get the ID from the URL
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Todo with ID ${id}`);
  }

  const todo = await response.json();
  return { todo }; // Return the fetched Todo
};
