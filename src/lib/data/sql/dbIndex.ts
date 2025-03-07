// src\lib\data\sql\dbIndex.ts

import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import { PLAYERNAME_ID, TOPPLAYERS } from './dbSql';
import type { Player } from './dbTypes';
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

const lognow = await getTopPlayers;
console.log(lognow);