import * as dotenv from 'dotenv';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { useApp } from '../core/app';

const app = useApp()

dotenv.config({ path: '.env.test' });

const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

beforeAll(async () => {
  await testPrisma.$connect();
});

afterEach(async () => {
  await testPrisma.article.deleteMany(); // bersihkan data antar test
});

afterAll(async () => {
  await testPrisma.$disconnect();
});

describe('Root API', () => {

  it ('GET / →  should return successfully', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Ping successfully');
  });
});
