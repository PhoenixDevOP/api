import { Session } from '@prisma/client';
import { SessionData, Store } from 'express-session';
import { PrismaService } from 'src/services/prisma.service';
import Utils from './Util';

export default class PhoenixStore extends Store {
  public timeout: NodeJS.Timer | null = null;
  constructor(
    private prisma: PrismaService,
    private refreshTimeout: number = 1000,
  ) {
    super();
    this.startInterval();
  }

  public async prune() {
    const query = await this.findSession();
    const expireSession = query
      .filter((session) => new Date().valueOf() >= session.expireAt.valueOf())
      .map(({ sessionId }) => sessionId);
    await this.prisma.session.deleteMany({
      where: { sessionId: { in: expireSession ?? [] } },
    });
  }
  public startInterval() {
    if (this.timeout) {
      clearInterval(this.timeout);
      this.timeout = null;
    }
    if (!this.timeout) {
      this.timeout = setInterval(
        async () => await this.prune(),
        this.refreshTimeout,
      ) as unknown as NodeJS.Timer;
    }
  }
  async destroy(sid: string, callback?: (err?: any) => void) {
    const session = await this.findSession(sid);
    if (!session) return callback();
    await this.prisma.session.deleteMany({
      where: { sessionId: session.sessionId },
    });
    if (callback) Utils.defer(callback);
    return;
  }

  public async get(
    sessionId: string,
    callback: (err?: any, session?: SessionData) => any,
  ) {
    const session = await this.findSession(sessionId);
    if (!session) return callback();
    const result = JSON.parse(session.data ?? '{}') as SessionData;
    if (callback) Utils.defer(callback, null, result);
    return;
  }
  public async set(
    sessionId: string,
    session: SessionData,
    callback?: (err?: any) => void,
  ) {
    const { expires } = session.cookie;
    await this.createSessions({
      data: JSON.stringify(session),
      sessionId,
      expireAt: expires,
      createdAt: new Date(),
    });
    if (callback) Utils.defer(callback);
    return;
  }

  public async clear(callback?: (err?: any) => void) {
    const sessions = await this.findSession();
    if (sessions.length) await this.prisma.session.deleteMany();
    if (callback) Utils.defer(callback);
    return;
  }

  private findSession(): Promise<Session[]>;
  private findSession(sessionId: string): Promise<Session | null>;
  private async findSession(sessionId?: string) {
    if (!sessionId) {
      const sessions: Session[] = [];
      for (const session of await this.prisma.session.findMany({})) {
        sessions.push(session);
      }
      return sessions;
    }
    const session = await this.prisma.session.findUnique({
      where: { sessionId },
    });
    return session ?? null;
  }

  private async createSessions(session: Session) {
    const sessions = await this.findSession(session.sessionId);
    if (!sessions)
      return await this.prisma.session.create({
        data: session,
      });
    await this.prisma.session.update({
      data: session,
      where: { sessionId: sessions.sessionId },
    });
    return session;
  }
}
