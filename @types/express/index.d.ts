import PhoenixStore from '../../src/utils/SessionStore';
import 'express';
declare module 'express' {
  interface Request {
    sessionStore: PhoenixStore;
  }
}
