"use client";
import { useState } from "react";
import { createPost } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createPost(title, url);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Submit New Post</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="border p-2"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Post URL"
        className="border p-2"
      />
      <button type="submit" className="bg-orange-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
