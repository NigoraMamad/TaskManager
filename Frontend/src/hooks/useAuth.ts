// hooks/useAuth.ts
import { useState, useEffect } from "react";

type UserInfo = {
  id:number;
  fullName: string;
  phoneNumber: string;
  role?: string; // если есть
};

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("accessToken"));
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "accessToken") setToken(event.newValue);
      if (event.key === "userInfo") {
        setUserInfo(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function saveToken(newToken: string) {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  }

  function saveUserInfo(info: UserInfo) {
    localStorage.setItem("userInfo", JSON.stringify(info));
    setUserInfo(info);
  }

  function clearToken() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    setToken(null);
    setUserInfo(null);
  }
  

  return { token, userInfo, saveToken, saveUserInfo, clearToken };
}
