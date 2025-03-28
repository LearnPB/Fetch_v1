import type { SalesTracker } from '$lib/data/sql/dbTypes';

/**
 * Format a number as currency in the USD format.
 * Utilizes the Intl.NumberFormat API to format the number.
 *
 * @param value - The number to be formatted as currency.
 * @returns A string representing the formatted currency value.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

/**
 * Calculate the monthly profit given revenue and costs.
 * Profit is calculated as the difference between revenue and costs.
 *
 * @param revenue - The total revenue for the month.
 * @param costs - The total costs for the month.
 * @returns The profit as a numeric value.
 */
export function calculateProfit(revenue: number, costs: number): number {
  return revenue - costs;
}

/**
 * Calculate the profit margin percentage.
 * The margin is calculated as the profit divided by revenue, expressed as a percentage.
 * If the revenue is zero or negative, it returns '0'.
 *
 * @param revenue - The total revenue.
 * @param costs - The total costs.
 * @returns The profit margin as a string formatted to two decimal places.
 */
export function calculateMargin(revenue: number, costs: number): string {
  return revenue > 0 ? ((revenue - costs) / revenue * 100).toFixed(2) : '0';
}

/**
 * Calculate summary metrics from an array of sales data.
 * Computes the total revenue, total costs, total profit, profit margin,
 * best performing month, and worst performing month.
 *
 * @param salesData - An array of sales data records.
 * @returns An object containing calculated summary metrics.
 */
export function calculateSummaryMetrics(salesData: SalesTracker[]) {
  // Aggregate total revenue from all sales records
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  // Aggregate total costs from all sales records
  const totalCosts = salesData.reduce((sum, item) => sum + item.costs, 0);
  // Calculate total profit as the difference between total revenue and total costs
  const totalProfit = totalRevenue - totalCosts;
  // Calculate the overall profit margin percentage
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(2) : '0';

  // Determine the best performing month by comparing profits
  const bestMonth = salesData.length > 0
    ? salesData.reduce((best, current) =>
      (current.revenue - current.costs) > (best.revenue - best.costs) ? current : best, salesData[0])
    : null;

  // Determine the worst performing month by comparing profits
  const worstMonth = salesData.length > 0
    ? salesData.reduce((worst, current) =>
      (current.revenue - current.costs) < (worst.revenue - worst.costs) ? current : worst, salesData[0])
    : null;

  // Return the calculated metrics as an object
  return {
    totalRevenue,
    totalCosts,
    totalProfit,
    profitMargin,
    bestMonth,
    worstMonth
  };
}

/**
 * Sort sales data by a specified field.
 * Allows sorting by any field present in the SalesTracker type.
 * Sorting can be performed in ascending or descending order.
 *
 * @param data - The sales data to be sorted.
 * @param field - The field by which to sort the data.
 * @param ascending - A boolean indicating whether to sort in ascending order (default is true).
 * @returns A new array of sales data sorted by the specified field.
 */
export function sortSalesData(data: SalesTracker[], field: keyof SalesTracker, ascending = true): SalesTracker[] {
  return [...data].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === 'number' && typeof valB === 'number') {
      // Numeric comparison for fields with number data type
      return ascending ? valA - valB : valB - valA;
    } else {
      // String comparison for non-numeric fields
      const strA = String(valA);
      const strB = String(valB);
      return ascending ? strA.localeCompare(strB) : strB.localeCompare(strA);
    }
  });
}
