
import { URLShortenerForm } from "@/components/URLShortenerForm";
import { Navbar } from "@/components/Navbar";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Links
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create short, memorable links in seconds. Perfect for social media, marketing campaigns, or any time you need to share links efficiently.
          </p>
          <URLShortenerForm />
        </div>
      </main>
    </div>
  );
}
