// @ts-nocheck
import { products } from '$lib/mock.js';

/**
 * This function is the server-side handler for the /api/complex endpoint.
 * It receives a GET request with query parameters, and returns a JSON response
 * containing the paginated products list and pagination data.
 *
 * The function first extracts the page, limit, and search query parameters from
 * the URL. If any of these parameters are missing, it defaults to the following:
 * - page: 1
 * - limit: 5
 * - search: empty string
 *
 * It then filters the products list based on the search query parameter. If
 * the search parameter is empty, it simply returns the original products list.
 * Otherwise, it filters the list to only include products whose name or category
 * contains the search string (case-insensitive).
 *
 * Next, it calculates the pagination data:
 * - totalPages: the total number of pages required to display all products
 * - startIndex: the index of the first product in the current page
 * - endIndex: the index of the last product in the current page
 * - paginatedProducts: the list of products to be returned in the current page
 *
 * Finally, it returns a JSON response containing the paginated products list
 * and pagination data.
 */
export async function GET({ url }) {
  const page = parseInt(url.searchParams.get('page')) || 1;
  const limit = parseInt(url.searchParams.get('limit')) || 5;
  const search = url.searchParams.get('search') || '';

  // Filter products based on search
  let filteredProducts = products;
  if (search) {
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Calculate pagination
  // The formula for calculating the start index is:
  //   (page - 1) * limit
  // This works because the page number is 1-indexed, but the array index is 0-indexed.
  // For example, if the page number is 3 and the limit is 5,
  // the start index would be (3 - 1) * 5 = 10.
  const startIndex = (page - 1) * limit;

  // The end index is simply the start index plus the limit.
  // This is because the slice method takes the start index and the end index,
  // and returns a subset of the array from the start index to the end index.
  const endIndex = page * limit;

  // The total number of pages is the total number of items divided by the limit,
  // rounded up to the nearest whole number.
  const totalPages = Math.ceil(filteredProducts.length / limit);

  // The paginated products are the products in the filtered products array
  // that fall within the start index and end index.
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Return a JSON response containing the paginated products list and pagination data.
  // The pagination data includes the current page number, total number of pages,
  // total number of items, and booleans indicating whether the previous and next pages exist.
  return new Response(JSON.stringify({
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: filteredProducts.length,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

/**
 * The GET handler for the /api/complex endpoint.
 * @param {Object} ctx - The context object containing the URL and other request information.
 * @returns {Response} - The response object containing the paginated products list and pagination data.
 */

