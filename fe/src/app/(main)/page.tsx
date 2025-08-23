"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "../_components/Header";
import { HomeContent } from "../_components/HomeContent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </>
  );
}
