import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const app = fastify();

const database = new DatabasePostgres();

app.post('/videos', async (req, reply) => {
  const { title, description, duration } = req.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send('created');
});

app.get('/videos', async (req) => {
  const { search } = req.query;

  const videos = await database.list(search);

  return videos;
});

app.put('/videos/:id', async (req, reply) => {
  const videoID = req.params.id;

  const { title, description, duration } = req.body;

  await database.update(videoID, {
    title,
    description,
    duration,
  });

  reply.status(204);
});

app.delete('/videos/:id', async (req, reply) => {
  const videoID = req.params.id;

  await database.delete(videoID);

  reply.send('deleted');
});

app.listen(
  {
    port: process.env.PORT ?? 3000,
  },
  () => {
    console.log('Server is running 🚀');
  }
);
