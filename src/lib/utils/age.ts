// src/lib/utils/age.ts (New utility file)
// This file contains functions for calculating age and converting between age representations.

import { differenceInYears, differenceInMonths, parse } from 'date-fns';
// Import date-fns functions for calculating differences in years and months, and for parsing a date string.

/**
 * Calculate the age in years and months from a given birthdate string.
 * @param birthDateStr The birthdate string in the format 'dd-MM-yyyy'.
 * @returns An object with 'years' and 'months' properties, or null if the input is invalid.
 */
export function calculateAge(birthDateStr: string): { years: number, months: number } | null {
  // If the input is null or undefined, return null.
  if (!birthDateStr) return null;

  // Parse the birth date string into a Date object.
  const birthDate = parse(birthDateStr, 'dd-MM-yyyy', new Date());
  // If the parsed date is invalid (i.e., NaN), return null.
  if (isNaN(birthDate.getTime())) return null;

  // Calculate the difference in years and months between the current date and the birth date.
  const today = new Date();
  const years = differenceInYears(today, birthDate);
  const months = differenceInMonths(today, birthDate) % 12;

  // Return an object with the calculated age in years and months.
  return { years, months };
}

/**
 * Convert an age object to a single number of months.
 * @param age The age object with 'years' and 'months' properties.
 * @returns The age in months.
 */
export function ageToMonths(age: { years: number, months: number }): number {
  // Multiply the years by 12 and add the months to get the total months.
  return age.years * 12 + age.months;
}

/**
 * Convert a number of months to an age object.
 * @param totalMonths The total number of months.
 * @returns An object with 'avg_years' and 'avg_months' properties.
 */
export function monthsToAge(totalMonths: number): { avg_years: number, avg_months: number } {
  // Calculate the average years and months.
  const avg_years = Math.floor(totalMonths / 12);
  const avg_months = Math.round(totalMonths % 12);

  // Return an object with the calculated average age in years and months.
  return {
    avg_years,
    avg_months
  };
}

