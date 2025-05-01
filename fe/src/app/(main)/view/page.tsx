"use client";

import { Suspense } from "react";
import { Header } from "@/app/_components/Header";
import { ViewPageContent } from "@/app/_components/ViewPageComponent";

export default function ViewPage() {
  return (
    <div className="w-full h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ViewPageContent />
      </Suspense>
    </div>
  );
}
