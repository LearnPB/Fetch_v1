// src/routes/sales/+page.ts
// Export an asynchronous function named `load` that takes an object with a `fetch` method as its parameter
export const load = async ({ fetch }) => {
  // Fetch sales data from the "/api/sales-analysis" endpoint
  const res = await fetch("/api/sales-analysis");

  // Parse the JSON response into an array of objects with `region`, `totalSales`, and `avgSales` properties
  const sales: { region: string; totalSales: number; avgSales: number }[] = await res.json();
  console.log("Sales Data:", sales);
  // Calculate the grand total of sales by summing up the `totalSales` from all regions
  const grandTotal = sales.reduce((acc, r) => acc + r.totalSales, 0);
  console.log("Grand Total:", grandTotal);
  // Process the sales data to format and calculate additional fields
  const processed = sales.map(({ region, totalSales, avgSales }) => {
    // Format `totalSales` to display in millions (MM) if it's greater than or equal to 1,000,000
    const totalSalesLabel = totalSales >= 1_000_000
      ? `${(totalSales / 1_000_000).toFixed(1)}MM`
      : totalSales.toFixed(2);

    // Return a new object with formatted and calculated fields
    return {
      region, // Region name
      totalSalesLabel, // Formatted total sales
      avgSales: avgSales.toFixed(2), // Format average sales to 2 decimal places
      percentage: ((totalSales / grandTotal) * 100).toFixed(1), // Calculate the percentage of total sales
    };
  });
  console.log("%Total Sales:", processed);
  // Return the processed sales data and the grand total
  return {
    sales: processed,
    grandTotal,
  };
};