/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    const response = await fetch('api/sqlToplayer');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const players = await response.json();

    return {
      players
    };
  } catch (error) {
    console.error('Error loading top players:', error);
    return {
      players: [],
      error: 'Failed to load player data'
    };
  }
}
