<script>
  export let data;
  // data.sales is the transformed array with percentage, totalSalesLabel, avgSales
  // data.grandTotal is the numeric total of all regions
</script>

<h1>Sales by Region</h1>

<p>Grand Total (All Regions): {data.grandTotal.toFixed(2)}</p>

<table>
  <thead>
    <tr>
      <th>Region</th>
      <th>Total Sales</th>
      <th>Avg Sale</th>
      <th>% of Grand Total</th>
    </tr>
  </thead>
  <tbody>
    {#each data.sales as row}
      <tr>
        <td>{row.region}</td>
        <td>{row.totalSalesLabel}</td>
        <td>{row.avgSales}</td>
        <td>{row.percentage}%</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
