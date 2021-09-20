export interface IUser {
    name: string;
    points?: number;
}

export enum Guess {
  UP = "UP",
  DOWN = "DOWN"
}

export interface IUpdateUser {
  name: string;
  guess: Guess;
  price: number;
}