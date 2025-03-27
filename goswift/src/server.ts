import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Database } from './db';
import { User } from './types';

const db = new Database();
const PORT = 3000;

async function fetchJsonPlaceholderData(endpoint: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return await response.json();
}

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method || 'GET';

  try {
    // Load data endpoint
    if (method === 'GET' && path === '/load') {
      const users = await fetchJsonPlaceholderData('users');
      const posts = await fetchJsonPlaceholderData('posts');
      const comments = await fetchJsonPlaceholderData('comments');

      await db.clearCollections();

      for (const user of users.slice(0, 10)) {
        const userPosts = posts.filter((post: any) => post.userId === user.id);
        const enrichedPosts = userPosts.map((post: any) => ({
          ...post,
          comments: comments.filter((comment: any) => comment.postId === post.id)
        }));

        const enrichedUser = {
          ...user,
          posts: enrichedPosts
        };

        await db.insertUser(enrichedUser);
      }

      res.statusCode = 200;
      res.end();
      return;
    }

    // Get user by ID
    if (method === 'GET' && path.startsWith('/users/')) {
      const userId = parseInt(path.split('/')[2]);
      const user = await db.getUser(userId);

      if (!user) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'User not found' }));
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
      return;
    }

    // Delete all users
    if (method === 'DELETE' && path === '/users') {
      await db.deleteAllUsers();
      res.statusCode = 200;
      res.end();
      return;
    }

    // Delete user by ID
    if (method === 'DELETE' && path.startsWith('/users/')) {
      const userId = parseInt(path.split('/')[2]);
      const deleted = await db.deleteUser(userId);

      if (!deleted) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'User not found' }));
        return;
      }

      res.statusCode = 200;
      res.end();
      return;
    }

    // Put new user
    if (method === 'PUT' && path === '/users') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const user: User = JSON.parse(body);
          const existingUser = await db.getUser(user.id);

          if (existingUser) {
            res.statusCode = 409;
            res.end(JSON.stringify({ error: 'User already exists' }));
            return;
          }

          await db.insertUser(user);
          res.statusCode = 201;
          res.setHeader('Location', `/users/${user.id}`);
          res.end();
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid request body' }));
        }
      });
      return;
    }

    // Not found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));

  } catch (error) {
    console.error('Error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}

async function startServer() {
  await db.connect();
  
  const server = createServer(handleRequest);
  
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  process.on('SIGTERM', async () => {
    console.log('Shutting down server...');
    await db.disconnect();
    server.close(() => {
      console.log('Server shut down');
      process.exit(0);
    });
  });
}

startServer().catch(console.error);