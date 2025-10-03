"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookMarked, Eye, EyeOff, Loader2, Lock, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const resp = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
  const loginResult = await resp.json();

  if (loginResult.success) {
    const otpResp = await fetch("/api/auth/send-otp", { method: "POST" });
    const result = await otpResp.json();
    if (result.success) {
      localStorage.setItem("isPasswordVerified", "true");
      toast({
        title: "Code Sent",
        description: "A one-time code has been sent to your email.",
      });
      router.push("/login/otp");
    } else {
      setError(result.error || "Failed to send login code. Please try again.");
      toast({
        variant: "destructive",
        title: "Failed to Send Code",
        description: result.error || "An unexpected error occurred.",
      });
    }
  } else {
    setError("Invalid username or password. Please try again.");
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: loginResult.error || "Invalid credentials.",
    });
  }

  setIsLoading(false);
};


  return (
    <main className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-white">

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 max-w-md">
          <div className="mb-8 inline-flex items-center gap-3">
            <Image src="/assets/logo.png" alt="NoteSwift Logo" width={68} height={68} className="rounded-lg" />
            <div>
              <h1 className="text-4xl font-bold text-blue-700">
                NoteSwift
              </h1>
              <p className="text-sm text-muted-foreground">Teacher Portal</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Empower Your Teaching Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Manage courses, track student progress, and create engaging content all in one place.
          </p>

          <div className="space-y-4">
            {[
              { icon: Shield, text: "Secure & Encrypted Platform" },
              { icon: Sparkles, text: "AI-Powered Insights" },
              { icon: BookMarked, text: "Rich Content Management" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <feature.icon className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-4 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Image src="/assets/logo.jpg" alt="NoteSwift Logo" width={48} height={48} className="rounded-lg" />
          </div>

          <Card className="backdrop-blur-sm bg-white shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mx-auto mb-2 rounded-full bg-blue-500 px-4 py-1.5 text-white text-xs font-medium shadow-sm">
            <Lock className="h-3.5 w-3.5" /> 
            <span>Secure Authentication</span>
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-base">Sign in to access your teacher dashboard</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 pr-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <span className="text-red-500">⚠</span> {error}
                </p>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full font-semibold text-base h-12 bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200" 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Protected by enterprise-grade encryption
            </p>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </main>
  );
}
