import type { PageLoad } from './$types';

// Properly define the return type for the load function
interface LoadData {
  salesData: Array<{
    id: number;
    month: string;
    revenue: number;
    costs: number;
  }>;
  status: 'success' | 'error';
  message?: string;
}

export const load: PageLoad<LoadData> = async ({ fetch }) => {
  try {
    // Use the existing endpoint to get data
    const response = await fetch('/api/salestracker');

    if (!response.ok) {
      throw new Error('Failed to load sales data');
    }

    const salesData: LoadData['salesData'] = await response.json();

    return {
      salesData,
      status: 'success'
    };
  } catch (error) {
    console.error('Error loading sales data:', error);

    return {
      salesData: [],
      status: 'error',
      message: 'Unable to load sales data'
    };
  }
};