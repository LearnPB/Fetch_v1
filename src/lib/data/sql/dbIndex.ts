// src\lib\data\sql\dbIndex.ts

import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import { PLAYERNAME_ID, TOPPLAYERS, GETAGE, GETPLAYERAGES, GETPLAYERAGESAGGREGATED, SALESTRACKER } from './dbSql';
import type { AgeAggregateRow, Player, PlayerWithAge, SalesTracker } from './dbTypes';
const db = new Database(DB_PATH, { verbose: console.log });


export function getPlayersid(id: number): Player | null {
  const stmt = db.prepare(PLAYERNAME_ID);
  return stmt.get([id]) as Player; // Ensure parameter is inside an array
}

export function getTopPlayers(limit = 10): Player[] {
  try {
    const stmt = db.prepare(TOPPLAYERS); // Assuming TOPPLAYERS uses "?" or ":limit" parameter
    return stmt.all(limit) as Player[];
  } catch (error) {
    // Log error or handle appropriately
    console.error("Database error:", error);
    throw error; // Re-throw or handle as needed
  }
}
// ...... To check if function is working ........

const lognow = await getSalesTracker;
console.log(lognow);

export function getPlayerAge(): Player[] {
  const stmt = db.prepare(GETAGE);
  return stmt.all() as Player[]; // Explicitly cast result to Player[]
}
export function getPlayerAges(): PlayerWithAge[] {
  const stmt = db.prepare(GETPLAYERAGES);
  return stmt.all() as PlayerWithAge[];
}

export function getAggregatedPlayerAges(): AgeAggregateRow[] {
  const stmt = db.prepare(GETPLAYERAGESAGGREGATED);
  return stmt.all() as AgeAggregateRow[];
}

export function getAggregatedSalesByRegion(): { region: string; totalSales: number; avgSales: number }[] {
  const stmt = db.prepare(`
    SELECT 
      region,
      SUM(amount) AS totalSales,
      AVG(amount) AS avgSales
    FROM sales
    GROUP BY region
  `);
  return stmt.all() as { region: string; totalSales: number; avgSales: number }[];
}


export function getSalesTracker(): SalesTracker[] {
  const stmt = db.prepare(SALESTRACKER);
  return stmt.all() as SalesTracker[];
}
