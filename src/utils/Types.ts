export type LoginType = 'DISCORD';
export type Done = (err: Error, user: any) => void;

export interface DiscordUser extends Express.User {
  id: string;
  refreshToken: string;
  accessToken: string;
  fetchedAt: string;
}

export enum ModuleType {
  PRISMA = 'prisma',
  DISCORD = 'discord',
  AUTH = 'auth',
}
