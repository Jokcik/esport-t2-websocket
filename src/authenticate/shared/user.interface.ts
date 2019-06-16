import { Document } from 'mongoose';

export class CupProfileAccount {
  account: string = '';
  game: string;
  win: number;
  lose: number;

  constructor(game: string) {
    this.game = game;
  }
}

export class CupProfileUser {
  _id: string;
  games: CupProfileAccount[];

  constructor() {
    this.games = [];
  }
}

export interface User extends Document {
  readonly _id: string;
  readonly username: string;
  readonly avatar: string;
  readonly rights: number;
  readonly phone: string;
  readonly email: string;
  readonly tickets: number;
  readonly profile: CupProfileUser;
}
