"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/environment";

interface LikesProps {
  postId: string;
}

interface LikesResponse {
  likes: Array<{ id: string }>;
  likedByCurrentUser: boolean;
}

const Likes = ({ postId }: LikesProps) => {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const fetchLikes = useCallback(async () => {
    try {
      const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data: LikesResponse = await response.json();
        setLikesCount(data.likes.length);
        setLiked(data.likedByCurrentUser);
      } else if (response.status === 401) {
        setLiked(false);
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  }, [postId]);

  const handleLike = async () => {
    try {
      const method = liked ? "DELETE" : "POST";
      const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
        method,
        credentials: "include",
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (response.ok) {
        fetchLikes();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
    >
      {liked ? "Unlike" : "Like"} ({likesCount})
    </button>
  );
};

export default Likes;
