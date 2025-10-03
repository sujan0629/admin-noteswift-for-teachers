"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookMarked, Eye, EyeOff, Loader2, Lock, GraduationCap, Shield, Sparkles } from "lucide-react";
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
    <main className="relative flex min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 max-w-md">
          <div className="mb-8 inline-flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-4 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-2 border-white/50">
        <CardHeader className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-white text-xs font-medium shadow-md">
            <Lock className="h-3.5 w-3.5" /> 
            <span>Secure Authentication</span>
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-base">Sign in to access your teacher dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="eg: codelits_studio"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full font-semibold text-base py-6" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </main>
  );
}
