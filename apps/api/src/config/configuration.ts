export default () => ({
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    name: process.env.DATABASE_NAME ?? 'lustorvr',
    user: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
  },
  r2: {
    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET,
  },
  email: {
    resendKey: process.env.RESEND_KEY,
    from: process.env.EMAIL_FROM ?? 'noreply@example.com',
  },
  auth: {
    secret: process.env.BETTER_AUTH_SECRET,
    url: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',
  },
});
