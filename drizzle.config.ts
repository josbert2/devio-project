import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    url:'mysql://root:12345678@localhost:3307/devio-project',
  },
});