import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { BASE_URL } from "../utils/baseUrl";
import { SHORT_URL } from "../utils/baseUrl";
import { toast } from "sonner";
import { ModalWrapper } from "./ui/modelWrapper"; // adjust path as needed

interface URLData {
  id: string;
  url: string;
  shortCode: string;
  createdAt: string;
  accessCount: number;
}

export function URLTable() {
  const [data, setData] = useState<URLData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editShortCode, setEditShortCode] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState<string>("");

  useEffect(() => {
    fetchURLs();
  }, []);

  const fetchURLs = async () => {
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
      setData(json);
    } catch (error: any) {
      toast.error(error.message || "Error fetching URL list");
    }
  };

  const handleDelete = async (shortCode: string) => {
    try {
      const res = await fetch(`${BASE_URL}/shorten/${shortCode}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete URL");
      toast.success("URL deleted successfully");
      fetchURLs();
    } catch (error: any) {
      toast.error(error.message || "Error deleting URL");
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEdit = async () => {
    if (!editShortCode || !editUrl.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/shorten/${editShortCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: editUrl }),
      });

      if (!res.ok) throw new Error("Failed to update URL");
      toast.success("URL updated successfully");
      fetchURLs();
    } catch (error: any) {
      toast.error(error.message || "Error updating URL");
    } finally {
      setEditShortCode(null);
      setEditUrl("");
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg bg-white/50 backdrop-blur-sm overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Hits</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="max-w-[300px] truncate">
                  {url.url}
                </TableCell>
                <TableCell>
                  <a
                    href={`${SHORT_URL}/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {`${SHORT_URL}/${url.shortCode}`}
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(url.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{url.accessCount}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditShortCode(url.shortCode);
                        setEditUrl(url.url);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => setConfirmDelete(url.shortCode)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editShortCode && (
        <ModalWrapper>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md mx-4">
              <h2 className="text-lg font-semibold">Update URL</h2>
              <Input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="Enter new URL"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEditShortCode(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEdit}>Update</Button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}

      {confirmDelete && (
        <ModalWrapper>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm mx-4">
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this URL?</p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(confirmDelete)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
