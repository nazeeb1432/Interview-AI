import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
    dbCredentials: {
        url:'postgresql://neondb_owner:npg_YKVQl0nW5mAX@ep-broad-breeze-a1d20ni2-pooler.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require'
    },
});