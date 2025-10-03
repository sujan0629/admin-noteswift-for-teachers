"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookMarked, Loader2, ShieldCheck, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function OtpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isVerified = localStorage.getItem("isPasswordVerified");
    if (isVerified !== "true") {
      router.replace("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const resp = await fetch("/api/auth/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ otp }) });
    const result = await resp.json();

    if (result.success) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.removeItem("isPasswordVerified");
      toast({
        title: "Authentication Successful",
        description: "Welcome to the dashboard!",
      });
      router.push("/dashboard");
    } else {
      setError(result.error || "Invalid code. Please try again.");
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: result.error || "The code you entered is incorrect.",
      });
    }
    setIsLoading(false);
  };

  const onResend = async () => {
    setIsResending(true);
    const otpResp = await fetch("/api/auth/send-otp", { method: "POST" });
    const result = await otpResp.json();
    if (result.success) {
      toast({
        title: "Code Resent",
        description: "A new one-time code has been sent.",
      });
    } else {
       toast({
        variant: "destructive",
        title: "Failed to Resend",
        description: result.error,
      });
    }
    setIsResending(false);
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-1 items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-2 border-white/50">
        <CardHeader className="text-center space-y-3">
          {/* Icon Circle */}
          <div className="mx-auto mb-2 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg p-3">
              <Image src="/assets/logo.jpg" alt="NoteSwift Logo" width={48} height={48} className="rounded-lg" />
            </div>
            <div className="absolute -right-1 -bottom-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-1.5 text-white text-xs font-medium shadow-md">
            <Clock className="h-3.5 w-3.5" /> 
            <span>Expires in 10 minutes</span>
          </div>
          
          <CardTitle className="text-3xl font-bold">Verify Your Identity</CardTitle>
          <CardDescription className="text-base">
            We've sent a 6-digit code to your registered email address. Please enter it below to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                maxLength={6}
                className="h-14 text-center text-2xl font-bold tracking-widest border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Enter the 6-digit code from your email
              </p>
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
              className="w-full font-semibold text-base h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200" 
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-11 border-2 hover:bg-gray-50 transition-colors" 
              onClick={onResend} 
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending New Code...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Code
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Secure</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>One-time use</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </main>
  );
}
