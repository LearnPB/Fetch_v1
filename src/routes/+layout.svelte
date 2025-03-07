<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<nav>
  <a href="/"><p>Home</p></a>
  <a href="/todos"><p>3rd API</p></a>
  <a href="/myapi"><p>Internal API</p></a>
  <a href="/sql"><p>SQL API</p></a>
</nav>
{@render children()}

<style>
  nav {
    display: flex;
    gap: 1rem;
    background-color: aquamarine;
    justify-content: space-around;
    padding: 10px 10px;
  }

  nav a {
    text-decoration: none;
    color: white; /* White text color */

    transition: background-color 0.3s ease;
  }

  /* Hover effect for links */
  nav a:hover {
    background-color: #0fce78; /* Slightly lighter background on hover */
    border-radius: 5px;
  }

  /* Paragraph inside links */
  nav a p {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }
</style>
