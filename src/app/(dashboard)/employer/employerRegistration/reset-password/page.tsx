import { JoobleLogo } from "@/public/images/userHeader/logo";
import { ResetPassword } from "@/src/components/employerRegistation/ResetPassword";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const token =
    typeof resolvedParams.token === "string" ? resolvedParams.token : undefined;

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-bold">
          Error: No reset token provided.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#eff2f6] py-10">
      <JoobleLogo width={88} height={31} />
      <ResetPassword token={token} className="max-w-[448px]" />
    </div>
  );
}
