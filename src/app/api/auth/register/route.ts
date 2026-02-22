import { NextResponse } from "next/server";
import { PostgresUserRepository } from "@lib/repositories/postgresUser.repository";
import { AuthService } from "@/lib/services/user.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const service = new AuthService(new PostgresUserRepository());
    const user = await service.register(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}