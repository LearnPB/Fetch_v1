import type { AgeResult, AgeAggregateRow } from '$lib/data/sql/dbTypes';
import { getAggregatedPlayerAges } from '$lib/data/sql/dbIndex';

export async function GET(): Promise<Response> {
  try {
    const ageData: AgeAggregateRow[] = getAggregatedPlayerAges();

    if (!ageData?.length) {
      return createJsonResponse({
        perPlayerAvg: [],
        overallAvg: { avg_years: 0, avg_months: 0 },
        error: 'No player data found'
      }, 404);
    }

    // Find the overall average (it's the row with type='overall')
    const overallRow = ageData.find(row => row.type === 'overall');
    const overallAvg = overallRow
      ? { avg_years: overallRow.avg_years, avg_months: overallRow.avg_months }
      : { avg_years: 0, avg_months: 0 };

    // Extract player-specific averages
    const perPlayerAvg = ageData
      .filter(row => row.type === 'player' && row.nameId !== null)
      .map(row => ({
        nameId: row.nameId as number,
        avg_years: row.avg_years,
        avg_months: row.avg_months
      }));

    return createJsonResponse({ perPlayerAvg, overallAvg });

  } catch (error) {
    console.error('Error fetching player age data:', error);
    return createJsonResponse({
      perPlayerAvg: [],
      overallAvg: { avg_years: 0, avg_months: 0 },
      error: 'Internal server error'
    }, 500);
  }
}

function createJsonResponse(data: AgeResult, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}