/**
 * load:
 * This function runs on the server in SvelteKit before the page renders.
 * It fetches data from a custom API (`/myapi`) and returns it as a prop.
 * 
 * Benefits:
 * - Pre-fetches data server-side, avoiding client-side delays.
 * - Ensures data is available before rendering.
 * - Uses SvelteKit’s `fetch` to make API calls from the route folder.
 */

export async function load({ fetch }) {
  // Fetching data from an internal API route (/myapi).
  // This could be a backend service, database, or another API endpoint.
  const response = await fetch('/myapi');

  // Parse the response to JSON format.
  const data = await response.json();

  // Returning data as `users`, which will be available in the page component.
  return { users: data };
}
