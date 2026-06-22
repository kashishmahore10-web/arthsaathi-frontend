const BASE_URL = "http://localhost:5000/api";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("arthsaathi_token");
};

export const setToken = (token: string) => {
  localStorage.setItem("arthsaathi_token", token);
};

export const clearToken = () => {
  localStorage.removeItem("arthsaathi_token");
  localStorage.removeItem("arthsaathi_user");
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const login = async (email: string, password: string) => {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.accessToken) {
    setToken(data.accessToken);
    localStorage.setItem("arthsaathi_user", JSON.stringify(data.data));
  }
  return data;
};

export const checkScam = async (message: string, language?: string) =>
  apiFetch("/agents/scamradar/check", {
    method: "POST",
    body: JSON.stringify({ message, language }),
  });

export const askGuideBot = async (question: string, language?: string) =>
  apiFetch("/agents/guidebot/ask", {
    method: "POST",
    body: JSON.stringify({ question, language }),
  });

export const askPlannerBot = async (context?: string) =>
  apiFetch("/agents/plannerbot/ask", {
    method: "POST",
    body: JSON.stringify({ context }),
  });

export const askGovBot = async (question?: string) =>
  apiFetch("/agents/govbot/ask", {
    method: "POST",
    body: JSON.stringify({ question }),
  });

export const askCoachBot = async (language?: string) =>
  apiFetch("/agents/coachbot/ask", {
    method: "POST",
    body: JSON.stringify({ language }),
  });

export const askSakhiBot = async (question: string, language?: string) =>
  apiFetch("/agents/sakhibot/ask", {
    method: "POST",
    body: JSON.stringify({ question, language }),
  });

export const askWealthBot = async () =>
  apiFetch("/agents/wealthbot/ask", {
    method: "POST",
    body: JSON.stringify({}),
  });

export const askCreditPath = async () =>
  apiFetch("/agents/creditpath/ask", {
    method: "POST",
    body: JSON.stringify({}),
  });

export const getHealthScore = async () =>
  apiFetch("/agents/health-score");

export const addTransaction = async (payload: object) =>
  apiFetch("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getTransactionSummary = async () =>
  apiFetch("/transactions/summary");

export const getTransactions = async () =>
  apiFetch("/transactions");

export const getMe = async () =>
  apiFetch("/auth/me");

export const logout = () => {
  clearToken();
  window.location.href = "/login";
};