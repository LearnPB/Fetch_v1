<script lang="ts">
  import DogFetcher from "./DogFetcher.svelte";
  import { onMount } from "svelte";
  import TodoFetcher from "./TodoFetcher.svelte";

  // Helper function to fetch JSON data from a given URL.
  // It returns null on error to avoid breaking the component.

  const fetchJson = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  // Stores the Todo item fetched onMount (Approach 1)
  let mountedTodo: Record<string, any> | undefined;

  // This prop receives data from the server-side load function in +page.server.ts
  export let data;
  const { todoData } = data;

  // Example of fetching data once the component mounts
  onMount(async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/6"
    );
    if (response.ok) {
      mountedTodo = await response.json();
    }
  });

  // Used for the dynamic routing example at the bottom
  let todoId = 1;
</script>

<div
  style="display: flex; flex-direction: column; gap: 20px; align-items: center"
>
  <span class="separator"> </span>
  <h2>Todos Fetch</h2>
  <p>
    Below are various approaches to fetching data from 3rd-party APIs
    (JSONPlaceholder). Each method demonstrates a different pattern for
    organizing or rendering fetched data.
  </p>

  <!-- Approach 1 -->
  <h4>Approach 1: Client-Side onMount Fetch</h4>
  <p>
    This approach uses <code>onMount</code> to request data after the component loads
    in the browser. The data won't be available at first, so a loading message is
    shown.
  </p>
  {#if mountedTodo}
    <pre>{JSON.stringify(mountedTodo, null, 2)}</pre>
  {:else}
    <p>Loading...</p>
  {/if}

  <!-- Approach 2 -->
  <h4>Approach 2: Helper Function with #await</h4>
  <p>
    A reusable <code>fetchJson</code> function is called inside a
    <code>#await</code> block. This helps manage loading, success, and error states
    cleanly.
  </p>
  {#await fetchJson("https://jsonplaceholder.typicode.com/todos/1")}
    <p>Loading...</p>
  {:then data}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  {:catch error}
    <p>{error.message}</p>
  {/await}

  <!-- Approach 3 -->
  <h4>Approach 3: Direct Fetch with Nested #await</h4>
  <p>
    Here, we manually fetch and then parse JSON in a nested <code>#await</code> block,
    offering more granular control over each step.
  </p>
  {#await fetch("https://jsonplaceholder.typicode.com/todos/9")}
    <p>Loading...</p>
  {:then data}
    {#await data.json()}
      <p>Loading...</p>
    {:then json}
      <pre>{JSON.stringify(json, null, 2)}</pre>
    {:catch error}
      <p>{error.message}</p>
    {/await}
  {:catch error}
    <p>{error.message}</p>
  {/await}

  <!-- Approach 4 -->
  <h4>Approach 4: SvelteKit's Server-Side Data Loading</h4>
  <p>
    This method fetches Todo data (id: 12) in <code>+page.server.ts</code> before
    the page is rendered in the browser. The pre-fetched data is available instantly,
    avoiding additional client-side load times.
  </p>
  {#if todoData}
    <pre>{JSON.stringify(todoData, null, 2)}</pre>
  {:else}
    <p>Loading server data...</p>
  {/if}

  <h3>Using Svelte stores for data fetching</h3>
  <p>
    Storing data in <code>Svelte stores</code> helps centralize state management
    and reduce redundant API calls. Components remain focused on rendering, while
    the store handles data fetching and state updates behind the scenes.
  </p>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <DogFetcher />
  </div>

  <span class="separator"> </span>
  <TodoFetcher />

  <p>
    <strong>Dynamic routing</strong> with SvelteKit simplifies fetching a Todo
    by ID. For example, a file named <code>[id]/+page.ts</code> automatically
    loads the appropriate data before rendering. Users can change the ID in the
    input below and navigate directly to <code>/todos/[id]</code>.
  </p>
  <h3>Enter a Todo ID</h3>
  <input type="number" bind:value={todoId} min="1" max="200" />
  <a href={`/todos/${todoId}`}>Go to Todo Page</a>
</div>

<style>
  pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
  }
</style>
