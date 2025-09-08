'use client';
import AuthForm from "@/components/auth/AuthForm";
import { useRefresh } from "@/api/auth/refresh/useRefresh";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const { loading, isLoggedIn } = useRefresh();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) router.push("/page");
  }, [loading, isLoggedIn, router]);

  if (loading || isLoggedIn) return <div>Loading...</div>;

  return <AuthForm />;
}
