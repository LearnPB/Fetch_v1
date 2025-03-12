// src/lib/utils/age.ts (New utility file)
import { differenceInYears, differenceInMonths, parse } from 'date-fns';

export function calculateAge(birthDateStr: string): { years: number, months: number } | null {
  if (!birthDateStr) return null;

  const birthDate = parse(birthDateStr, 'dd-MM-yyyy', new Date());
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  const years = differenceInYears(today, birthDate);
  const months = differenceInMonths(today, birthDate) % 12;

  return { years, months };
}

export function ageToMonths(age: { years: number, months: number }): number {
  return age.years * 12 + age.months;
}

export function monthsToAge(totalMonths: number): { avg_years: number, avg_months: number } {
  return {
    avg_years: Math.floor(totalMonths / 12),
    avg_months: Math.round(totalMonths % 12)
  };
}
