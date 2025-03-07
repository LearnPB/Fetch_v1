import { users } from '$lib/users.js';

/**
 * GET:
 * This is an API route handler in SvelteKit that responds to GET requests.
 * It returns a JSON response containing user data.
 *
 * Benefits:
 * - Provides a structured API endpoint for fetching user data.
 * - Ensures data is served with the correct `Content-Type` header.
 * - Can be consumed by frontend components or external clients.
 */

export async function GET() {
  // Convert `users` data to a JSON string and return it as a response.
  return new Response(JSON.stringify(users), {
    headers: {
      'Content-Type': 'application/json' // Ensures the response is recognized as JSON.
    }
  });
}

/**
 * GET:
 * Directly add the data in case we don't want to use a DB or API (mock data).
 */
// export async function GET() {
//     const users = [
//         { id: 1, name: "John Doe", email: "john@example.com" },
//         { id: 2, name: "Jane Smith", email: "jane@example.com" },
//         { id: 3, name: "Bob Johnson", email: "bob@example.com" }
//     ];
    
//     return new Response(JSON.stringify(users), {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }"