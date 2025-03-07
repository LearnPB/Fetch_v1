<script lang="ts">
  import { onMount } from "svelte";
  import { dogData, fetchDogData } from "./imageStore";

  // Fetch data when the component mounts
  onMount(fetchDogData);
</script>

<h3>Random Dog Image</h3>

{#if $dogData}
  <img src={$dogData.message} alt="Random Dog" width="300" />
  <p>
    <strong>Source:</strong>
    <a href={$dogData.message} target="_blank">View Full Image</a>
  </p>
{:else}
  <p>Loading...</p>
{/if}

<button onclick={fetchDogData}>Fetch New Dog</button>
