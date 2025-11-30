"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-bold text-zinc-900 dark:text-white">
          Tsumiki
        </h1>

        {isLoggedIn ? (
          <div className="space-y-4">
            <p className="text-center text-zinc-600 dark:text-zinc-400">
              ログインしています
            </p>
            <button
              onClick={handleLogout}
              className="w-full rounded-md bg-red-600 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-zinc-600 dark:text-zinc-400">
              ログインしていません
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              ログインページへ
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
