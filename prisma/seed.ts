import { prisma } from "@/lib/prisma";
import { vacancies } from "@/src/domain/vacancy/types";

export async function Seed(data: any[], authorId: string) {
  try {
    if (!authorId) throw new Error("User does not exist");
    const formattedVacancies = data.map((v) => ({
      ...v,

      stack: Array.isArray(v.stack) ? v.stack.join(",") : v.stack,
      level: Array.isArray(v.level) ? v.level.join(",") : v.level,
      postedAt: new Date(v.postedAt),
      authorId: authorId,
    }));

    const result = await prisma?.vacancy.createMany({
      data: formattedVacancies,
    });

    return result;
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  const myId = "cmlnuyg8c0000ll8wzwag9m0n";
  await Seed(vacancies, myId);
}

main()
  .then(async () => {
    await prisma?.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma?.$disconnect();
    process.exit(1);
  });
