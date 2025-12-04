import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../components/Toast";
const API_URL = "http://localhost:5001/api";

export function AddAnimePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toast, setToast] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setToast(null);
    try {
      const payload = {
        title,
        synopsis,
        image_url: imageUrl,
        images: {
          jpg: {
            image_url: imageUrl,
            small_image_url: imageUrl,
            large_image_url: imageUrl,
          },
        },
      };

      const res = await fetch(`${API_URL}/anime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add anime");
      }

      const data = await res.json();
      setToast({ message: `✓ Added: ${data.data.title}`, type: "success" });
      setTitle("");
      setSynopsis("");
      setImageUrl("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setToast({ message: `✗ Error: ${err.message}`, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold mb-4">Add Custom Anime</h2>
        <form onSubmit={submit}>
          <label className="block mb-2 font-medium">Title</label>
          <input
            className="w-full mb-4 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Synopsis</label>
          <textarea
            className="w-full mb-4 p-2 border rounded"
            rows={4}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />

          <label className="block mb-2 font-medium">Image URL</label>
          <input
            className="w-full mb-4 p-2 border rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="preview"
              className="w-32 h-40 object-cover mb-4 rounded"
            />
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Anime
          </button>
        </form>
      </div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
