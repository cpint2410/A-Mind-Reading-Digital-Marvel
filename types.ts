
export enum GameState {
  WELCOME,
  PLAYING,
  CALCULATING,
  RESULT,
}

export interface CardData {
  id: number;
  value: number;
  numbers: number[];
}
