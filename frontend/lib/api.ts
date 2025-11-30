const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5150";

// ログインのレスポンス型
export interface LoginResponse {
  token: string;
  pid: string;
  name: string;
  email: string;
}

// APIエラー
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// ログインAPI
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new ApiError(res.status, "Login failed");
  }

  return res.json();
}

// トークンをlocalStorageに保存
export function saveToken(token: string): void {
  localStorage.setItem("token", token);
}

// トークンを取得
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// トークンを削除（ログアウト）
export function removeToken(): void {
  localStorage.removeItem("token");
}
