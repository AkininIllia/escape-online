export type Difficulty = 'Легкий' | 'Середній' | 'Складний';

export interface Quest {
  id: string;
  title: string;
  genre: string;
  difficulty: Difficulty;
  durationMinutes: number;
  description: string;
  riddlePrompt: string;
  solutionCode: string;
  hint: string;
  completed?: boolean;
}