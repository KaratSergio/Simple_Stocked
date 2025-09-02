'use client';
import AuthForm from "@/components/auth/AuthForm";
import { useRefresh } from "@/api/auth/refresh/useRefresh";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const { loading, isLoggedIn } = useRefresh();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push("/page/dashboard"); // редирект сразу
    }
  }, [loading, isLoggedIn, router]);

  if (loading || isLoggedIn) return <div>Loading...</div>; // блокируем форму до проверки

  return <AuthForm />;
}
