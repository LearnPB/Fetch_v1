<script lang="ts">
  import { onMount } from "svelte";
  import { todos, fetchTodo } from "./todoStore";
  // Reactive variables for the three Todo IDs
  let id1 = 1;
  let id2 = 2;
  let id3 = 3;

  // Watch for changes and fetch todos
  $: fetchTodo(id1, 0);
  $: fetchTodo(id2, 1);
  $: fetchTodo(id3, 2);

  // Initialize data on mount
  onMount(() => {
    fetchTodo(id1, 0);
    fetchTodo(id2, 1);
    fetchTodo(id3, 2);
  });
</script>

<div class="todo-container">
  <h3>Fetch Todo Items Dynamically</h3>

  <div class="input-group">
    <div class="input-control">
      <label for="todo-id-1">Todo ID 1:</label>
      <input id="todo-id-1" type="number" bind:value={id1} min="1" max="200" />
    </div>

    <div class="input-control">
      <label for="todo-id-2">Todo ID 2:</label>
      <input id="todo-id-2" type="number" bind:value={id2} min="1" max="200" />
    </div>

    <div class="input-control">
      <label for="todo-id-3">Todo ID 3:</label>
      <input id="todo-id-3" type="number" bind:value={id3} min="1" max="200" />
    </div>
  </div>

  <div class="results">
    <h4>Todo Details</h4>

    {#if $todos && $todos.length > 0}
      <div class="todo-list">
        {#each $todos as todo, index}
          <div class="todo-item">
            <div class="todo-header">
              Todo #{index + 1} (ID: {index === 0
                ? id1
                : index === 1
                  ? id2
                  : id3})
            </div>
            {#if todo}
              <pre>{JSON.stringify(todo, null, 2)}</pre>
            {:else}
              <p class="loading">Loading...</p>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <p class="no-data">No Data Found...</p>
    {/if}
  </div>
</div>

<style>
  .todo-container {
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  h3,
  h4 {
    color: #333;
    margin-top: 0;
  }

  .input-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;
  }

  .input-control {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-weight: 500;
    font-size: 14px;
    color: #555;
  }

  input[type="number"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    width: 120px;
    transition: all 0.2s ease;
  }

  input[type="number"]:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .todo-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .todo-item {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .todo-header {
    background-color: #f1f1f1;
    padding: 10px 12px;
    font-weight: 600;
    font-size: 14px;
    color: #444;
    border-bottom: 1px solid #ddd;
  }

  pre {
    margin: 0;
    padding: 12px;
    white-space: pre-wrap;
    font-size: 14px;
    color: #333;
    overflow-x: auto;
  }

  .no-data,
  .loading {
    color: #888;
    font-style: italic;
    padding: 16px;
    text-align: center;
  }

  @media (max-width: 600px) {
    .input-group {
      flex-direction: column;
    }

    .todo-list {
      grid-template-columns: 1fr;
    }
  }
</style>
