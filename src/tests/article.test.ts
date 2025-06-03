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

describe('Article API', () => {
  let articleId: number;

  beforeEach(async () => {
    await testPrisma.article.deleteMany();
    await testPrisma.article.createMany({
      data: [
        { title: 'Mock Article 1' },
        { title: 'Mock Article 2' },
      ],
    });
  });

  beforeEach(async () => {
    await testPrisma.article.deleteMany();

    const mockArticle = await testPrisma.article.create({
      data: { title: 'Mock Article for GET by ID' },
    });

    articleId = mockArticle.id;
  });

  it ('GET / →  should return successfully', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Ping successfully');
  });

  it('POST /api/v1/articles → create article', async () => {
    const res = await request(app)
      .post('/api/v1/articles')
      .send({ title: 'New Article' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Article created successfully');
    articleId = res.body.id;
  });

  it('GET /api/v1/articles → should return all articles', async () => {
    const res = await request(app).get('/api/v1/articles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body?.data)).toBe(true);
  });

  it('GET /api/v1/articles/:id → should return one article', async () => {
    const res = await request(app).get(`/api/v1/articles/${articleId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body?.data?.id).toBe(articleId);
  });

   it('GET /api/v1/articles/:id → not found article', async () => {
    const randomId = articleId + 999999;
    const res = await request(app).get(`/api/v1/articles/${randomId}`);
    console.log(res.body);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Article not found');
  });

  it('PUT /api/v1/articles/:id → update article', async () => {
    const res = await request(app)
      .put(`/api/v1/articles/${articleId}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body?.data?.title).toBe('Updated Title');
  });

  it('DELETE /api/v1/articles/:id → delete article', async () => {
    const res = await request(app).delete(`/api/v1/articles/${articleId}`);
    expect(res.statusCode).toBe(200);
  });
});
