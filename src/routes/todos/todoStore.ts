// // todoStore.ts (for one todo fetcher)
// import { writable } from 'svelte/store';

// // Store for the todo item
// export const todo = writable<Record<string, any> | undefined>(undefined);

// // Function to fetch a todo dynamically based on an ID
// export const fetchTodo = async (id: number) => {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
//     if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
//     const data = await response.json();
//     todo.set(data); // Update store with fetched data
//   } catch (error) {
//     console.error("Fetch error:", error);
//     todo.set(undefined); // Reset store on error
//   }
// };

// todoStore.ts
import { writable } from 'svelte/store';

// Create a store for multiple todos
export const todos = writable([null, null, null]);

// Function to fetch a todo and update a specific position in the array
export async function fetchTodo(id: number, position: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await response.json();

    todos.update(currentTodos => {
      const newTodos = [...currentTodos];
      newTodos[position] = data;
      return newTodos;
    });
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    todos.update(currentTodos => {
      const newTodos = [...currentTodos];
      newTodos[position] = null;
      return newTodos;
    });
  }
}