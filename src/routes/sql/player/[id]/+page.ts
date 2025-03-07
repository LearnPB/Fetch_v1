// src\routes\sql\player\[id]\+page.ts

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Player } from '$lib/data/sql/dbTypes';

export const load: PageLoad = async ({ fetch, params, depends }) => {
  depends('player:data');

  try {
    const res = await fetch(`/sql/player/${params.id}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw error(res.status, errorData.error || 'Failed to load player data');
    }

    const player: Player = await res.json();
    return { player };
  } catch (err) {
    console.error('Error loading player:', err);
    throw error(500, 'Failed to load player data');
  }
};

//  const res = await fetch(`/sql/player/${params.id}`);