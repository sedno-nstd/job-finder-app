import { getServerSession } from "next-auth";

export async function UpdatePhone(token: string, newPhone: string) {
  const session = await getServerSession();

  if (!session?.user.id) throw new Error("user does not exist");

  const storedToken = await prisma?.verificationToken.findFirst({
    where: { userId: session.user.id, target: newPhone, type: "Phone" },
  });

  if (!storedToken) {
    return { success: false, error: "code is not define" };
  }

  if (token !== storedToken.token) {
    return { success: false, error: "Unvalid token, please try again" };
  }

  if (storedToken && new Date() > storedToken.expires) {
    return { success: false, error: "Time is lost, try again" };
  }
  await prisma?.verificationToken.deleteMany({
    where: { target: newPhone, token: token, type: "Phone" },
  });

  try {
    await prisma?.user.update({
      where: { id: session.user.id },
      data: {
        phone: newPhone,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "failed to change Phone" };
  }
}
