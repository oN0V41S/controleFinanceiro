import { NextResponse } from "next/server";
import { PostgresUserRepository } from "@/lib/repositories/postgresUser.repository";
import { AuthService } from "@/lib/services/user.service"; // Nome ajustado
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const service = new AuthService(new PostgresUserRepository());
    const user = await service.login(body);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ sub: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    const response = NextResponse.json({ user }, { status: 200 });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200, // 2h
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}