import * as dotenv from 'dotenv';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { useApp } from '../core/app';

dotenv.config({ path: '.env.test' });

const app = useApp();

const testPrisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});

let articleId: number;

// Helper: create one article
async function createMockArticle(title = 'Default Article') {
  const article = await testPrisma.article.create({ data: { title } });
  return article;
}

beforeAll(async () => {
  await testPrisma.$connect();
});

afterEach(async () => {
  await testPrisma.article.deleteMany();
});

afterAll(async () => {
  await testPrisma.$disconnect();
});

describe('Article API', () => {
  beforeEach(async () => {
    const mock = await createMockArticle('Mock Article for GET by ID');
    articleId = mock.id;
  });

  it('POST /api/v1/articles → create article', async () => {
    const res = await request(app)
      .post('/api/v1/articles')
      .send({ title: 'New Article' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Article created successfully');
    expect(res.body.data.title).toBe('New Article');
  });

  it('GET /api/v1/articles → should return all articles', async () => {
    await createMockArticle('Another Article');
    const res = await request(app).get('/api/v1/articles');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body?.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('GET /api/v1/articles/:id → should return one article', async () => {
    const res = await request(app).get(`/api/v1/articles/${articleId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body?.data?.id).toBe(articleId);
  });

  it('GET /api/v1/articles/:id → not found article', async () => {
    const randomId = articleId + 999999;
    const res = await request(app).get(`/api/v1/articles/${randomId}`);

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

    const getRes = await request(app).get(`/api/v1/articles/${articleId}`);
    expect(getRes.statusCode).toBe(404);
  });
});
