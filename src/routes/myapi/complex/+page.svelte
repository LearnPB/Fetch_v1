<script lang="ts">
  import { goto } from "$app/navigation";

  // Data from server-side load function (contains products, search term, pagination info)
  export let data;

  // Initialize search input with the existing search term from data
  let searchInput: string = data.search || "";

  /**
   * handleSearch:
   * Triggers a new search by updating the URL with the search query.
   * If no search input is provided, it resets the search parameter.
   */
  function handleSearch() {
    const url = searchInput.trim()
      ? `?page=1&search=${encodeURIComponent(searchInput)}`
      : "?page=1";
    goto(url);
  }

  /**
   * handlePageChange:
   * Updates the page number in the URL while preserving the current search query.
   * @param {number} page - The target page number.
   */
  function handlePageChange(page: number) {
    if (page < 1) return; // Prevents invalid page navigation

    const url = data.search
      ? `?page=${page}&search=${encodeURIComponent(data.search)}`
      : `?page=${page}`;

    goto(url);
  }
</script>

<h3 class="separator">You can do search and pagination</h3>

{#if data.error}
  <div class="error">
    Error: {data.error}
  </div>
{:else}
  <div class="products-page">
    <div class="search-bar">
      <input
        type="text"
        bind:value={searchInput}
        placeholder="Search products..."
      />
      <button on:click={handleSearch}>Search</button>
    </div>

    <div class="products-grid">
      {#each data.products as product}
        <div class="product-card">
          <h3>{product.name}</h3>
          <p class="category">{product.category}</p>
          <p class="price">${product.price.toFixed(2)}</p>
          <div class="specs">
            <h4>Specifications:</h4>
            <ul>
              <li>CPU: {product.specs.cpu}</li>
              <li>RAM: {product.specs.ram}</li>
              <li>Storage: {product.specs.storage}</li>
            </ul>
          </div>
          <div class="stock">
            Stock: {product.stock} units
          </div>
          <div class="rating">
            Rating: {product.rating}/5
          </div>
        </div>
      {/each}
    </div>

    {#if data.pagination}
      <div class="pagination">
        <button
          disabled={!data.pagination.hasPrevPage}
          on:click={() => handlePageChange(data.pagination.currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {data.pagination.currentPage} of {data.pagination.totalPages}
        </span>

        <button
          disabled={!data.pagination.hasNextPage}
          on:click={() => handlePageChange(data.pagination.currentPage + 1)}
        >
          Next
        </button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .products-page {
    padding: 1rem;
  }

  .search-bar {
    margin-bottom: 1rem;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 4px;
  }

  .pagination {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .error {
    color: red;
    padding: 1rem;
    border: 1px solid red;
    border-radius: 4px;
    margin: 1rem 0;
  }

  .separator {
    margin: 1rem 0;
  }
</style>
