<script lang="ts">
  export let data; // Data is automatically provided by SvelteKit's `load` function
</script>

<h3 class="separator">Todo Details</h3>
<div class="pre separator">
  {#if data.todo}
    <h4>Todo ID: {data.todo.id}</h4>
    <p><strong>Title:</strong> {data.todo.title}</p>
    <p><strong>Completed:</strong> {data.todo.completed ? "Yes" : "No"}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
<strong><a href="/todos">Back to Todos</a></strong>

<style>
  .separator {
    margin: 1rem 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
  }

  .pre {
    background-color: #e8d4d4;
    padding: 1rem;
    border-radius: 4px;
  }
</style>
