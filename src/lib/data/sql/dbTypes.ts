// src\lib\data\sql\dbTypes.ts
export type Player = {
  playerName: string;
  nameId: number;
  totalPay: number; // Changed from playerPay to match your SQL alias
  birth_Date?: string; // Optional property from PlayerAge
};


export type PlayerAge = {
  nameId: number;
  avg_years: number;
  avg_months: number;
};

export type AgeResult = {
  perPlayerAvg: PlayerAge[];
  overallAvg: {
    avg_years: number;
    avg_months: number;
  };
  error?: string;
};

export type PlayerWithAge = {
  nameId: number;
  player_Name: string;
  age_years: number;
  age_months: number;
};

export type AgeAggregateRow = {
  type: 'player' | 'overall';
  nameId: number | null;
  avg_years: number;
  avg_months: number;
  player_count: number;
};

export type SalesTracker = {
  id: number;
  month: string;
  revenue: number;
  costs: number;
}