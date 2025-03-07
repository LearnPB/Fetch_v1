// src/routes/player/[id]/+Server.ts

import { json } from '@sveltejs/kit';
import { getPlayersid } from '$lib/data/sql/dbIndex';

export async function GET({ params }) {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0) {
    return json({ error: 'Invalid ID' }, { status: 400 });
  }

  const player = getPlayersid(id);

  if (!player) {
    return json({ error: 'Player not found' }, { status: 404 });
  }

  return json(player); // Return the full player object
};

// If the API should follow a different naming convention (e.g., name instead of playerName), then manual renaming is useful:
// But if the frontend and API can use the same names, then just return player directly.

// return json({
//   name: player.playerName, // Rename for API format
//   totalPay: player.totalPay,
// });
