import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { config, Types, PhoenixStore } from './utils';
import * as csurf from 'csurf';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieParser(),
    session({
      store: new PhoenixStore(app.get(Types.ModuleType.PRISMA)),
      resave: false,
      saveUninitialized: false,
      secret: config().session.secret,
      name: 'sessionId',
      cookie: {
        maxAge: 6e5,
        secure: false,
      },
    }),
    csurf(),
  );
  app.enableCors({
    credentials: true,
    origin: config().cors.origin,
  });
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
