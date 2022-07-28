import { Session } from '@prisma/client';
import { SessionData, Store } from 'express-session';
import { PrismaService } from 'src/services/prisma.service';
import Utils from './Util';

export default class PhoenixStore extends Store {
  public timeout: NodeJS.Timer | null = null;
  constructor(
    private prisma: PrismaService,
    private refreshTimeout: number = 60000,
  ) {
    super();
    this.startInterval();
  }

  public async prune() {
    const query = await this.findSession();
    const expireSession = query
      .filter((session) => new Date().valueOf() >= session.updateAt.valueOf())
      .map(({ sessionId }) => sessionId);
    await this.prisma.session.deleteMany({
      where: { sessionId: { in: expireSession } },
    });
  }
  public startInterval() {
    if (this.timeout) {
      console.log('[Scheduler] Stopped interval');
      clearInterval(this.timeout);
      this.timeout = null;
    }
    if (!this.timeout) {
      console.log('[Scheduler] Started interval');
      this.timeout = setInterval(
        async () => await this.prune(),
        this.refreshTimeout,
      );
    }
  }
  async destroy(sid: string, callback?: (err?: any) => void) {
    const session = await this.findSession(sid);
    if (!session) return callback(null);
    await this.prisma.session.delete({
      where: { sessionId: session.sessionId },
    });
    if (callback) Utils.defer(callback);
  }

  public async get(
    sessionId: string,
    callback: (err: any, session?: SessionData) => any,
  ) {
    const session = await this.findSession(sessionId);
    if (!session) return callback(null);
    const result = JSON.parse(session.data ?? '{}') as SessionData;
    if (callback) Utils.defer(callback, null, result);
    return result;
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
      updateAt: expires,
      createdAt: new Date(),
    });
    if (callback) return Utils.defer(callback);
  }

  public async clear(callback?: (err?: any) => void) {
    const sessions = await this.findSession();
    if (sessions.length) await this.prisma.session.deleteMany();
    if (callback) Utils.defer(callback);
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
    const session = await this.prisma.session.findFirst({
      where: { sessionId },
    });
    if (!session) return null;
    return session;
  }

  private async createSessions(session: Session) {
    let sessions = await this.findSession(session.sessionId);
    if (!sessions)
      sessions = await this.prisma.session.create({
        data: session,
      });
    return sessions;
  }
}
