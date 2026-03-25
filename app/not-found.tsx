'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-5 rounded-full">
            <FileQuestion className="w-14 h-14 text-gray-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 Code */}
        <p className="text-7xl font-bold text-gray-200 mb-2">404</p>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button
              className="h-12 px-6 text-base font-medium"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Button
            variant="outline"
            className="h-12 px-6 text-base font-medium"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Community Info */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Looking for something else?</p>
          <p className="font-semibold text-gray-900">Emory Crossing 40s</p>
          <p className="text-sm text-gray-600">Hutto, TX</p>
        </div>
      </div>
    </div>
  );
}
