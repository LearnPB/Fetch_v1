<!-- src\routes\sql\playerage\+page.svelte -->

<script lang="ts">
  export let data: {
    perPlayerAvg?: { nameId: number; avg_years: number; avg_months: number }[];
    overallAvg?: { avg_years: number; avg_months: number };
    error?: string;
  };

  let errorMessage = data?.error || null;
  let perPlayerAvg = data?.perPlayerAvg ?? []; // Ensure it's an array
  let overallAvg = data?.overallAvg ?? { avg_years: 0, avg_months: 0 };

  console.log("Frontend data:", data.perPlayerAvg); // Ensure data exists in console
</script>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{:else}
  <h2>Average Age Per Player</h2>
  {#if perPlayerAvg.length === 0}
    <p>No player data available.</p>
  {:else}
    <ul>
      {#each perPlayerAvg as player}
        <li>
          Player {player.nameId}: {player.avg_years} years, {player.avg_months} months
        </li>
      {/each}
    </ul>
  {/if}

  <h2>Overall Average Age</h2>
  <p>{overallAvg.avg_years} years, {overallAvg.avg_months} months</p>
{/if}

<style>
  .error {
    color: red;
    font-weight: bold;
  }
</style>
