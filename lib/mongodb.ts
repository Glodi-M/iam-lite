import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Veuillez définir la variable d'environnement MONGODB_URI dans .env.local"
  );
}

// Cache la connexion entre les hot-reloads en dev et entre les invocations serverless
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Évite de recréer des connexions à chaque appel de route en Next.js
const globalForMongoose = global as unknown as { mongooseCache: MongooseCache };

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = { conn: null, promise: null };
}

const cache = globalForMongoose.mongooseCache;

export async function connectDB(): Promise<typeof mongoose> {
  // Si déjà connecté, on retourne directement
  if (cache.conn) {
    return cache.conn;
  }

  // Si une connexion est déjà en cours, on attend
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    // Reset en cas d'erreur pour permettre une nouvelle tentative
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}