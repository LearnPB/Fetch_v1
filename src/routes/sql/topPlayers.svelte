<script lang="ts">
  // src\routes\sql\topPlayers.svelte
  import type { Player } from "$lib/data/sql/dbTypes";

  // Define props with proper typing
  let { players = [], error = undefined } = $props<{
    players: Player[];
    error: string | undefined;
  }>();

  // Add a console.log to verify data in this component
  // console.log("TopPlayers component - Players:", players, "Error:", error);
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
    <div class="overflow-x-auto w-full">
      <table class="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Rank</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Player</th>
            <th class="border border-gray-300 px-4 py-2 text-left">totalPay</th>
          </tr>
        </thead>
        <tbody>
          {#each players as player, i}
            <tr class={i % 2 === 0 ? "" : "bg-gray-50"}>
              <td class="border border-gray-300 px-4 py-2"
                >{player.nameId || i + 1}</td
              >
              <td class="border border-gray-300 px-4 py-2"
                >{player.playerName || "Unknownaa"}</td
              >
              <td class="border border-gray-300 px-4 py-2">
                ${player.totalPay ? player.totalPay.toLocaleString() : 0}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
