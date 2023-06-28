import ApiDashboard from "@/components/api-dashboard";
import RequestApiKey from "@/components/RequestApiKey";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Text Similarity API | Dashboard",
  description:
    "Text Similarity API is a free and open source API for comparing text similarity.",
};

const page = async () => {
  const user = await getServerSession(authOptions);

  if (!user) {
    return notFound();
  }

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });

  return (
    <div className="mx-auto mt-16 max-w-7xl">
      {apiKey ? <ApiDashboard /> : <RequestApiKey />}
    </div>
  );
};

export default page;
