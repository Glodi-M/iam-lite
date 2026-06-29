import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET manquant");
      return NextResponse.json({ authenticated: false }, { status: 500 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    // Ne retourner que les champs nécessaires (pas iat/exp)
    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch {
    // Token invalide ou expiré
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
