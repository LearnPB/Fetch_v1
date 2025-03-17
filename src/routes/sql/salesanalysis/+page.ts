// src/routes/sales/+page.ts
export const load = async ({ fetch }) => {
  const res = await fetch("/api/sales-analysis");
  const sales: { region: string; totalSales: number; avgSales: number }[] = await res.json();

  const grandTotal = sales.reduce((acc, r) => acc + r.totalSales, 0);

  const processed = sales.map(({ region, totalSales, avgSales }) => {
    const totalSalesLabel = totalSales >= 1_000_000
      ? `${(totalSales / 1_000_000).toFixed(1)}MM`
      : totalSales.toFixed(2);

    return {
      region,
      totalSalesLabel,
      avgSales: avgSales.toFixed(2),
      percentage: ((totalSales / grandTotal) * 100).toFixed(1),
    };
  });

  return {
    sales: processed,
    grandTotal
  };
};
