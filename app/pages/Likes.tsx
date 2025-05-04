"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

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
      const response = await fetch(`https://hackernews.yellowflower-336119c8.centralindia.azurecontainerapps.io/likes/on/${postId}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data: LikesResponse = await response.json();
        setLikesCount(data.likes.length);
        setLiked(data.likedByCurrentUser);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to fetch likes:", error.message);
      } else {
        console.error("Failed to fetch likes.");
      }
    }
  }, [postId]);

  const handleLike = async () => {
    try {
      const method = liked ? "DELETE" : "POST";
      const response = await fetch(`https://hackernews.yellowflower-336119c8.centralindia.azurecontainerapps.io/likes/on/${postId}`, {
        method,
        credentials: "include",
      });

      if (response.status === 401) {
        router.push("/auth/login");
        return;
      }

      if (response.ok) {
        fetchLikes(); // Refresh after like/unlike
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error liking the post:", error.message);
      } else {
        console.error("Error liking the post.");
      }
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
