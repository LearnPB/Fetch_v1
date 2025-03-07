<script>
  // In Svelte 5, you can use the new $props rune to access data
  import TopPlayers from "./topPlayers.svelte";

  // Using Svelte 5 runes to get the page data
  export let data;
</script>

<h3 class="separator">
  On this page, we'll explore how to connect to an SQL database and retrieve
  data using an API built with SvelteKit.
</h3>
<p>will start from simple example to complex example</p>

<u>
  <li><a href="/sql/player">Fetch Player with ID</a></li>
  <p>
    Player data will be fetched from the database using SQL and displayed on the
    page. Enter an ID to load the player's details and navigate to their page.
  </p>
  <li><a href="/sql/toplayer">Top 10 Players</a></li>
  <p>
    Use SQL to retrieve the top 10 highest paid players from the database and
    display their names and total earnings in a table on the page.
  </p>
</u>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Top Players</h1>

  <TopPlayers players={data.players} error={data.error} />
</div>

<style>
  /* General styling for the unordered list */
  u {
    list-style-type: none; /* Remove default bullet points */
    padding-left: 0; /* Remove default padding */
    font-family: Arial, sans-serif; /* Use a clean font */
  }

  /* Styling for list items */
  u li {
    margin-bottom: 20px; /* Add space between list items */
  }

  /* Styling for links */
  u li a {
    text-decoration: none; /* Remove underline from links */
    color: #007bff; /* Blue color for links */
    font-weight: bold; /* Make links bold */
    font-size: 18px; /* Increase font size */
    transition: color 0.3s ease; /* Smooth color transition on hover */
  }

  u li a:hover {
    color: #0056b3; /* Darker blue on hover */
  }

  /* Styling for paragraphs */
  u p {
    margin-top: 8px; /* Add space between link and paragraph */
    color: #555; /* Dark gray color for text */
    font-size: 14px; /* Slightly smaller font size */
    line-height: 1.6; /* Improve readability with line height */
    max-width: 600px; /* Limit paragraph width for better readability */
    text-decoration: none; /* Ensure no underline is inherited */
  }
</style>
