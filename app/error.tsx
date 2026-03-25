"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-50 p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Something went wrong
          </h1>

          {/* Error Message */}
          <p className="text-gray-600 mb-2">
            We apologize for the inconvenience. An unexpected error occurred.
          </p>
          
          {/* Error details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Error Details:
              </p>
              <p className="text-sm text-red-600 font-mono break-words">
                {error.message || "Unknown error"}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <Button
              onClick={reset}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Support Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          If the problem persists, please contact support or try again later.
        </p>
      </div>
    </div>
  );
}
