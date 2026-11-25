import { INITIAL_QUESTS } from '../data/quests';
import { type Quest } from '../types/quest';

const STORAGE_KEY = 'escape_online_quests_v1';

export function loadQuests(): Quest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_QUESTS;
    const parsed = JSON.parse(raw) as Quest[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_QUESTS;
  } catch {
    return INITIAL_QUESTS;
  }
}

export function saveQuests(quests: Quest[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quests));
}

export function resetQuestsStorage(): Quest[] {
  localStorage.removeItem(STORAGE_KEY);
  return INITIAL_QUESTS;
}