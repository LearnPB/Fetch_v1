// src/routes/complex/+page.ts

/**
 * load:
 * This function runs server-side in SvelteKit before rendering the page.
 * It fetches a paginated list of products from an API based on query parameters.
 * 
 * Query Parameters:
 * - `page`: Specifies which page of results to fetch (default: '1').
 * - `search`: Optional search term to filter results (default: '').
 * - `limit`: Fixed number of items per page (set to '5').
 *
 * Benefits:
 * - Pre-fetches data on the server to improve performance.
 * - Avoids client-side loading delays.
 * - Handles API errors gracefully and prevents crashes.
 */

export async function load({ fetch, url }) {
  try {
    // Extracting query parameters from the URL
    const page = url.searchParams.get('page') || '1';
    const search = url.searchParams.get('search') || '';
    const limit = '5'; // Fixed limit of items per page

    // Fetching paginated and filtered products from the API
    const response = await fetch(
      `/api/complex?page=${page}&limit=${limit}&search=${search}`
    );

    // Handling unsuccessful responses
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    // Parsing response data
    const data = await response.json();

    return {
      ...data, // Spreading the API response to include products & pagination
      search,  // Keeping track of the search term in the returned data
      error: null
    };
  } catch (error) {
    // Returning a fallback structure when an error occurs
    return {
      products: [],     // Empty array as fallback when fetching fails
      pagination: null, // No pagination data available
      search: '',       // Reset search input
      error: error.message // Provide the error message for debugging
    };
  }
}
