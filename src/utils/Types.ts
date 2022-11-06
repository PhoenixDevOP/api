import type { Prisma } from '@prisma/client';

export enum LoginType {
  DISCORD = 'DISCORD',
  GOOGLE = 'GOOGLE',
}
export type Done = (err: Error, user: Express.User) => void;

export interface DiscordUser
  extends Omit<BaseUserData<LoginType.DISCORD>, 'type'> {
  type: LoginType.DISCORD;
  metadata: {
    guilds?: GuildMetaData[] | [];
  };
}

export interface GuildMetaData extends Prisma.InputJsonObject {
  owner: boolean;
  permissions: number;
  icon: string | null;
  id: string;
  name: string;
  features?: string[] | undefined;
}

export interface BaseUserData<T extends LoginType = LoginType>
  extends Express.User {
  id: string;
  type: T;
  refreshToken: string;
  accessToken: string;
  fetchedAt: string;
  metadata: Prisma.InputJsonObject;
}

export type UserResolver = DiscordUser | GoogleUser;

export interface GoogleUser
  extends Omit<BaseUserData<LoginType.GOOGLE>, 'type'> {
  type: LoginType.GOOGLE;
  metadata: {
    email: string;
  };
}

export enum ModuleType {
  PRISMA = 'prisma',
  DISCORD = 'discord',
  AUTH = 'auth',
}
