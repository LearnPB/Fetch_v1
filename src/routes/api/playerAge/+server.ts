// src/routes/api/playerAge/+server.ts
import type { Player, PlayerAge, AgeResult } from '$lib/data/sql/dbTypes';
import { getPlayerAge } from '$lib/data/sql/dbIndex';
import { calculateAge, ageToMonths, monthsToAge } from '$lib/utils/age';

export async function GET(): Promise<Response> {
  try {
    const players: Player[] = getPlayerAge();

    if (!players?.length) {
      return createJsonResponse({
        perPlayerAvg: [],
        overallAvg: { avg_years: 0, avg_months: 0 },
        error: 'No player data found'
      }, 404);
    }

    // Group ages by player ID
    const playerAgesMap = new Map<number, number[]>();

    players.forEach(({ nameId, birth_Date }) => {
      if (!nameId || !birth_Date) return;

      const age = calculateAge(birth_Date);
      if (!age) return;

      const ageInMonths = ageToMonths(age);

      if (!playerAgesMap.has(nameId)) {
        playerAgesMap.set(nameId, []);
      }
      playerAgesMap.get(nameId)!.push(ageInMonths);
    });

    // Calculate per-player averages
    let totalAgeMonths = 0;
    const perPlayerAvg: PlayerAge[] = [];

    playerAgesMap.forEach((ages, playerId) => {
      if (!ages.length) return;

      const avgMonths = ages.reduce((sum, age) => sum + age, 0) / ages.length;
      totalAgeMonths += avgMonths;

      perPlayerAvg.push({
        nameId: playerId,
        ...monthsToAge(avgMonths)
      });
    });

    // Calculate overall average
    const overallAvgMonths = perPlayerAvg.length ? totalAgeMonths / perPlayerAvg.length : 0;
    const overallAvg = monthsToAge(overallAvgMonths);

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