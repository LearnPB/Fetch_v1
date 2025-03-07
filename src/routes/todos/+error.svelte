<script lang="ts">
  import { goto } from "$app/navigation";

  // Define the error message prop
  export let message: string = "Something went wrong!";

  /**
   * Navigates back to the home page.
   */
  function goHome() {
    goto("/");
  }
</script>

<main class="error-container">
  <div class="error-content">
    <h1>Oops! 😕</h1>
    <p class="error-message">{message}</p>
    <p>We couldn't find what you were looking for. Please try again.</p>
    <button on:click={goHome} class="home-button">Go Back to Home</button>
  </div>
</main>

<style>
  /* Main container styling */
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
    font-family: "Arial", sans-serif;
    text-align: center;
  }

  /* Content styling */
  .error-content {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }

  /* Error message styling */
  .error-message {
    color: #dc3545;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  /* Button styling */
  .home-button {
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .home-button:hover {
    background-color: #0056b3;
  }

  /* Responsive design */
  @media (max-width: 480px) {
    .error-content {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.75rem;
    }

    .error-message {
      font-size: 1rem;
    }

    .home-button {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }
</style>
