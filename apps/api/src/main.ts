import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Tell Express to treat `X-Forwarded-For` as authoritative — but only the
  // hop directly in front of us (Railway's load balancer in production). With
  // this set, `req.ip` returns the leftmost untrusted value from XFF (i.e. the
  // real diner IP) for traffic arriving via the load balancer, and the raw
  // socket address for direct connections. Without it, any client could spoof
  // `X-Forwarded-For` and bypass the IP-keyed predicates in AbuseStackService.
  // Raise the trust count if more proxies are ever added in front of Node.
  // TODO: revisit if the deployment topology changes — `trust proxy = 1` is
  // only safe while Node is exclusively reachable through Railway's LB. If we
  // ever expose a direct route to the container, a client could send one XFF
  // hop and have it accepted as `req.ip`. Tighter alternatives: pin to a CIDR
  // (Railway doesn't publish stable ranges today) or require a shared-secret
  // header injected by the LB.
  app.set('trust proxy', 1);
  app.enableCors({
    origin: [
      'http://localhost:5000',
      process.env.WEB_APP_URL,
    ].filter((origin): origin is string => Boolean(origin)),
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
