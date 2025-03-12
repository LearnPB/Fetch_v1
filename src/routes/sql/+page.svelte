<h3 class="separator">
  On this page, we'll explore how to connect to an SQL database and retrieve
  data using an API built with SvelteKit.
</h3>
<h4>Will start from simple example to complex example</h4>

<ul>
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
  <li><a href="/sql/playerage">Player Age in JS</a></li>
  <p>
    Implement age calculations in JavaScript using a utility file (e.g., <code
      >age.ts</code
    >) containing reusable functions. This approach demonstrates how to
    structure complex API-fetching logic in a modular and maintainable way. By
    encapsulating age-related computations in a dedicated utility, the code
    becomes more reusable across different parts of an application. <br />
    <br />
    <span
      ><strong>Note:</strong> Performing age calculations in JavaScript can be resource-intensive,
      particularly when processing large datasets. This is because it involves iterating
      over records and executing date-based computations either on the client side
      or an application server, potentially impacting performance.</span
    >
  </p>

  <li><a href="/sql/sqlplayerage">Player Age in SQL</a></li>

  <p>Calculating age directly in SQL is simpler and more efficient:</p>
  <ul>
    <li>
      <strong>Better performance:</strong> Databases handle data operations faster
      than JS.
    </li>
    <li>
      <strong>Reduced data transfer:</strong> Only the calculated age is sent, not
      raw birth dates.
    </li>
    <li>
      <strong>Simplified code:</strong> Eliminates most JS-based age logic.
    </li>
  </ul>
</ul>

<style>
  /* General styling for the unordered list */
  ul {
    list-style-type: none; /* Remove default bullet points */
    padding-left: 0; /* Remove default padding */
    font-family: Arial, sans-serif; /* Use a clean font */
  }

  /* Styling for list items */
  ul li {
    margin-bottom: 20px; /* Add space between list items */
  }

  /* Styling for links */
  ul li a {
    text-decoration: none; /* Remove underline from links */
    color: #007bff; /* Blue color for links */
    font-weight: bold; /* Make links bold */
    font-size: 18px; /* Increase font size */
    transition: color 0.3s ease; /* Smooth color transition on hover */
  }

  ul li a:hover {
    color: #0056b3; /* Darker blue on hover */
  }

  /* Styling for paragraphs */
  ul p {
    margin-top: 8px; /* Add space between link and paragraph */
    color: #555; /* Dark gray color for text */
    font-size: 14px; /* Slightly smaller font size */
    line-height: 1.6; /* Improve readability with line height */
    max-width: 600px; /* Limit paragraph width for better readability */
  }
</style>
