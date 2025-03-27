import { MongoClient, Db, Document, WithId } from 'mongodb';
import { User, Post, Comment } from './types';

export class Database {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017/');
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('userdata');
    console.log('Connected to MongoDB');
  }

  async disconnect() {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }

  async clearCollections() {
    const db = this.getDb();
    await db.collection('users').deleteMany({});
    await db.collection('posts').deleteMany({});
    await db.collection('comments').deleteMany({});
  }

//   async insertUser(userData: User): Promise<void> {
//     const db = this.getDb();
    
//     // Extract posts and comments from user data
//     const { posts, ...userWithoutPosts } = userData;
    
//     // Store user data without posts
//     await db.collection('users').insertOne(userWithoutPosts);
    
//     // Store posts
//     if (posts && posts.length > 0) {
//       for (const post of posts) {
//         const { comments, ...postWithoutComments } = post;
        
//         // Add userId to post
//         const postData = {
//           ...postWithoutComments,
//           userId: userData.id
//         };
        
//         // Store post
//         await db.collection('posts').insertOne(postData);
        
//         // Store comments
//         if (comments && comments.length > 0) {
//           const commentsWithPostId = comments.map(comment => ({
//             ...comment,
//             postId: post.id,
//             userId: userData.id
//           }));
//           await db.collection('comments').insertMany(commentsWithPostId);
//         }
//       }
//     }
//   }

async insertUser(userData: User): Promise<void> {
    const db = this.getDb();
    
    // Extract posts and comments from user data
    const { posts, ...userWithoutPosts } = userData;
    
    // Store user data without posts
    const userResult = await db.collection('users').insertOne(userWithoutPosts);
    const userId = userResult.insertedId; // Get the MongoDB _id for the user

    // Store posts
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const { comments, ...postWithoutComments } = post;
        
        // Add userId to post (use the Mongo _id)
        const postData = {
          ...postWithoutComments,
          userId: userId // link post to the correct user
        };
        
        // Store post
        const postResult = await db.collection('posts').insertOne(postData);
        const postId = postResult.insertedId; // Get the MongoDB _id for the post

        // Store comments
        if (comments && comments.length > 0) {
          const commentsWithPostId = comments.map(comment => ({
            ...comment,
            postId: postId, // link comment to the correct post
            userId: userId  // link comment to the correct user
          }));

          // Insert comments for the post
          await db.collection('comments').insertMany(commentsWithPostId);
        }
      }
    }
}


  async getUser(userId: number): Promise<User | null> {
    const db = this.getDb();
    
    // Get user data
    const document = await db.collection('users').findOne({ id: userId });
    if (!document) {
      return null;
    }
    const { _id, ...userData } = document;

    // Get user's posts
    const posts = await db.collection('posts')
      .find({ userId: userId })
      .toArray();

    // Get comments for each post
    const enrichedPosts = await Promise.all(posts.map(async (post) => {
      const { _id, userId, ...postData } = post;
      const comments = await db.collection('comments')
        .find({ postId: post.id })
        .toArray();
      
      const commentsWithoutIds = comments.map(({ _id, userId, postId, ...comment }) => comment);
      
      return {
        ...postData,
        comments: commentsWithoutIds
      } as Post;
    }));

    // Combine user data with posts and comments
    return {
      ...userData,
      posts: enrichedPosts
    } as User;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const db = this.getDb();
    
    // Delete user's comments
    await db.collection('comments').deleteMany({ userId: userId });
    
    // Delete user's posts
    await db.collection('posts').deleteMany({ userId: userId });
    
    // Delete user
    const result = await db.collection('users').deleteOne({ id: userId });
    return result.deletedCount > 0;
  }

  async deleteAllUsers(): Promise<void> {
    const db = this.getDb();
    await this.clearCollections();
  }
}