<script>
  import ProjectNotes from "./projectnotes.md";
</script>

<div class="separator">
  <div class="data-fetching-guide">
    <header class="guide-header">
      <h2>Data Fetching Strategies in SvelteKit</h2>
      <p class="subtitle">
        Three distinct approaches for different application needs
      </p>
    </header>

    <div class="strategy-list">
      <article class="strategy">
        <h3 class="strategy-title">
          <span class="icon">🌐</span>
          <strong>Third-Party API Integration</strong>
        </h3>
        <div class="strategy-content">
          <p class="description">
            Fetch data from external APIs (links) using SvelteKit's
            <code>load</code> function and server-side rendering capabilities.
          </p>
          <div class="usability">
            <strong>When to use:</strong>
            <ul>
              <li>
                Integrating with services like JSONPlaceholder or public APIs
              </li>
              <li>When you don't control the data source</li>
              <li>For client-side data fetching with loading states</li>
            </ul>
          </div>
        </div>
      </article>

      <article class="strategy">
        <h3 class="strategy-title">
          <span class="icon">🏠</span>
          <strong>In-House API Endpoints</strong>
        </h3>
        <div class="strategy-content">
          <p class="description">
            Create custom API routes using <code
              >+server.ts or.js <strong>(Hooks)</strong></code
            >
            in <strong>SvelteKit</strong> to handle application-specific data. This
            provides more control over security, performance, and business logic,
            ensuring your data pipeline remains flexible.
          </p>
          <div class="usability">
            <strong>When to use:</strong>
            <ul>
              <li>Working with local data stores or mock data</li>
              <li>When needing custom business logic</li>
              <li>For full-stack TypeScript integration</li>
            </ul>
          </div>
        </div>
      </article>

      <article class="strategy">
        <h3 class="strategy-title">
          <span class="icon">📊</span>
          <strong>Database-Backed API</strong>
        </h3>
        <div class="strategy-content">
          <p class="description">
            Use <strong>SvelteKit</strong>’s <code>load</code> or
            <code>+server.js</code>
            functions to fetch data from external APIs or microservices. This approach
            helps you rapidly integrate data from public endpoints with minimal overhead.
          </p>
          <div class="usability">
            <strong>When to use:</strong>
            <ul>
              <li>Production applications with persistent data</li>
              <li>When needing complex queries or data aggregation</li>
              <li>For secure data handling with server-side processing</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>

<div class="markdown-container data-fetching-guide">
  <ProjectNotes />
</div>

<style>
  .separator {
    margin: 1rem 0;
  }

  .data-fetching-guide {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .guide-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .guide-header h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .guide-header .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
  }

  .strategy-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .strategy {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .strategy:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .strategy-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 1rem;
  }

  .strategy-title .icon {
    font-size: 1.75rem;
  }

  .strategy-content .description {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 1rem;
  }

  .strategy-content .usability {
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 6px;
  }

  .strategy-content .usability strong {
    display: block;
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .strategy-content .usability ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;
  }

  .strategy-content .usability li {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .strategy-content .usability li:last-child {
    margin-bottom: 0;
  }

  code {
    font-family: "Courier New", Courier, monospace;
    background-color: #e9ecef;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #d63384;
  }

  .markdown-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
