import { getTopPlayers } from '$lib/data/sql/dbIndex';

export async function GET() {
  const data = await getTopPlayers(); // Ensure it executes
  console.log("Top Players Data:", data); // Log the response

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}