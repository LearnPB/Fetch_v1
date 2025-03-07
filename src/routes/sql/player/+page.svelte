<!-- 
src\routes\sql\player\+page.svelte -->
<script lang="ts">
  let id = 1;
</script>

<h4>Trigger Player Page with Player ID</h4>
<div>
  <h3>Enter a Player ID</h3>
  <input type="number" bind:value={id} max="200" />
  <a href={`/sql/player/${id}`}>Go to Player Page</a>
</div>
