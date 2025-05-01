"use client";

import { Suspense } from "react";
import { Header } from "../_components/Header";
import { HomeContent } from "../_components/HomeContent";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </>
  );
}
