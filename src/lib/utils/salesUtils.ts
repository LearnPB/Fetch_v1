import type { SalesTracker } from '$lib/data/sql/dbTypes';

/**
 * Format number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

/**
 * Calculate monthly profit
 */
export function calculateProfit(revenue: number, costs: number): number {
  return revenue - costs;
}

/**
 * Calculate profit margin percentage
 */
export function calculateMargin(revenue: number, costs: number): string {
  return revenue > 0 ? ((revenue - costs) / revenue * 100).toFixed(2) : '0';
}

/**
 * Calculate summary metrics from sales data
 */
export function calculateSummaryMetrics(salesData: SalesTracker[]) {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCosts = salesData.reduce((sum, item) => sum + item.costs, 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(2) : '0';

  // Find best performing month
  const bestMonth = salesData.length > 0
    ? salesData.reduce((best, current) =>
      (current.revenue - current.costs) > (best.revenue - best.costs) ? current : best, salesData[0])
    : null;

  // Find worst performing month
  const worstMonth = salesData.length > 0
    ? salesData.reduce((worst, current) =>
      (current.revenue - current.costs) < (worst.revenue - worst.costs) ? current : worst, salesData[0])
    : null;

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
 * Sort sales data by a specific field
 */
export function sortSalesData(data: SalesTracker[], field: keyof SalesTracker, ascending = true): SalesTracker[] {
  return [...data].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return ascending ? valA - valB : valB - valA;
    } else {
      // String comparison for non-numeric fields
      const strA = String(valA);
      const strB = String(valB);
      return ascending ? strA.localeCompare(strB) : strB.localeCompare(strA);
    }
  });
}