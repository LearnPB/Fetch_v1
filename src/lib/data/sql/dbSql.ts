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
