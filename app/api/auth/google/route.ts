import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    console.log(email, name);

    const mockUser = {
      id: "123",
      name: name,
      email: email,
      token: "jwt-token",
    };

    return NextResponse.json(mockUser, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error service" }, { status: 500 });
  }
}
