import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { BASE_URL } from "./../utils/baseUrl"; // adjust import path as needed
import { useNavigate } from "react-router-dom";

export function URLShortenerForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const naviagator= useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(`Short URL: ${data.shortCode}`);
      setUrl("");
      naviagator("/dashboard");
      
    } catch (error: any) {
      toast.error(error.message || "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="url"
          placeholder="Enter your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>
    </form>
  );
}
