import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { url } = await req.json();
    const updatedUser = await prisma?.user.update({
      where: { id: session.user.id },
      data: { image: url },
    });
    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ error: "Db error" }, { status: 500 });
  }
}
