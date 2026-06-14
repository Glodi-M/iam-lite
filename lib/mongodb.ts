import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error(
        "Veuiller définir la variable d'environnement MONGODB_URI dans le fichier .env.local");
    }
export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connecté à la base de données MongoDB");
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données MongoDB:", error);
        throw error;
    }
}