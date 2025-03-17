<script lang="ts">
  import {
    formatCurrency,
    calculateProfit,
    calculateMargin,
    calculateSummaryMetrics,
  } from "$lib/utils/salesUtils";
  import type { PageData } from "./$types";

  // Use $props() instead of export let in runes mode
  const { data } = $props<{ data: PageData }>();
  console.log("Parent data:", data);
  // Extract salesData from the PageData
  let salesData = $state(data.salesData);

  // Handle error state from load function
  let isLoading = $state(false); // SvelteKit handles loading state
  let errorMessage = $state<string | null>(
    data.status === "error" && data.message ? data.message : null
  );

  // Use the calculateSummaryMetrics utility to derive values
  let {
    totalRevenue,
    totalCosts,
    totalProfit,
    profitMargin,
    bestMonth,
    worstMonth,
  } = $derived(calculateSummaryMetrics(salesData));
</script>

<div class="sales-dashboard">
  <h1>Sales Analysis Dashboard</h1>

  {#if isLoading}
    <div class="loading">Loading sales data...</div>
  {:else if errorMessage}
    <div class="error">Error: {errorMessage}</div>
  {:else if salesData.length === 0}
    <div class="no-data">No sales data available.</div>
  {:else}
    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Revenue</h3>
        <p class="amount">{formatCurrency(totalRevenue)}</p>
      </div>

      <div class="metric-card">
        <h3>Total Costs</h3>
        <p class="amount">{formatCurrency(totalCosts)}</p>
      </div>

      <div class="metric-card">
        <h3>Total Profit</h3>
        <p class="amount" class:negative={totalProfit < 0}>
          {formatCurrency(totalProfit)}
        </p>
      </div>

      <div class="metric-card">
        <h3>Profit Margin</h3>
        <p class="amount" class:negative={totalProfit < 0}>{profitMargin}%</p>
      </div>

      {#if bestMonth}
        <div class="metric-card highlight">
          <h3>Best Month</h3>
          <p class="month">{bestMonth.month}</p>
          <p class="amount">
            {formatCurrency(
              calculateProfit(bestMonth.revenue, bestMonth.costs)
            )}
          </p>
        </div>
      {/if}

      {#if worstMonth}
        <div class="metric-card highlight warning">
          <h3>Worst Month</h3>
          <p class="month">{worstMonth.month}</p>
          <p class="amount negative">
            {formatCurrency(
              calculateProfit(worstMonth.revenue, worstMonth.costs)
            )}
          </p>
        </div>
      {/if}
    </div>

    <h2>Monthly Performance</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Costs</th>
            <th>Profit</th>
            <th>Margin %</th>
          </tr>
        </thead>
        <tbody>
          {#each salesData as { month, revenue, costs }}
            <tr>
              <td>{month}</td>
              <td>{formatCurrency(revenue)}</td>
              <td>{formatCurrency(costs)}</td>
              <td class:negative={calculateProfit(revenue, costs) < 0}>
                {formatCurrency(calculateProfit(revenue, costs))}
              </td>
              <td class:negative={calculateProfit(revenue, costs) < 0}>
                {calculateMargin(revenue, costs)}%
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="chart-container">
      <h2>Monthly Revenue vs Costs</h2>
      <div class="chart">
        <div class="chart-bars">
          {#each salesData as { month, revenue, costs }}
            <div class="month-group">
              <div class="bar-container">
                <div
                  class="bar revenue"
                  style="height: {revenue / 1000}px;"
                  title="Revenue: {formatCurrency(revenue)}"
                ></div>
                <div
                  class="bar costs"
                  style="height: {costs / 1000}px;"
                  title="Costs: {formatCurrency(costs)}"
                ></div>
              </div>
              <div class="month-label">{month}</div>
            </div>
          {/each}
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color revenue"></div>
            <span>Revenue</span>
          </div>
          <div class="legend-item">
            <div class="legend-color costs"></div>
            <span>Costs</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .sales-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
    font-weight: 700;
    text-align: center;
  }

  h2 {
    color: #34495e;
    margin: 2rem 0 1rem;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 0.5rem;
  }

  .loading,
  .error,
  .no-data {
    padding: 2rem;
    text-align: center;
    background: #f8f9fa;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .error {
    background: #fee;
    color: #c0392b;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .metric-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .metric-card h3 {
    margin: 0 0 0.5rem;
    color: #7f8c8d;
    font-size: 1rem;
    font-weight: 600;
  }

  .metric-card .amount {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    color: #2c3e50;
  }

  .metric-card .month {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  .highlight {
    background: #e3f2fd;
  }

  .warning {
    background: #fff8e1;
  }

  .negative {
    color: #e74c3c !important;
  }

  .table-container {
    overflow-x: auto;
    margin: 1rem 0 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th,
  td {
    padding: 1rem;
    text-align: right;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th {
    background: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
  }

  tr:nth-child(even) {
    background: #f8f9fa;
  }

  tr:hover {
    background: #ecf0f1;
  }

  /* Chart styles */
  .chart-container {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .chart {
    height: 400px;
    display: flex;
    flex-direction: column;
  }

  .chart-bars {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 350px;
    margin-bottom: 1rem;
  }

  .month-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bar-container {
    display: flex;
    height: 300px;
    align-items: flex-end;
    margin: 0 0.5rem;
  }

  .bar {
    width: 30px;
    margin: 0 5px;
    border-radius: 4px 4px 0 0;
    transition: height 0.5s ease;
  }

  .revenue {
    background: #3498db;
  }

  .costs {
    background: #e74c3c;
  }

  .month-label {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #7f8c8d;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 0 1rem;
  }

  .legend-color {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .bar {
      width: 20px;
      margin: 0 2px;
    }
  }
</style>
