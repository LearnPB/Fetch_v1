import { getAggregatedSalesByRegion } from "$lib/data/sql/dbIndex";

export function GET() {
  const data = getAggregatedSalesByRegion(); // No need for await

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
//  remove await because getAggregatedSalesByRegion() is a synchronous function (it uses stmt.all()
// from SQLite, which doesn't return a Promise).