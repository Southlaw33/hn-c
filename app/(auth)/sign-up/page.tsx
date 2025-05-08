"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import NavigationBar from "@/app/components/Navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await betterAuthClient.signUp.email(
        {
          username: formData.username,
          email: formData.email,
          name: formData.name,
          password: formData.password,
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            router.push("/");
          },
          onError: (ctx) => {
            setIsLoading(false);
            alert(ctx.error.message || "Signup failed. Please try again.");
          },
        }
      );

      if (error) {
        alert(error.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavigationBar hideNavItems />
      {!data?.user && (
        <div className="flex items-center justify-center min-h-[calc(100vh-3rem)] bg-muted">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
              </div>
              <Button
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </CardContent>
            <CardFooter className="justify-center text-sm">
              Already have an account?&nbsp;
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
