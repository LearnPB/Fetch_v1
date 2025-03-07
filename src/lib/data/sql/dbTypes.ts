// src\lib\data\sql\dbTypes.ts
export type Player = {
  playerName: string;
  nameId: number;
  totalPay: number; // Changed from playerPay to match your SQL alias
};
