// src\routes\sql\playerage\+page.ts
export async function load({ fetch }) {
  try {
    const res = await fetch('/api/sqlPlayerAge');
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

    const responseData = await res.json();
    console.log("Server Data in +page.ts:", responseData);

    return {
      perPlayerAvg: responseData.perPlayerAvg ?? [],
      overallAvg: responseData.overallAvg ?? { avg_years: 0, avg_months: 0 }
    };
  } catch (error) {
    console.error("Error loading player age data:", error);
    return {
      perPlayerAvg: [],
      overallAvg: { avg_years: 0, avg_months: 0 },
      error: "Failed to load data"
    };
  }
}
