<!-- // src/routes/player/[id]/+page.svelte  -->
<script lang="ts">
  import type { Player } from "$lib/data/sql/dbTypes";

  let { data } = $props();
  const player: Player = data.player;
</script>

<div class="player-card">
  <h2>Player Details</h2>
  <div class="player-info">
    <h3>Player Name: {player.playerName}</h3>
    <p>Player ID: {player.nameId}</p>
    <p>Total Pay: ${player.totalPay.toLocaleString()}</p>
  </div>
</div>
