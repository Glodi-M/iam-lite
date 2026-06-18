import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Déconnexion réussie" },
    { status: 200 },
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immédiatement le cookie
    path: "/",
  });

  return response;
}
