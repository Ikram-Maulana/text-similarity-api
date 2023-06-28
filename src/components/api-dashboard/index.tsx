import { columns } from "@/api-dashboard/columns";
import { DataTable } from "@/api-dashboard/data-tables";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Heading from "@/ui/heading";
import { Input } from "@/ui/input";
import Paragraphs from "@/ui/paragraphs";
import { formatDistance } from "date-fns";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ApiKeyOptions from "../ApiKeyOptions";

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

  const data = serializableRequests.map((request) => ({
    usedApiKey: request.usedApiKey,
    path: request.path,
    recency: `${request.timestamp} ago`,
    duration: `${request.duration} ms`,
    status: request.status,
  }));

  return (
    <div className="container flex flex-col gap-6">
      <Heading>Welcome back, {user.user.name}</Heading>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
        <Paragraphs>Your API key:</Paragraphs>
        <Input
          className="truncate w-fit dark:text-slate-400"
          readOnly
          value={activeApiKey.key}
        />
        <ApiKeyOptions
          apiKeyId={activeApiKey.id}
          apiKeyKey={activeApiKey.key}
        />
      </div>

      <Paragraphs className="mt-4 -mb-4 text-center md:text-left">
        Your API history:
      </Paragraphs>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ApiDashboard;
