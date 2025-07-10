export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem("accessToken");
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    // Здесь можно, например, редиректить на логин или очистить токен
    console.error("Unauthorized! Token expired or invalid.");
    // Например, очистить токен:
    localStorage.removeItem("accessToken");
    // Можно бросить ошибку или как-то обработать
    throw new Error("Unauthorized");
  }

  return response;
}
