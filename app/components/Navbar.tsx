"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import {
  Home,
  Users,
  Briefcase,
  MessageCircle,
  Bell,
  User,
  Grid,
  Star,
} from "lucide-react";

interface NavigationBarProps {
  hideNavItems?: boolean;
}

const NavigationBar = ({ hideNavItems = false }: NavigationBarProps) => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await betterAuthClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out.");
    } finally {
      setIsLoading(false);
    }
  };

  if (hideNavItems) return null;

  return (
    <nav className="w-full bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between">
      {/* Left - Logo + Search */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 w-8 h-8 rounded-sm text-white flex items-center justify-center font-bold text-lg">
            in
          </div>
        </Link>
        <div className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-600 flex items-center">
          <span className="mr-2">🔍</span>
          Search
        </div>
      </div>

      {/* Middle - Nav Links */}
      <div className="flex space-x-6 text-xs text-center">
        <Link
          href="/"
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link
          href="/network"
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <Users size={18} />
          <span>My Network</span>
        </Link>
        <Link
          href="/jobs"
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <Briefcase size={18} />
          <span>Jobs</span>
        </Link>
        <Link
          href="/messages"
          className="flex flex-col items-center text-gray-700 hover:text-black"
        >
          <MessageCircle size={18} />
          <span>Messaging</span>
        </Link>
        <Link
          href="/notifications"
          className="flex flex-col items-center text-gray-700 hover:text-black relative"
        >
          <Bell size={18} />
          <span>Notifications</span>
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-[10px] px-1">
            3
          </span>
        </Link>
        <div className="flex flex-col items-center text-gray-700 hover:text-black">
          <User size={18} />
          <span>{data?.user.username ?? "Me"}</span>
          {data?.user && (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="text-[10px] text-blue-600 hover:underline"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>

      {/* Right - Extra Options */}
      <div className="flex space-x-4 items-center text-sm">
        <div className="flex flex-col items-center text-gray-700 hover:text-black">
          <Grid size={18} />
          <span>For Business</span>
        </div>
        <div className="flex flex-col items-center text-yellow-600 hover:text-yellow-700">
          <Star fill="currentColor" size={18} />
          <span className="text-xs">Try Premium</span>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
