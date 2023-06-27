import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Heading from "@/ui/heading";
import { Input } from "@/ui/input";
import Paragraphs from "@/ui/paragraphs";
import { formatDistance } from "date-fns";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const apiKey = await db.apiKey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeApiKey = apiKey.find((apiKey) => apiKey.enabled);
  if (!activeApiKey) notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKey.map((key) => key.id),
      },
    },
  });

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <Heading>Welcome back, {user.user.name}</Heading>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
        <Paragraphs>Your API key:</Paragraphs>
        <Input className="truncate w-fit" readOnly value={activeApiKey.key} />
        {/* Add options to create new / revoke */}
      </div>

      <Paragraphs className="mt-4 -mb-4 text-center md:text-left">
        Your API history:
      </Paragraphs>
    </div>
  );
};

export default ApiDashboard;
