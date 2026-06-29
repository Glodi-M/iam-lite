import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

// Créer un utilisateur
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password } = body;

    // Validation des champs
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Le nom doit contenir au moins 2 caractères" },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    // bcrypt.hash ne retourne jamais null/undefined, le check suivant était inutile
    const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds (mieux que 10)

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Ne jamais retourner le document complet (contient le hash du mot de passe)
    return NextResponse.json(
      {
        message: "Utilisateur créé avec succès",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/users]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Obtenir tous les utilisateurs — PROTÉGÉ : ne doit être accessible qu'aux ADMINs
// TODO: ajouter un middleware d'autorisation ou vérifier le token ici
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Vérification minimale du token (la vraie protection est dans le middleware)
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const users = await User.find({})
      .select("-password -__v") // Exclure le mot de passe ET __v
      .lean()                   // Retourner des objets JS simples (plus rapide)
      .sort({ createdAt: -1 }); // Du plus récent au plus ancien

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("[GET /api/users]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
