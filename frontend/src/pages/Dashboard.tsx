import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { URLTable } from "@/components/URLTable";
import { BASE_URL } from "@/utils/baseUrl";
import { toast } from "sonner";

interface URLData {
  id: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  accessCount: number;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<URLData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchURLStats();
  }, []);

  const fetchURLStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/shorten/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch URLs");
      setUrls(json);
    } catch (err: any) {
      toast.error(err.message || "Error loading stats");
    } finally {
      setIsLoading(false);
    }
  };

  const totalURLs = urls.length;
  const totalHits = urls.reduce((sum, url) => sum + url.accessCount, 0);

  const hitsInLast7Days = urls.reduce((sum, url) => {
    const updated = new Date(url.updatedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return updated > sevenDaysAgo ? sum + url.accessCount : sum;
  }, 0);

  const mostPopular = urls.reduce((max, url) => {
    return url.accessCount > max.accessCount ? url : max;
  }, urls[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Total URLs Created"
              value={totalURLs.toString()}
              isLoading={isLoading}
            />
            <StatsCard
              title="Total Hits"
              value={totalHits.toLocaleString()}
              isLoading={isLoading}
            />
            <StatsCard
              title="Most Popular URL"
              value={mostPopular?.accessCount?.toLocaleString() || "N/A"}
              description={mostPopular?.url || ""}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your URLs</h2>
            <URLTable />
          </div>
        </div>
      </main>
    </div>
  );
}
