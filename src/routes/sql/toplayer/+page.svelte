<script lang="ts">
  //  src\routes\sql\toplayer\+page.svelte
  // In Svelte 5, you can use the new $props rune to access data
  import TopPlayers from "../topPlayers.svelte";
  export let data;
  // console.log("Parent data:", data); // DATA LOGGING IS CORRECT
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Top Players</h1>
  <TopPlayers players={data?.players} error={data?.error} />
</div>
