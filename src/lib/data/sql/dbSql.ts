// src\lib\data\sql\dbSql.ts

export const PLAYERNAME_ID = `
  SELECT Name AS playerName, Name_ID AS nameId, CAST(REPLACE(SUBSTRING(TotalPay, 2), ',', '') AS INTEGER) AS totalPay
FROM alldata
WHERE Name_ID = ?;
`;

export const TOPPLAYERS = `
SELECT 
    Name_ID as nameId, name AS playerName,
      CAST(REPLACE(SUBSTRING(TotalPay, 2), ',', '') AS INTEGER) AS totalPay
    FROM 
      alldata
    ORDER BY 
    totalPay DESC
    LIMIT ?;
`;
// src\lib\data\sql\dbSql.ts
export const GETAGE = `SELECT 
  Name_ID as nameId, 
  name AS player_Name, 
  "Birth Date" AS birth_Date
FROM alldata 
LIMIT 10;`;

// src\lib\data\sql\dbSql.ts
export const GETPLAYERAGES = `
SELECT 
  Name_ID AS nameId,
  name AS player_Name,
  CAST((julianday('now') - julianday(substr("Birth Date", 7, 4) || '-' || 
       substr("Birth Date", 4, 2) || '-' || substr("Birth Date", 1, 2))) / 365.25 AS INTEGER) AS age_years,
  CAST(((julianday('now') - julianday(substr("Birth Date", 7, 4) || '-' || 
        substr("Birth Date", 4, 2) || '-' || substr("Birth Date", 1, 2))) % 365.25) / 30.44 AS INTEGER) AS age_months
FROM alldata
WHERE "Birth Date" IS NOT NULL 
  AND "Birth Date" <> ''
  AND length("Birth Date") = 10
LIMIT 10;`;

export const GETPLAYERAGESAGGREGATED = `
WITH player_ages AS (
  SELECT 
    Name_ID AS nameId,
    name AS player_Name,
    (julianday('now') - julianday(substr("Birth Date", 7, 4) || '-' || 
     substr("Birth Date", 4, 2) || '-' || substr("Birth Date", 1, 2))) / 30.44 AS total_age_months
  FROM alldata
  WHERE "Birth Date" IS NOT NULL 
    AND "Birth Date" <> ''
    AND length("Birth Date") = 10
)
    
SELECT 
  'overall' AS type,
  NULL AS nameId,
  CAST(AVG(total_age_months) / 12 AS INTEGER) AS avg_years,
  ROUND(AVG(total_age_months) % 12) AS avg_months,
  COUNT(*) AS player_count
FROM player_ages

UNION ALL

SELECT
  'player' AS type,
  nameId,
  CAST(AVG(total_age_months) / 12 AS INTEGER) AS avg_years,
  ROUND(AVG(total_age_months) % 12) AS avg_months,
  COUNT(*) AS entry_count
FROM player_ages
GROUP BY nameId
ORDER BY type DESC, nameId`;
