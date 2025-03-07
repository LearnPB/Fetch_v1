<script lang="ts">
  /**
   * The data object contains the user list fetched from the
   * /myapi/simple endpoint in the +page.server.ts file.
   *
   * @property users - An array of user objects with name and email properties.
   */
  export let data: { users: Array<{ name: string; email: string }> };
</script>

<nav class="main-nav">
  <a href="/" class="nav-link">
    <p>Home</p>
  </a>
  <a href="/myapi/complex" class="nav-link">
    <p>Fetch Complex API</p>
  </a>
</nav>

<main class="user-list-container">
  <h1>Simple User List</h1>
  <p class="description">
    This example demonstrates how to use SvelteKit's <code>+page.server.ts</code
    > to fetch data from a local API and render it on the client.
  </p>

  <div class="users">
    {#each data.users as user}
      <div class="user-card">
        <h3 class="user-name">{user.name}</h3>
        <p class="user-email">{user.email}</p>
      </div>
    {/each}
  </div>
</main>

<style>
  .user-list-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
  }

  h1 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .users {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .user-card {
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .user-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .user-name {
    font-size: 1.25rem;
    color: #34495e;
    margin-bottom: 0.5rem;
  }

  .user-email {
    font-size: 0.95rem;
    color: #7f8c8d;
  }

  code {
    font-family: "Courier New", Courier, monospace;
    background-color: #e9ecef;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #d63384;
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
  }

  .nav-link p {
    margin: 0;
    padding: 0.5rem 1rem;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .nav-link:hover p {
    background-color: #ddd;
  }
</style>
