<script lang="ts">
  // Import the necessary type for your Player
  import type { Player } from "$lib/data/sql/dbTypes";

  // Use Svelte 5 runes for props
  let { players = [], error = undefined } = $props();
</script>

<div>
  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {error}
    </div>
  {/if}

  {#if players.length === 0 && !error}
    <div
      class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4"
    >
      No players found.
    </div>
  {/if}

  {#if players.length > 0}
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">Rank</th>
            <th class="border px-4 py-2 text-left">Player</th>
            <th class="border px-4 py-2 text-left">Score</th>
            <!-- Add more table headers based on your Player type -->
          </tr>
        </thead>
        <tbody>
          {#each players as player, i}
            <tr class={i % 2 === 0 ? "" : "bg-gray-50"}>
              <td class="border px-4 py-2">{i + 1}</td>
              <td class="border px-4 py-2">{player.name || "Unknown"}</td>
              <td class="border px-4 py-2">{player.score || 0}</td>
              <!-- Add more table cells based on your Player type -->
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
