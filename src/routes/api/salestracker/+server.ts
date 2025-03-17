// src\routes\api\salestracker

import { getSalesTracker } from "$lib/data/sql/dbIndex";

export function GET() {
  const data = getSalesTracker(); // No need for await
  console.log(data);
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}