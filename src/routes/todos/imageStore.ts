// store.ts
import { writable } from 'svelte/store';

// Writable store to hold the fetched data
export const dogData = writable<Record<string, any> | undefined>(undefined);

// Function to fetch a random dog image
export const fetchDogData = async () => {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const json = await res.json();
    dogData.set(json); // Store the fetched data
  } catch (error) {
    console.error('Fetch error:', error);
    dogData.set(undefined); // Reset store on error
  }
};
